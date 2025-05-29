#include <SoftwareSerial.h>
#include <TinyGPS++.h>

// Motor driver
int IN1 = 8, IN2 = 7, ENA = 9;
int IN3 = 5, IN4 = 4, ENB = 6;

// Switch 
const int switchPin = 2;

// LED 
const int ledPins[] = {10, 11, 12, 13};
const int ledCount = 4;

// GPS 
SoftwareSerial gpsSerial(4, 3); // RX, TX
TinyGPSPlus gps;


const float minLat = 6.8716;
const float maxLat = 6.8726;
const float minLng = 79.8875;
const float maxLng = 79.8885;


void setup() {
  Serial.begin(9600);
  gpsSerial.begin(9600);

  // Motor pins
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
  pinMode(ENA, OUTPUT);
  pinMode(IN3, OUTPUT);
  pinMode(IN4, OUTPUT);
  pinMode(ENB, OUTPUT);

  // LED 
  for (int i = 0; i < ledCount; i++) {
    pinMode(ledPins[i], OUTPUT);
  }

  // Switch 
  pinMode(switchPin, INPUT_PULLUP);
}

void loop() {
  // Read GPS data
  while (gpsSerial.available()) {
    gps.encode(gpsSerial.read());
  }

  // Check if switch is ON (LOW = pressed)
  bool switchOn = digitalRead(switchPin) == LOW;

  if (switchOn) {
    blinkLEDs();

    // Check if GPS data is valid and updated
    if (gps.location.isUpdated()) {
      float lat = gps.location.lat();
      float lng = gps.location.lng();

      Serial.print("Lat: "); Serial.print(lat, 6);
      Serial.print(" | Lng: "); Serial.println(lng, 6);

      // Check if within safe GPS bounds
      if (lat >= minLat && lat <= maxLat && lng >= minLng && lng <= maxLng) {
        moveForward();
      } else {
        stopMotors();
      }
    }
  } else {
    stopMotors();
    turnOffLEDs();
  }

  delay(300);
}


void moveForward() {
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  analogWrite(ENA, 200);

  digitalWrite(IN3, HIGH);
  digitalWrite(IN4, LOW);
  analogWrite(ENB, 200);
}


void stopMotors() {
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, LOW);
}

// Blink all 4 LEDs together
void blinkLEDs() {
  for (int i = 0; i < ledCount; i++) {
    digitalWrite(ledPins[i], HIGH);
  }
  delay(200);
  for (int i = 0; i < ledCount; i++) {
    digitalWrite(ledPins[i], LOW);
  }
  delay(200);
}

// Turn off LEDs when switch is off
void turnOffLEDs() {
  for (int i = 0; i < ledCount; i++) {
    digitalWrite(ledPins[i], LOW);
  }
}
