# 7-Segment Counter — NE555 + CD4033

A 0–9 pulse counter shown on a 7-segment display, built without a microcontroller.

## How it works

1. The **NE555** produces clean clock pulses (astable mode).
2. The **CD4033** counts each pulse and decodes the count directly to 7-segment
   outputs (a–g) — it combines a decade counter and display driver in one IC.
3. A common-cathode 7-segment display shows the digit; a push-button resets the
   count to 0.

## Bill of Materials

| Part | Qty |
|---|---|
| NE555 timer IC | 1 |
| CD4033 counter/display driver IC | 1 |
| Common-cathode 7-segment display | 1 |
| 220 Ω segment resistor | 7 |
| Push-button (reset) | 1 |
| Timing RC network (resistors + capacitor) | — |
| Breadboard, jumper wires | — |

## What I learned

- Driving numeric displays and per-segment current limiting
- Clock pulse generation and counter/decoder architecture
- Switch debouncing for reliable counting
