# Flip-Flop (Bistable) Circuit

A transistor-based bistable multivibrator — a circuit that stores **one bit of state**,
the building block of latches, registers, and memory.

## How it works

Two cross-coupled NPN transistor stages are wired so only one side can conduct at a
time. Pressing a button forces the conducting side off, flipping the circuit into its
other stable state. Two LEDs indicate which state is active.

## Bill of Materials

| Part | Qty |
|---|---|
| BC547 NPN transistor | 2 |
| LED | 2 |
| Base/collector resistors | 4–6 |
| Push-button | 2 |
| Breadboard, jumper wires, 5–9 V supply | — |

## What I learned

- Bistable operation and positive feedback
- Transistor cutoff/saturation switching regions
- How SR latch behavior emerges from discrete components
- Verifying logic states with a multimeter
