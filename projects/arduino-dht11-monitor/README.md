# Arduino Temperature & Humidity Monitor (DHT11)

An environmental monitoring node built with an Arduino Uno — my first step from pure
hardware circuits toward Industrial IoT-style sensing: **read → display → alarm → log**.

## Features

- Reads temperature and humidity from a DHT11 every 2 seconds (non-blocking `millis()` timing)
- Shows live values on a 16×2 I2C LCD
- Alarm LED turns on at ≥ 35 °C
- Streams CSV over serial (`seconds,temp_c,humidity_pct`) for logging or plotting
- Graceful handling of failed sensor reads

## Bill of Materials

| Part | Qty |
|---|---|
| Arduino Uno | 1 |
| DHT11 module | 1 |
| 16×2 LCD with I2C backpack (0x27) | 1 |
| LED + 330 Ω resistor | 1 |
| Breadboard + jumper wires | — |

## Wiring

| Connection | Pin |
|---|---|
| DHT11 DATA | D2 (10k pull-up to 5V) |
| LCD SDA / SCL | A4 / A5 |
| Alarm LED | D13 via 330 Ω |

## Libraries

- `DHT sensor library` (Adafruit) + `Adafruit Unified Sensor`
- `LiquidCrystal I2C`

## What I learned

- Integrating sensor and display libraries
- Non-blocking timing instead of `delay()`
- I2C communication basics
- Structuring output data for collection — a core Industrial IoT concept
