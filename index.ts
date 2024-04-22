#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

//Initialize user balance and pin code:
let myBalance = 100000;
let myPin = 1234;

// Print welcome message:
console.log(chalk.bold.greenBright("\n\tWelcome to code with Ilyas - ATM Machine.\n"));
let pinAnswer = await inquirer.prompt([
    {
      name: "Pin",
      type: "number",
      message: "Enter your pin Code:",
    }
  ]);
  
  if (pinAnswer.Pin === myPin) {
    console.log("Pin is Correct, Login Successfully!");
    //console.log(`Current Account Balance is ${myBalance}`);

    let operationAns = await inquirer.prompt([
      {
        name: "operation",
        type: "list",
        message: "Select an operation:",
        choices: ["Withdraw Amount", "Check Balance"]
      }
    ]);

    if (operationAns.operation === "Withdraw Amount") {
      let withdrawAns = await inquirer.prompt([
        {
          name: "withdrawMethod",
          type: "list",
          message: "Select a withdraw method:",
          choices: ["Fast Cash", "Enter Amount"]
        }
      ]);

      if (withdrawAns.withdrawMethod === "Fast Cash") {
        let fastCashAns = await inquirer.prompt([
          {
            name: "FastCash",
            type: "list",
            message: "Select Amount:",
            choices: [500 , 1000, 2000, 5000, 10000, 20000, 50000]
          }
        ]);

        if (fastCashAns.FastCash > myBalance) {
          console.log("Insufficient Balance");
        } 
        else {
          myBalance -= fastCashAns.FastCash;
          console.log(`${fastCashAns.FastCash} withdraw Successfully`);
          console.log(`Your Remaining Balance is: ${myBalance}`);
        }
      } 
      else if (withdrawAns.withdrawMethod === "Enter Amount") {
        let amountAns = await inquirer.prompt([
          {
            name: "amount",
            type: "number",
            message: "Enter the amount to withdraw:"
          }
        ]);

        if (amountAns.amount > myBalance) {
          console.log("Insufficient Balance");
        } else {
          myBalance -= amountAns.amount;
          console.log(`${amountAns.amount} Withdraw Successfully`);
          console.log(`Your Remaining Balance is: ${myBalance}`);
        }
      }
    } else if (operationAns.operation === "Check Balance") {
      console.log(`Your Account Balance is: ${myBalance}`);
    }
  } else {
    console.log("Pin is Incorrect, Try Again!");
  }


