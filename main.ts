/* Copyright (c) 2020 MTHS All rights reserved
 *
 * Created by: Liya G
 * Created on: Jan 2024
 * This program operates a roomba.
*/

// variables
let distanceToObject: number = 0

// setup
basic.clearScreen()
basic.showIcon(IconNames.Asleep)
radio.setGroup(5)

while (true) {
  // find distance from sonar
  basic.clearScreen()
  distanceToObject = sonar.ping(
    DigitalPin.P1,
    DigitalPin.P2,
    PingUnit.Centimeters
  )

  // send go to sophie's microbit
  radio.sendString('Run')

  // show distance
  basic.showNumber(distanceToObject)

  // if distance > 10, move forward 20 cm & turn
  if (distanceToObject > 10) {
    robotbit.StpCarMove(-20, 48)
    robotbit.StepperTurn(robotbit.Steppers.M1, robotbit.Turns.T1B0)
    robotbit.StpCarMove(-10, 48)
  } else {
    // if distance < 10, move backward
    robotbit.StpCarMove(10, 48)
    robotbit.StepperTurn(robotbit.Steppers.M1, robotbit.Turns.T1B0)
  }
}
