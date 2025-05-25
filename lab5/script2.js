const red = document.getElementById("red");
const yellow = document.getElementById("yellow");
const green = document.getElementById("green");
const status = document.getElementById("status");

let durations = {
    red: 5000,
    yellow: 3000,
    green: 7000
};

let states = ["red", "yellow", "green", "yellowBlink"];
let currentIndex = 0;
let blinkCount = 0;
let interval = null;
let timeout = null;

function clearLights() {
    red.classList.remove("active");
    yellow.classList.remove("active");
    green.classList.remove("active");
}

function updateStatus(text) {
    status.textContent = "Стан: " + text;
}

function switchState(state) {
    clearLights();
    switch (state) {
        case "red":
            red.classList.add("active");
            updateStatus("червоний");
            timeout = setTimeout(() => changeState(), durations.red);
            break;
        case "yellow":
            yellow.classList.add("active");
            updateStatus("жовтий");
            timeout = setTimeout(() => changeState(), durations.yellow);
            break;
        case "green":
            green.classList.add("active");
            updateStatus("зелений");
            timeout = setTimeout(() => changeState(), durations.green);
            break;
        case "yellowBlink":
            blinkCount = 0;
            updateStatus("миготливий жовтий");
            interval = setInterval(() => {
                yellow.classList.toggle("active");
                blinkCount++;
                if (blinkCount >= 6) {
                    clearInterval(interval);
                    changeState();
                }
            }, 500);
            break;
    }
}

function changeState() {
    currentIndex = (currentIndex + 1) % states.length;
    switchState(states[currentIndex]);
}

function startTrafficLight() {
    switchState(states[currentIndex]);
}

function nextState() {
    clearTimeout(timeout);
    clearInterval(interval);
    changeState();
}

function setDurations() {
    let redTime = parseInt(prompt("Час червоного (сек):", durations.red / 1000)) * 1000;
    let yellowTime = parseInt(prompt("Час жовтого (сек):", durations.yellow / 1000)) * 1000;
    let greenTime = parseInt(prompt("Час зеленого (сек):", durations.green / 1000)) * 1000;

    if (redTime && yellowTime && greenTime) {
        durations.red = redTime;
        durations.yellow = yellowTime;
        durations.green = greenTime;
        alert("Час оновлено!");
    }
}

// Старт при завантаженні
startTrafficLight();
