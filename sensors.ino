#include <WiFi.h>
#include <FirebaseESP32.h>
#include <Servo.h>

// -------------------- WiFi Credentials --------------------
const char* ssid = "test";
const char* password = "12345678";

// -------------------- Firebase Credentials --------------------
#define FIREBASE_HOST "finalproject-b956d-default-rtdb.asia-southeast1.firebasedatabase.app"
#define FIREBASE_AUTH "Jbb7ieXnmcefqd2p81RHFVzj4EnEHZXywvArUXOu"

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

// -------------------- Sensor Pins --------------------
#define TDS_PIN       36
#define TURBIDITY_PIN 39

// -------------------- Servo Setup --------------------
Servo myServo;
int servoPin = 13;  // Change to any PWM-capable pin on ESP32 (e.g., 13, 14, 27)

int pos = 0;
void moveServo(int start, int end, int stepDelay) {
  if (start < end) {
    for (pos = start; pos <= end; pos++) {
      myServo.write(pos);
      delay(stepDelay);
    }
  } else {
    for (pos = start; pos >= end; pos--) {
      myServo.write(pos);
      delay(stepDelay);
    }
  }
}

// -------------------- Timing --------------------
unsigned long lastSendTime = 0;
const unsigned long sendInterval = 5000;

void setup() {
  Serial.begin(115200);
  delay(1000);
  Serial.println("🤖 Aquabot Starting...");

  analogReadResolution(12); // ESP32 ADC resolution

  // Connect WiFi
  WiFi.begin(ssid, password);
  Serial.print("🔌 Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\n✅ WiFi Connected: " + WiFi.localIP().toString());

  // Firebase setup
  config.host = FIREBASE_HOST;
  config.signer.tokens.legacy_token = FIREBASE_AUTH;
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);

  // Attach servo
  myServo.attach(servoPin);
}

void loop() {
  // -------------------- Sensor Readings --------------------
  int tdsRaw = analogRead(TDS_PIN);
  float tdsVoltage = tdsRaw * (3.3 / 4095.0);
  float ec = (133.42 * tdsVoltage * tdsVoltage * tdsVoltage)
             - (255.86 * tdsVoltage * tdsVoltage)
             + (857.39 * tdsVoltage);
  float tds = ec * 0.5;

  int turbRaw = analogRead(TURBIDITY_PIN);
  float turbVoltage = turbRaw * (3.3 / 4095.0);
  float turbidity = turbVoltage >= 2.5 ? 0 : 3000 * (2.5 - turbVoltage);

  String status = (tds < 600 && turbidity < 5) ? "Good" : "Bad";

  // -------------------- Output --------------------
  Serial.printf("📊 TDS: %.2f ppm | 🌫 Turbidity: %.2f NTU | Status: %s\n",
                tds, turbidity, status.c_str());

  // -------------------- Send to Firebase --------------------
  if (Firebase.ready() && millis() - lastSendTime > sendInterval) {
    lastSendTime = millis();

    bool success = true;
    success &= Firebase.setFloat(fbdo, "/water/tds_ppm", tds);
    success &= Firebase.setFloat(fbdo, "/water/turbidity_ntu", turbidity);
    success &= Firebase.setString(fbdo, "/water/status", status);

    if (!success) {
      Serial.println("❌ Firebase send failed:");
      Serial.println(fbdo.errorReason());
    } else {
      Serial.println("✅ Data sent to Firebase");
    }

    // -------------------- Move Servo (example use case) --------------------
    moveServo(0, 100, 20);  // Simulate grabbing garbage
    delay(1000);
    moveServo(100, 0, 20);  // Return to position
  }

  delay(1000);
}