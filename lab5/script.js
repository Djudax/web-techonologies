const lamp = document.getElementById("lamp");
const lampType = document.getElementById("lampType");
let isOn = false;
let timeout;

function toggleLamp() {
    isOn = !isOn;
    updateLamp();
    resetTimeout();
}

function updateLamp() {
    lamp.className = "lamp";
    if (isOn) {
        lamp.classList.add("on");
        if (lampType.value === "eco") {
            lamp.classList.add("dim");
        }
    }
}

function setBrightness() {
    if (!isOn) {
        alert("Спершу ввімкніть лампочку!");
        return;
    }

    if (lampType.value === "regular") {
        alert("Цей тип лампочки не підтримує регулювання яскравості.");
        return;
    }

    const value = prompt("Введіть яскравість (1-100):");
    const brightness = Math.max(1, Math.min(100, parseInt(value)));

    lamp.style.opacity = brightness / 100;
    resetTimeout();
}

function resetTimeout() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        isOn = false;
        updateLamp();
        lamp.style.opacity = 1;
    }, 5 * 60 * 1000); // 5 хвилин
}
