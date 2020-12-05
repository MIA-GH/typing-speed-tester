const typingBox = document.querySelector("#test-area");
let originText = document.querySelector(".text-to-type p").innerHTML;
const resetButton = document.querySelector(".reset-button");
const nextButton = document.querySelector(".next-button");
const testWrapper = document.querySelector("#test-area");
const theTimer = document.querySelector(".time");
const originalText = document.querySelector(".text-to-type p");

const menuIcon = document.querySelector(".mobile");
const mobile = document.querySelector(".show");
const menuIconClose = document.querySelector(".close-menu");
const logo = document.querySelector(".logo");
const menuItems = document.querySelectorAll(".nav-item");
const testButton = document.querySelector(".nav-item-1");
let menuIsOpen = false;

let initialText = "Marriage is a workshop where the man works and the woman shops";

let timer = [0, 0, 0, 0];
let interval;
let timerRunning = false;
let current = 1;


let data = {
    1 : "All my life I thought air was free until I bought a bag of chips",
    2 : "I am going to stand outside, so if anyone asks, I am OutStanding",
    3 : "Dear God please if you can't make me slim then please make my friends fat",
    4 : "Long before the birth of light there was darkness",
    5 : "And from that darkness came the dark elves",
    6 : "This is the six challenge",
    7 : "This is the seventh challenge",
    8 : "This is the eight challenge",
    9 : "This is the ninth challenge",
    10 : "This is the tenth challenge",
}

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time){
    if (time <= 9) {
        time = "0" + time;
    }
    return time;
}

// run timer
function runTimer(){
    theTimer.innerHTML = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    timer[3]++;

    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
    timer[2] = Math.floor((timer[3]) - (timer[1] * 100) - (timer[0] * 6000));
}

// start
function start() {
    let textEnteredLength = typingBox.value.length;
    if(textEnteredLength === 0 && !timerRunning){
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }
}

// spell check
function spellCheck() {
    let textEntered = typingBox.value;
    let originTextMatch = originText.substring(0, textEntered.length)

    if (textEntered === originText){
        clearInterval(interval);
        testWrapper.style.borderColor = "#149800";
    }else{
        if (textEntered === originTextMatch) {
            testWrapper.style.borderColor = "#65CCf3";
        } else {
            testWrapper.style.borderColor = "#e90f0f";
        }
    }
}

// reset
function reset() {
    clearInterval(interval);
    interval = null;
    timer = [0,0,0,0];
    timerRunning = false;
    typingBox.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "#fcb045";
    originalText.innerHTML = initialText;
    originText = initialText;
    current = 1;
}

function nextChallenge(){
    reset();
    originalText.innerHTML = data[current];
    originText = data[current];
    current === 10 ? current = 1 : current++;
}

function openMenu(){
    mobile.classList.remove('nav-list');
    mobile.classList.add('open-menu');
    menuIconClose.style.display = "block";
    menuIsOpen = true;
    console.log("open");

}

function closeMenu(){
    mobile.classList.remove("open-menu");
    mobile.classList.add('nav-list');
    menuIconClose.style.display = "none";
    menuIsOpen = false;
}

menuIconClose.addEventListener("click", closeMenu, false);
menuIcon.addEventListener("click", openMenu, false);
logo.addEventListener("click", closeMenu, false);
testButton.addEventListener("click", closeMenu, false);
menuItems.forEach(element => {
    element.addEventListener("click", closeMenu, false);
});

typingBox.addEventListener("keypress", start, false);
typingBox.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);
nextButton.addEventListener("click", nextChallenge, false);
