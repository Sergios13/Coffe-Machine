// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input')
let work;
while (work !== 'exit') {

    const db = {
        water: 400,
        milk: 540,
        beans: 120,
        cups: 9,
        money: 550,
    }

    const Actions = {
        BUY: 'buy',
        FILL: 'fill',
        TAKE: 'take',
        REMAIN: 'remaining',
        EXIT: 'exit'
    }

// actions

    const buy = () => {
        const espresso = {water: 250, milk: 0, beans: 16, cups: 1, money: -4};
        const latte = {water: 350, milk: 75, beans: 20, cups: 1, money: -7};
        const cappuccino = {water: 200, milk: 100, beans: 12, cups: 1, money: -6};
        const back = () => {
            mainMenu();
        }
        let recipe = 0;
        let kind = input("What do you want to buy? 1-espresso, 2-latte, 3-cappuccino, back - to main menu:\n");
        if (kind == 1) {
            recipe = espresso;
        }
        else if (kind == 2) {
            recipe = latte;
        }
        else if (kind == 3) {
            recipe = cappuccino;
        }
        else if (kind == 'back') {
            back();
        }
        else {console.log('invalid input')}

        let proof = {water: 1, milk: 1, beans: 1, cups: 1};
        let check;
        for (let key in proof) {
            if (Math.floor(db[key] / recipe[key]) < 1) {
                console.log(`Sorry, not enough ${key}!`);
                check = false;
                back();
                break;
            } else {
                check = true;
            }
        }
        if (check === true) {
            for (let key in db) {
                db[key] = db[key] - recipe[key];
            }
            console.log("I have enough resources, making you a coffee!");
            back();
        }
    }

    const fill = () => {
        let whm = "Write how many";
        let add = "you want to add:";
        let topUp = {
            water: "ml of water",
            milk: "ml of milk",
            beans: "grams of coffee beans",
            cups: "disposable coffee cups"
        };
        for (let key in topUp) {
            db[key] += Number(input(`${whm} ${topUp[key]} ${add}`));
        }
        mainMenu();
    };

    const take = () => {
        console.log(`I gave you $${db.money}`);
        db.money = 0;
        mainMenu();
    };

    const remaining = () => {
        console.log(`The coffee machine has:
    ${db.water} ml of water
    ${db.milk} ml of milk
    ${db.beans} g of coffee beans
    ${db.cups} disposable cups
    $${db.money} of money`);
        mainMenu();
    }

    const exit = () => {
        work = Actions.EXIT;
    }

    const mainMenu = () => {
        let action = input(`Write action (buy, fill, take, remaining, exit):`);
        if (action === Actions.BUY) {
            buy();
        } else if (action === Actions.FILL) {
            fill();
        } else if (action === Actions.TAKE) {
            take();
        } else if (action === Actions.REMAIN) {
            remaining();
        } else if (action === Actions.EXIT) {
            exit();
        }
        else {
            console.log("invalid input");
        }
    }
    //start
   mainMenu();
}

