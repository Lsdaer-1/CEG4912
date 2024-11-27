#ifndef HTTP_CLIENT_H
#define HTTP_CLIENT_H

#include <Arduino.h>

bool fetchBookPosition(int book_id, int &row, int &column);
int fetchBookID();

#endif
