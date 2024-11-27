#include <Arduino.h>
#include "motion_control.h"
#include "config.h"

void initializeMotors() {
    pinMode(HORIZONTAL_PIN, OUTPUT);
    pinMode(VERTICAL_PIN, OUTPUT);
}

void moveToPosition(int row, int column) {
    // 控制垂直滑轨
    moveMotor(VERTICAL_PIN, row * STEPS_PER_UNIT);

    // 控制水平滑轨
    moveMotor(HORIZONTAL_PIN, column * STEPS_PER_UNIT);
}

void moveMotor(int pin, int steps) {
    for (int i = 0; i < abs(steps); i++) {
        digitalWrite(pin, HIGH);
        delayMicroseconds(1000);
        digitalWrite(pin, LOW);
        delayMicroseconds(1000);
    }
}
