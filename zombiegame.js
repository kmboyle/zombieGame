// INSTRUCTIONS: Build a command-line based zombie fighting game. 
// =========================================================================================================

// In this game, you and a zombie will each be given a certain amount of health. (Perhaps: You 70, Zombie 15).

// For each round, you will be asked to guess a random number between 1 and 5.
// If your guess matches the random number of the Zombie -- you inflict a random amount of damage between 1 and 5. 
// If you guess does not match the random number of the Zombie -- the Zombie inflicts a random amount of damage to you between 1 and 5.
// Each round the zombie is given a new random number and you must guess again. 

// The game ends when you or the zombie gets to 0 health. 

// Note: You should use the inquirer package to take in user commands.
// Major Warning: inquirer's prompt function is "asynchronous", which means that the majority of your game logic will need to be inside the .then() function for your propmt. 

// ===========================================================================================================

var inquirer = require("inquirer");
var zombie = {
    health: 20,
    damage: 0,
    position: 0
}
var you = {
    health: 50,
    damage: 0,
    position: 0
}

function fight(guessLoc) {
    zombieHealth();
    yourHealth();

    you.damage = Math.floor((Math.random() * 5) + 1);
    zombie.position = Math.floor((Math.random() * 5) + 1);
    zombie.damage = Math.floor((Math.random() * 5) + 1);

    console.log(guessLoc);
    console.log(zombie.position);
    console.log(parseInt(guessLoc) === parseInt(zombie.position));
    if (parseInt(guessLoc) === parseInt(zombie.position)) {
        console.log("You found the Zombie.  Inflicting damage...");
        zombie.health -= you.damage;
    } else if (!zombieHealth()) {
        return false;
    }
    if (parseInt(guessLoc) !== parseInt(zombie.position)) {
        console.log("The zombie found you.  He's eating you now...");
        you.health -= zombie.damage;
    } else if (!yourHealth()) {
        return false;
    }
}


function zombieHealth() {
    if (zombie.health > 0) {

        return true;
    } else return false;
}

function yourHealth() {
    if (you.health > 0) {

        return true;
    } else return false;
}

function begin() {
    inquirer.prompt([ /* Pass your questions in here */ {
        message: "Guess a number between 1 and 5",
        type: "list",
        name: "position",
        choices: ["1", "2", "3", "4", "5"]
    }]).then(function(answers) {

        // Use user feedback for... whatever!! 
        you.position = answers.position;
        fight(you.position);
        console.log("===========================");
        console.log("YOU: " + you.health);
        console.log("ZOMBIE: " + zombie.health);
        console.log("===========================");

        if (zombieHealth() && yourHealth()) {
            begin();
        } else if (you.health <= 0) {
            console.log("ZOMBIE KILL YOU!");
        } else if (zombie.health <= 0) {
            console.log("YOU WIN.  ANNIHILATION");
        }
    });
}
begin();