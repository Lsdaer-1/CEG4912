#ifndef MOTION_CONTROL_H
#define MOTION_CONTROL_H

void initializeMotors();
void moveToPosition(int row, int column);
void moveMotor(int pin, int steps);

#endif
