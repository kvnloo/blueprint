# Sensors Component Specification

## Overview

Sensors are the eyes of an automated hydroponic system. This document specifies sensor requirements, DIY alternatives, and integration patterns.

## Required Sensors (Minimum Viable)

### pH Sensor
**Purpose**: Monitor nutrient solution acidity

| Specification | Target | Acceptable Range |
|---------------|--------|------------------|
| Accuracy | +/-0.1 pH | +/-0.2 pH |
| Range | 0-14 pH | 4-10 pH |
| Response time | <30 sec | <60 sec |
| Calibration frequency | Monthly | Weekly-Monthly |

**Options**:
| Option | Cost | Accuracy | Notes |
|--------|------|----------|-------|
| DIY (ADS1115 + probe) | $15 | +/-0.2 | Requires calibration, good value |
| Atlas Scientific | $80 | +/-0.02 | Professional grade, I2C |
| Generic analog module | $12 | +/-0.3 | Inconsistent quality |

**Recommendation**: DIY with ADS1115 for hobby, Atlas for production

**Wiring Diagram**:
```
ESP32 --- I2C --- ADS1115 --- pH Probe
           |
           +-- 3.3V, GND, SDA (GPIO21), SCL (GPIO22)
```

### EC/TDS Sensor
**Purpose**: Monitor nutrient concentration

| Specification | Target | Acceptable Range |
|---------------|--------|------------------|
| Accuracy | +/-5% | +/-10% |
| Range | 0-5000 uS/cm | 0-3000 uS/cm |
| Temperature compensation | Required | Optional |

**Options**:
| Option | Cost | Accuracy | Notes |
|--------|------|----------|-------|
| DIY (resistance measurement) | $10 | +/-10% | Requires calibration |
| DFRobot analog module | $40 | +/-5% | Easy to use |
| Atlas Scientific | $120 | +/-2% | Professional grade |

**Recommendation**: DIY or DFRobot for hobby

### Water Temperature
**Purpose**: Monitor nutrient solution temperature, needed for EC compensation

| Specification | Target | Acceptable Range |
|---------------|--------|------------------|
| Accuracy | +/-0.5C | +/-1C |
| Range | 0-50C | 10-40C |
| Waterproof | Required | Required |

**Options**:
| Option | Cost | Accuracy | Notes |
|--------|------|----------|-------|
| DS18B20 waterproof | $3 | +/-0.5C | One-wire protocol, easy |
| PT100 RTD | $15 | +/-0.1C | Overkill for hobby |
| Thermistor | $1 | +/-1C | Requires calibration curve |

**Recommendation**: DS18B20 waterproof probe - cheap, accurate, easy

### Air Temperature & Humidity
**Purpose**: Monitor growing environment

| Specification | Target | Acceptable Range |
|---------------|--------|------------------|
| Temp accuracy | +/-0.5C | +/-2C |
| Humidity accuracy | +/-3% RH | +/-5% RH |
| Response time | <10 sec | <30 sec |

**Options**:
| Option | Cost | Accuracy | Notes |
|--------|------|----------|-------|
| DHT22 | $5 | +/-0.5C, +/-2% | Popular, adequate |
| BME280 | $8 | +/-0.5C, +/-3% | Also has pressure |
| SHT31 | $12 | +/-0.2C, +/-2% | More reliable than DHT |

**Recommendation**: DHT22 for budget, SHT31 for reliability

### Water Level
**Purpose**: Monitor reservoir level, prevent pump dry-run

| Specification | Target | Notes |
|---------------|--------|-------|
| Type | Float switch or ultrasonic | |
| Output | Binary (high/low) or continuous | |
| Food-safe | Required | |

**Options**:
| Option | Cost | Type | Notes |
|--------|------|------|-------|
| Float switch | $2 | Binary | Simple, reliable, multiple needed for levels |
| HC-SR04 ultrasonic | $3 | Continuous | Non-contact, needs calibration |
| Capacitive sensor | $5 | Continuous | No moving parts |

**Recommendation**: Float switches for simplicity, ultrasonic for precision

## Optional Sensors (High Value)

### PAR/Light Sensor
**Purpose**: Measure photosynthetically active radiation

| Specification | Target | Notes |
|---------------|--------|-------|
| Range | 0-2000 umol/m2/s | |
| Spectral range | 400-700nm | |

**Options**:
| Option | Cost | Accuracy | Notes |
|--------|------|----------|-------|
| DIY (photodiode array) | $30 | +/-15% | Requires calibration |
| Apogee SQ-520 | $400 | +/-5% | Professional standard |
| LUX meter + conversion | $15 | +/-20% | Approximation only |

**Recommendation**: DIY photodiode for hobby, Apogee for research

### CO2 Sensor
**Purpose**: Monitor CO2 for supplementation (optional advanced feature)

| Option | Cost | Range | Notes |
|--------|------|-------|-------|
| MH-Z19 NDIR | $20 | 0-5000ppm | Good accuracy, UART |
| SCD30 | $50 | 0-40000ppm | Also temp/humidity |
| SGP30 | $15 | 0-60000ppm | Less accurate, VOC too |

**Recommendation**: MH-Z19 if CO2 supplementation planned

### Camera (Plant Health AI)
**Purpose**: Visual monitoring, disease detection, growth tracking

| Option | Cost | Resolution | Notes |
|--------|------|------------|-------|
| Raspberry Pi Camera v3 | $25 | 12MP | Good for AI processing |
| ESP32-CAM | $8 | 2MP | Integrated, lower quality |
| USB webcam | $20 | Varies | Flexible placement |

**Recommendation**: Pi Camera for AI integration, ESP32-CAM for basic monitoring

## Integration Patterns

### ESP32 + ESPHome (Recommended for Home Assistant)

```yaml
# esphome/hydroponics.yaml
esphome:
  name: hydroponics-controller
  platform: ESP32
  board: esp32dev

wifi:
  ssid: !secret wifi_ssid
  password: !secret wifi_password

# pH Sensor via ADS1115
ads1115:
  - address: 0x48

sensor:
  - platform: ads1115
    multiplexer: 'A0_GND'
    gain: 4.096
    name: "pH Voltage"
    id: ph_voltage
    update_interval: 60s
    filters:
      - calibrate_linear:
          - 0.0 -> 7.0  # Calibrate with buffer solutions
          - 0.18 -> 4.0

  - platform: template
    name: "pH Level"
    lambda: |-
      return (id(ph_voltage).state - 2.5) * -5.7 + 7.0;
    unit_of_measurement: "pH"

  - platform: dallas
    address: 0x1234567890ABCDEF
    name: "Water Temperature"

  - platform: dht
    pin: GPIO4
    temperature:
      name: "Air Temperature"
    humidity:
      name: "Air Humidity"
    model: DHT22
```

### Raspberry Pi + Python (Standalone)

```python
# sensors/reader.py
import time
import board
import adafruit_ads1x15.ads1115 as ADS
from adafruit_ads1x15.analog_in import AnalogIn
from w1thermsensor import W1ThermSensor
import adafruit_dht

class HydroponicsSensors:
    def __init__(self):
        # pH via ADS1115
        i2c = board.I2C()
        self.ads = ADS.ADS1115(i2c)
        self.ph_channel = AnalogIn(self.ads, ADS.P0)

        # Water temp via DS18B20
        self.water_temp = W1ThermSensor()

        # Air via DHT22
        self.dht = adafruit_dht.DHT22(board.D4)

    def read_ph(self):
        voltage = self.ph_channel.voltage
        # Calibration: adjust these values with buffer solutions
        ph = 7.0 + (2.5 - voltage) * 3.5
        return round(ph, 2)

    def read_water_temp(self):
        return self.water_temp.get_temperature()

    def read_air(self):
        return {
            'temperature': self.dht.temperature,
            'humidity': self.dht.humidity
        }

    def read_all(self):
        return {
            'ph': self.read_ph(),
            'water_temp': self.read_water_temp(),
            'air_temp': self.read_air()['temperature'],
            'humidity': self.read_air()['humidity'],
            'timestamp': time.time()
        }
```

### Arduino + Node-RED (Simple)

```cpp
// arduino/hydroponics_sensors.ino
#include <OneWire.h>
#include <DallasTemperature.h>
#include <DHT.h>

#define PH_PIN A0
#define WATER_TEMP_PIN 2
#define DHT_PIN 4

OneWire oneWire(WATER_TEMP_PIN);
DallasTemperature waterTemp(&oneWire);
DHT dht(DHT_PIN, DHT22);

void setup() {
  Serial.begin(9600);
  waterTemp.begin();
  dht.begin();
}

void loop() {
  // Read pH
  float phVoltage = analogRead(PH_PIN) * 5.0 / 1024;
  float ph = 7.0 + (2.5 - phVoltage) * 3.5;

  // Read water temp
  waterTemp.requestTemperatures();
  float waterC = waterTemp.getTempCByIndex(0);

  // Read air
  float airC = dht.readTemperature();
  float humidity = dht.readHumidity();

  // Output JSON for Node-RED
  Serial.print("{\"ph\":");
  Serial.print(ph);
  Serial.print(",\"water_temp\":");
  Serial.print(waterC);
  Serial.print(",\"air_temp\":");
  Serial.print(airC);
  Serial.print(",\"humidity\":");
  Serial.print(humidity);
  Serial.println("}");

  delay(60000); // Read every minute
}
```

## Data Logging Requirements

- **Minimum frequency**: 1 reading per 15 minutes
- **Storage**: InfluxDB (preferred), CSV, or SQLite
- **Retention**: 1 year minimum
- **Alerts**: When values outside acceptable range

### Acceptable Ranges for Alerts

| Parameter | Low Alert | Target | High Alert |
|-----------|-----------|--------|------------|
| pH | <5.5 | 5.8-6.2 | >6.8 |
| EC (lettuce) | <800 uS/cm | 1000-1400 | >1800 uS/cm |
| Water temp | <15C | 18-22C | >26C |
| Air temp | <18C | 20-25C | >30C |
| Humidity | <40% | 50-70% | >85% |

## Calibration Procedures

### pH Calibration
1. Obtain pH 4.0 and pH 7.0 buffer solutions
2. Rinse probe with distilled water
3. Immerse in pH 7.0, record voltage
4. Rinse, immerse in pH 4.0, record voltage
5. Calculate slope: (V7 - V4) / (7.0 - 4.0)
6. Update calibration in code
7. Repeat monthly

### EC Calibration
1. Obtain 1413 uS/cm calibration solution
2. Rinse probe with distilled water
3. Immerse in solution, record raw value
4. Calculate correction factor
5. Repeat monthly or after probe cleaning
