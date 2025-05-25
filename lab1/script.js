// Функція для кнопки
function showMessage() {
  alert("Hello world!");
}

// Обробка події наведення
window.onload = function() {
  const paragraph = document.getElementById("myParagraph");

  paragraph.onmouseover = function() {
    alert("Ім’я студента: Іван Іваненко"); // заміни на своє ім’я
  };
};
