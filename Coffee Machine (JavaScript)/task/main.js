// Importing the 'sync-input' module for capturing user input
const input = require('sync-input')

// Initializing an object to represent the current resources in the coffee machine
const inStore = {
    water: 400,
    milk: 540,
    coffeeBeans: 120,
    money: 550,
    cups: 9
};

// Defining the available drinks with their required resources and prices
const drinks = {
    "1": {  // Espresso
        water: 250,
        coffeeBeans: 16,
        milk: 0,
        price: 4
    },
    "2": {  // Latte
        water: 350,
        coffeeBeans: 20,
        milk: 75,
        price: 7
    },
    "3": {  // Cappuccino
        water: 200,
        coffeeBeans: 12,
        milk: 100,
        price: 6
    }
};

// Function to handle the buying of a drink
function buy() {
    let drink;
    do {
        // Requesting user input to select a drink or go back to the main menu
        drink = input("What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino, back - to main menu: \n");
        if (drink === "back") {  // Allow user to return to the main menu
            return;
        }
    } while (!["1", "2", "3"].includes(drink));  // Repeat until a valid option is chosen

    // Retrieving the required resources for the chosen drink
    let water = drinks[drink].water;
    let coffeeBeans = drinks[drink].coffeeBeans;
    let milk = drinks[drink].milk;
    let price = drinks[drink].price;

    // Checking if there is enough water
    if (inStore.water < water) {
        console.log("Sorry, not enough water!");
        return;
    }
    // Checking if there are enough coffee beans
    if (inStore.coffeeBeans < coffeeBeans) {
        console.log("Sorry, not enough coffee beans!");
        return;
    }
    // Checking if there is enough milk
    if (inStore.milk < milk) {
        console.log("Sorry, not enough milk!");
        return;
    }
    // Checking if there are enough disposable cups
    if (inStore.cups < 1) {
        console.log("Sorry, not enough cups!");
        return;
    }

    // If all resources are sufficient, proceed with making the coffee
    console.log("I have enough resources, making you a coffee!");
    // Deducting the resources used
    inStore.water -= water;
    inStore.milk -= milk;
    inStore.coffeeBeans -= coffeeBeans;
    inStore.cups--;
    // Adding the price of the drink to the machine's money
    inStore.money += price;
}

// Function to refill the coffee machine resources
function fill() {
    // Adding water to the machine's inventory
    inStore.water += Number(input("Write how many ml of water you want to add:\n"));
    // Adding milk to the machine's inventory
    inStore.milk += Number(input("Write how many ml of milk you want to add:\n"));
    // Adding coffee beans to the machine's inventory
    inStore.coffeeBeans += Number(input("Write how many grams of coffee beans you want to add:\n"));
    // Adding disposable cups to the machine's inventory
    inStore.cups += Number(input("Write how many disposable cups you want to add:\n"));
}

// Function to handle taking all the money from the machine
function take() {
    // Displaying the amount of money taken from the machine
    console.log(`I gave you $ ${inStore.money}`);
    // Setting the money in the machine to zero after taking it
    inStore.money = 0;
}

// Function to display the current state of the coffee machine resources
function printState() {
    console.log("The coffee machine has:\n" +
        `${inStore.water} ml of water\n` +
        `${inStore.milk} ml of milk\n` +
        `${inStore.coffeeBeans} g of coffee beans\n` +
        `${inStore.cups} disposable cups\n` +
        `$${inStore.money} of money\n`);
}

// Function to start the main interaction loop
function start() {
    while (true) {
        // Requesting user input for the desired action
        let activity = input("Write action (buy, fill, take, remaining, exit): \n");

        // Handling different actions based on user input
        switch (activity) {
            case "buy":
                // Calling the buy function to handle coffee purchase
                buy();
                break;
            case "fill":
                // Calling the fill function to replenish resources
                fill();
                break;
            case "take":
                // Calling the take function to take money from the machine
                take();
                break;
            case "remaining":
                // Calling the printState function to display the machine's current resources
                printState();
                break;
            case "exit":
                // Exiting the main loop and stopping the program
                return;
        }
    }
}

// Starting the program
start();
