// Цифровий годинник
function updateClock() {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    document.getElementById("clock").innerHTML = `${hh}<span class="blink">:</span>${mm}<span class="blink">:</span>${ss}`;
}
setInterval(updateClock, 1000);
updateClock();

// Таймер зворотного відліку
let countdownInterval;
function startCountdown() {
    clearInterval(countdownInterval);
    const end = new Date(document.getElementById("endTime").value);
    countdownInterval = setInterval(() => {
        const now = new Date();
        const diff = end - now;

        if (diff <= 0) {
            document.getElementById("countdown").textContent = "Час вийшов!";
            clearInterval(countdownInterval);
            return;
        }

        const seconds = Math.floor((diff / 1000) % 60);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        document.getElementById("countdown").textContent = `Залишилось: ${days} дн, ${hours} год, ${minutes} хв, ${seconds} сек`;
    }, 1000);
}

// Календар
function renderCalendar() {
    const input = document.getElementById("calendarMonth").value;
    const date = input ? new Date(input + "-01") : new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let calendar = "<table><tr>";
    ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"].forEach(d => {
        calendar += `<th>${d}</th>`;
    });
    calendar += "</tr><tr>";

    for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
        calendar += "<td></td>";
    }

    for (let d = 1; d <= daysInMonth; d++) {
        calendar += `<td>${d}</td>`;
        if ((firstDay + d - 1) % 7 === 0) {
            calendar += "</tr><tr>";
        }
    }

    calendar += "</tr></table>";
    document.getElementById("calendar").innerHTML = calendar;
}

renderCalendar();

// День народження
function calculateBirthday() {
    const inputDate = new Date(document.getElementById("birthday").value);
    const now = new Date();
    const currentYear = now.getFullYear();

    let nextBirthday = new Date(currentYear, inputDate.getMonth(), inputDate.getDate());
    if (nextBirthday < now) {
        nextBirthday.setFullYear(currentYear + 1);
    }

    const diff = nextBirthday - now;

    const seconds = Math.floor((diff / 1000) % 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);

    document.getElementById("birthdayDiff").textContent =
        `До дня народження залишилось: ${months} міс, ${days % 30} дн, ${hours} год, ${minutes} хв, ${seconds} сек`;
}
