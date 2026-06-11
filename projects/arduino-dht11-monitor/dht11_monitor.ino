/*
 * DHT11 Temperature & Humidity Monitor
 * ------------------------------------
 * Arduino Uno + DHT11 + 16x2 I2C LCD + alarm LED
 *
 * - Polls the DHT11 every 2 seconds (non-blocking, millis()-based)
 * - Shows temperature and humidity on the LCD
 * - Lights an alarm LED when temperature >= TEMP_ALARM_C
 * - Streams CSV over serial (seconds,tempC,humidity) for logging/plotting
 *
 * Author: Rahadian Bevan Pramudito
 * Libraries: "DHT sensor library" (Adafruit), "LiquidCrystal I2C"
 *
 * Wiring:
 *   DHT11 DATA -> D2 (with 10k pull-up to 5V)
 *   LCD I2C    -> SDA=A4, SCL=A5 (address 0x27)
 *   Alarm LED  -> D13 through 330 ohm resistor
 */

#include <LiquidCrystal_I2C.h>
#include <DHT.h>

#define DHTPIN 2
#define ALARM_LED_PIN 13
#define TEMP_ALARM_C 35.0
#define DHT_TIMEOUT_US 100000

LiquidCrystal_I2C lcd(0x27, 16, 2);
DHT dht(DHTPIN, DHT11);

unsigned long lastRead = 0;
const unsigned long READ_INTERVAL_MS = 2000;

bool readDHT11(float &humidity, float &temperature) {
  uint8_t data[5] = {0};

  pinMode(DHTPIN, OUTPUT);
  digitalWrite(DHTPIN, LOW);
  delay(18);
  digitalWrite(DHTPIN, HIGH);
  delayMicroseconds(40);
  pinMode(DHTPIN, INPUT_PULLUP);

  if (pulseIn(DHTPIN, LOW, DHT_TIMEOUT_US) == 0) return false;
  if (pulseIn(DHTPIN, HIGH, DHT_TIMEOUT_US) == 0) return false;

  for (int i = 0; i < 40; i++) {
    if (pulseIn(DHTPIN, LOW, DHT_TIMEOUT_US) == 0) return false;
    unsigned long highTime = pulseIn(DHTPIN, HIGH, DHT_TIMEOUT_US);
    if (highTime == 0) return false;
    data[i / 8] <<= 1;
    if (highTime > 40) data[i / 8] |= 1;
  }

  if (data[4] != ((data[0] + data[1] + data[2] + data[3]) & 0xFF)) return false;

  humidity = data[0];
  temperature = data[2];
  return true;
}

void setup() {
  pinMode(ALARM_LED_PIN, OUTPUT);
  Serial.begin(9600);
  Serial.println("seconds,temp_c,humidity_pct"); // CSV header

  dht.begin();
  lcd.init();
  lcd.backlight();
  lcd.print("DHT11 Monitor");
  lcd.setCursor(0, 1);
  lcd.print("Initializing...");
  delay(1500);
  lcd.clear();
}

void loop() {
  // Non-blocking 2-second sampling interval
  if (millis() - lastRead < READ_INTERVAL_MS) return;
  lastRead = millis();

  float humidity = dht.readHumidity();
  float tempC = dht.readTemperature();

  // Handle sensor read failures gracefully
  if (isnan(humidity) || isnan(tempC)) {
    Serial.println("# sensor read failed");
    lcd.clear();
    lcd.print("Sensor error!");
    return;
  }

  // High-temperature alarm
  digitalWrite(ALARM_LED_PIN, tempC >= TEMP_ALARM_C ? HIGH : LOW);

  // Local display
  lcd.setCursor(0, 0);
  lcd.print("Temp: ");
  lcd.print(tempC, 1);
  lcd.print((char)223); // degree symbol
  lcd.print("C  ");
  lcd.setCursor(0, 1);
  lcd.print("Hum:  ");
  lcd.print(humidity, 0);
  lcd.print("%   ");

  // CSV log for plotting / IoT data collection
  Serial.print(millis() / 1000);
  Serial.print(",");
  Serial.print(tempC, 1);
  Serial.print(",");
  Serial.println(humidity, 0);
}
