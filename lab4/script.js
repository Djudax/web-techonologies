'use strict';

function showFruitsStrings(array) {
    console.log("Початковий масив:", array);
    array.pop();
    console.log("Після видалення останнього елемента:", array);
    array.unshift("ананас");
    console.log("Після додавання 'ананас' на початок:", array);
    array.sort((a, b) => b.localeCompare(a));
    console.log("Відсортований у зворотньому алфавітному порядку:", array);
    console.log("Індекс 'яблуко':", array.findIndex(f => f.toLowerCase() === "яблуко"));
}

function showColorsStrings(array) {
    console.log("Початковий масив:", array);
    let longest = array.reduce((a, b) => a.length > b.length ? a : b);
    let shortest = array.reduce((a, b) => a.length < b.length ? a : b);
    console.log("Найдовший елемент:", longest);
    console.log("Найкоротший елемент:", shortest);
    array = array.filter(color => color.toLowerCase().includes("синій"));
    console.log("Масив з 'синій':", array);
    console.log("Об'єднаний рядок:", array.join(", "));
}

function showEmployees(array) {
    array.sort((a, b) => a.name.localeCompare(b.name));
    console.log("Відсортовано за іменем:", array);
    console.log("Розробники:", array.filter(e => e.position.toLowerCase() === "розробник"));
    let olderThan30 = array.filter(e => e.age >= 30);
    console.log("Після видалення працівників молодших 30:", olderThan30);
    array.push({ name: "Арсеній", age: 19, position: "Алкоголік" });
    console.log("Після додавання нового працівника:", array);
}

function showStudents() {
    let students = [
        { name: "Іван", age: 18, course: 2 },
        { name: "Марія", age: 19, course: 2 },
        { name: "Петро", age: 18, course: 1 },
        { name: "Олексій", age: 20, course: 3 },
        { name: "Андрій", age: 19, course: 1 }
    ];

    console.log("Початковий масив студентів:", students);
    students = students.filter(s => s.name !== "Олексій");
    console.log("Після видалення 'Олексій':", students);
    students.push({ name: "Арсеній", age: 19, course: 2 });
    console.log("Після додавання нового студента:", students);
    students.sort((a, b) => b.age - a.age);
    console.log("Відсортовано за віком:", students);
    const thirdCourseStudent = students.find(s => s.course === 3);
    console.log("Студент 3-го курсу:", thirdCourseStudent ? thirdCourseStudent.name : "Немає");
}

function showNumsArray(array) {
    console.log("Початковий масив:", array);
    const squares = array.map(n => n ** 2);
    console.log("Квадрати чисел:", squares);
    const evenNumbers = array.filter(n => n % 2 === 0);
    console.log("Парні числа:", evenNumbers);
    const sum = array.reduce((acc, n) => acc + n, 0);
    console.log("Сума чисел:", sum);
    const extendedArray = array.concat([11, 22, 33, 44, 55]);
    console.log("Після додавання нових чисел:", extendedArray);
    extendedArray.splice(0, 3);
    console.log("Після видалення перших 3 елементів:", extendedArray);
}

function libraryManagement() {
    let library = [
        { title: "Книга 1", author: "Автор 1", genre: "Фантастика", pages: 300, isAvailable: true },
        { title: "Книга 2", author: "Автор 2", genre: "Детектив", pages: 250, isAvailable: false }
    ];

    function addBook(title, author, genre, pages) {
        library.push({ title, author, genre, pages, isAvailable: true });
    }

    function removeBook(title) {
        library = library.filter(book => book.title !== title);
    }

    function findBooksByAuthor(author) {
        return library.filter(book => book.author === author);
    }

    function toggleBookAvailability(title, isBorrowed) {
        const book = library.find(b => b.title === title);
        if (book) book.isAvailable = !isBorrowed;
    }

    function sortBooksByPages() {
        library.sort((a, b) => a.pages - b.pages);
    }

    function getBooksStatistics() {
        const total = library.length;
        const available = library.filter(b => b.isAvailable).length;
        const taken = total - available;
        const avgPages = total ? library.reduce((sum, b) => sum + b.pages, 0) / total : 0;
        return { total, available, taken, avgPages };
    }

    addBook("Книга 3", "Автор 3", "Роман", 200);
    removeBook("Книга 1");
    console.log("Книги автора Автор 3:", findBooksByAuthor("Автор 3"));
    toggleBookAvailability("Книга 2", true);
    sortBooksByPages();
    console.log("Відсортовані книги:", library);
    console.log("Статистика:", getBooksStatistics());
}

function task7() {
    let student = {
        name: "Іван",
        course: 3
    };

    student.subjects = ["Математика", "Фізика", "Програмування"];
    console.log("Оновлений об'єкт студента:", student);
}

const task1Btn = document.getElementById('task1Btn');
const task2Btn = document.getElementById('task2Btn');
const task3Btn = document.getElementById('task3Btn');
const task4Btn = document.getElementById('task4Btn');
const task5Btn = document.getElementById('task5Btn');
const task6Btn = document.getElementById('task6Btn');
const task7Btn = document.getElementById('task7Btn');

let fruitsArray = ["Апельсин", "Банан", "Яблуко", "Груша"];
let colorsArray = ["Червоний", "Синій", "Оранжевий", "Жовтий", "Зелений", "Синій"];
let employees = [
    { name: "Іван", age: 28, position: "Менеджер" },
    { name: "Марія", age: 34, position: "HR-менеджер" },
    { name: "Петро", age: 40, position: "Розробник" },
    { name: "Оксана", age: 25, position: "Дизайнер" },
    { name: "Андрій", age: 30, position: "Розробник" }
];
let students = [
    { name: "Іван", age: 18, course: 2 },
    { name: "Марія", age: 19, course: 2 },
    { name: "Петро", age: 18, course: 1 },
    { name: "Олексій", age: 20, course: 3 },
    { name: "Андрій", age: 19, course: 1 }
];
let numsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

task1Btn.addEventListener('click', () => showFruitsStrings([...fruitsArray]));
task2Btn.addEventListener('click', () => showColorsStrings([...colorsArray]));
task3Btn.addEventListener('click', () => showEmployees([...employees]));
task4Btn.addEventListener('click', () => showStudents([...students]));
task5Btn.addEventListener('click', () => showNumsArray([...numsArray]));
task6Btn.addEventListener('click', () => libraryManagement());
task7Btn.addEventListener('click', () => task7());
