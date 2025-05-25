function task1_sumFirst50NaturalNumbers() {
    let sum = 0;
    let i = 1;
    while (i <= 50) {
        sum += i;
        i++;
    }
    console.log("Завдання 1: Сума перших 50 натуральних чисел =", sum);
}
function task2_factorial(n) {
    function factorial(num) {
        if (num === 0 || num === 1) {
            return 1;
        }
        return num * factorial(num - 1);
    }

    const result = factorial(n);
    console.log(`Завдання 2 (рекурсія): Факторіал числа ${n} =`, result);
}


function task3_getMonthName(num) {
    let month;
    switch (num) {
        case 1: month = "Січень"; break;
        case 2: month = "Лютий"; break;
        case 3: month = "Березень"; break;
        case 4: month = "Квітень"; break;
        case 5: month = "Травень"; break;
        case 6: month = "Червень"; break;
        case 7: month = "Липень"; break;
        case 8: month = "Серпень"; break;
        case 9: month = "Вересень"; break;
        case 10: month = "Жовтень"; break;
        case 11: month = "Листопад"; break;
        case 12: month = "Грудень"; break;
        default: month = "Невірне число";
    }
    console.log(`Завдання 3: Місяць для числа ${num} =`, month);
}

function task4_sumEvenNumbers(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] % 2 === 0) {
            sum += arr[i];
        }
    }
    console.log("Завдання 4: Сума парних чисел у масиві =", sum);
}

function task5_countVowels(str) {
    const vowels = 'aeiouаеиіоуїєюяAEIOUАЕИІОУЇЄЮЯ';
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if (vowels.includes(str[i])) {
            count++;
        }
    }
    console.log("Завдання 5: Кількість голосних у рядку =", count);
}


function task6_power(base, exponent) {
    const result = Math.pow(base, exponent);
    console.log(`Завдання 6: ${base} у степені ${exponent} =`, result);
}

task1_sumFirst50NaturalNumbers();
task2_factorial(5);
task3_getMonthName(4);
task4_sumEvenNumbers([1, 2, 3, 4, 5, 6]);
task5_countVowels("Привіт, як справи?");
task6_power(2, 3);

