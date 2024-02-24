let gameSeq = [];
let userSeq = [];
let bodyy = document.querySelector("body");
let started = false;
let level = 0;
let head2 = document.querySelector("h2");
let buttons = ["pink", "grey", "orange", "blue"];
let highestScore = 0;

// Pressing any character key will start the game
// Remember Cursor should not be in console..otherwise letters will start typing there..and game will not start--> as keypressing will not become an event for our webpage

document.addEventListener("keypress", function () {
    if (started == false) {
        started = true;
        console.log("Game Started!");
        levelUp();
    }
})

function levelUp() {
    level++;
    head2.innerText = `Level ${level}`;
    let random_color = Math.floor(Math.random() * (buttons.length));
    let element = document.querySelector(`.${buttons[random_color]}`);
    gameSeq.push(buttons[random_color]);
    userSeq.length = 0;
    gameFlash(element);
}


// color flashes--> 1) when we click on any color
// 2) when level increases
function gameFlash(btn1) {
    setTimeout(() => {
        btn1.classList.add("whiteFlash");
        setTimeout(function () {
            btn1.classList.remove("whiteFlash");
        }, 200);
    }, 700);
}

function userFlash(btn1) {
    btn1.classList.add("blackFlash");
    setTimeout(function () {
        btn1.classList.remove("blackFlash");
    }, 200);
}


// no. of level==length of gameseq and userseq 
function buttonPress() {
    console.log(`${this.classList[1]} color button is pressed`);
    userSeq.push(this.classList[1]);
    userFlash(this);
    checkAns();
}

// buttonPress ke aage () nhi lgenge
let allButtons = document.querySelectorAll(".btn");
for (i of allButtons) {
    i.addEventListener("click", buttonPress);
}

function checkAns() {
    if (gameSeq[userSeq.length - 1] === userSeq[userSeq.length - 1]) {
        if ((level == gameSeq.length) && (level == userSeq.length)) {
            console.log(`Level${level} Completed! Correct sequence,Good Job!   `);
            levelUp();
        }
    }
    else {
        bodyy.classList.add("red");
        setTimeout(function () {
            bodyy.classList.remove("red");
        }, 200);
        highestScore = Math.max(highestScore, level - 1);
        head2.innerHTML = `Game over! Your score is <b>${level - 1}</b> and Today's Highest Score is ${highestScore},<br> Press any key to start`;
        console.log(`Level=${level},game seq is ${gameSeq} whereas user seq is ${userSeq}`);
        console.log("game over!");
        reset();
    }
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}