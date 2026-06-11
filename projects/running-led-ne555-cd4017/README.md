# Running LED Circuit — NE555 + CD4017

A 10-LED sequential “chaser” effect driven entirely by hardware logic, no microcontroller.

## How it works

1. The **NE555** runs in astable mode and generates a square-wave clock.
   Frequency: `f ≈ 1.44 / ((R1 + 2·R2) · C)` — a 10k potentiometer in the RC network
   makes the chase speed adjustable (≈ 1–20 Hz).
2. Each clock pulse advances the **CD4017** decade counter, which activates its
   10 outputs (Q0–Q9) one at a time.
3. Each output drives an LED through a 330 Ω current-limiting resistor, producing
   the running-light effect.

## Bill of Materials

| Part | Qty |
|---|---|
| NE555 timer IC | 1 |
| CD4017 decade counter IC | 1 |
| LED | 12 |
| 330 Ω resistor | 12 |
| 10 kΩ potentiometer | 1 |
| 10 µF electrolytic capacitor | 1 |
| Breadboard, jumper wires, 9 V supply | — |

## What I learned

- Astable timing calculations and RC behavior
- Decade counter operation, reset and clock-enable wiring
- LED current-limiting design and breadboard layout discipline
