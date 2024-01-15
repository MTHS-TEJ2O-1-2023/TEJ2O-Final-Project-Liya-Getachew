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
  if (input.buttonIsPressed(Button.A) === true) {
    while (true) {
      // find distance from sonar
      basic.clearScreen()
      distanceToObject = sonar.ping(
        DigitalPin.P1,
        DigitalPin.P2,
        PingUnit.Centimeters
      )

      // show distance
      basic.showNumber(distanceToObject)

      // turn if distance > 10
      if (distanceToObject > 10) {
      robotbit.StpCarMove(-10, 48)
        basic.pause(500)
        robotbit.StepperTurn(robotbit.Steppers.M1, robotbit.Turns.T1B4)
        basic.pause(500)
        robotbit.StepperTurn(robotbit.Steppers.M2, robotbit.Turns.T1B4)
        basic.pause(500)
        robotbit.StpCarMove(10, 48)
      } else {
        // move backward
        robotbit.StpCarMove(10, 48)
      }

      // send go to sophie's microbit
      radio.sendString('Run')
    }
  }
}
