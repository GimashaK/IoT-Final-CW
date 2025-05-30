// Motor control pins
int IN1 = 8;
int IN2 = 7;
int ENA = 9;

int IN3 = 5;
int IN4 = 4;
int ENB = 6;

// Switch pin
int buttonPin = 2;

void setup() {
  // Motor pins as outputs
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
  pinMode(ENA, OUTPUT);

  pinMode(IN3, OUTPUT);
  pinMode(IN4, OUTPUT);
  pinMode(ENB, OUTPUT);

  // Button pin as input with internal pull-up
  pinMode(buttonPin, INPUT_PULLUP);
}

void loop() {
  // Read the switch
  bool buttonPressed = digitalRead(buttonPin) == LOW;

  if (buttonPressed) {
    // Move both motors forward
    digitalWrite(IN1, HIGH);
    digitalWrite(IN2, LOW);
    analogWrite(ENA, 200);  // Speed: 0–255

    digitalWrite(IN3, HIGH);
    digitalWrite(IN4, LOW);
    analogWrite(ENB, 200);
  } else {
    // Stop motors
    stopMotors();
  }
}

void stopMotors() {
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, LOW);
  analogWrite(ENA, 0);

  digitalWrite(IN3, LOW);
  digitalWrite(IN4, LOW);
  analogWrite(ENB, 0);
}
