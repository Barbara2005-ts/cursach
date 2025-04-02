const colors = ['#800df2', '#f20dde', 'blue', 'yellow', 'orange', 'purple', 'pink', 'cyan'];
let sequence = [];
let playerSequence = [];
let level = 0;

const colorsDiv = document.getElementById('colors');
const startButton = document.getElementById('startButton');
const messageDiv = document.getElementById('message');
const buttonContainer = document.getElementById('buttonContainer');

startButton.addEventListener('click', startGame);

function startGame() {
    level = 0;
    sequence = [];
    messageDiv.textContent = '';
    buttonContainer.innerHTML = ''; // Очищаем контейнер для кнопок
    startButton.style.display = 'none'; // Скрываем кнопку "Начать игру"
    createColorButtons(); // Создаём кнопки для цветов
    nextLevel();
}

function createColorButtons() {
    colors.forEach(color => {
        const button = document.createElement('button');
        button.className = 'color-button';
        button.style.backgroundColor = color;

        // Обработчик события для нажатия на кнопку
        button.addEventListener('click', () => {
            button.classList.add('active'); // Добавляем класс для подсветки

            // Убираем класс через 300 мс
            setTimeout(() => {
                button.classList.remove('active');
            }, 300);

            handleColorClick(color); // Обрабатываем клик
        });

        buttonContainer.appendChild(button);
    });
    buttonContainer.style.display = 'grid'; // Используем grid для отображения кнопок
}

function nextLevel() {
    level++;
    playerSequence = [];
    sequence.push(colors[Math.floor(Math.random() * colors.length)]);
    showSequence();
}

function showSequence() {
    messageDiv.textContent = ''; // Очищаем сообщение
    let index = 0;
    const interval = setInterval(() => {
        if (index < sequence.length) {
            const color = sequence[index];
            const button = Array.from(buttonContainer.children).find(btn => btn.style.backgroundColor === color);
            button.classList.add('visible'); // Подсвечиваем кнопку

            setTimeout(() => {
                button.classList.remove('visible'); // Убираем подсветку
            }, 500);

            index++;
        } else {
            clearInterval(interval);
            setTimeout(() => {
                askForInput();
            }, 1000);
        }
    }, 1000);
}

function askForInput() {
    messageDiv.textContent = 'Нажмите цвета в правильной последовательности:';
}

function handleColorClick(color) {
    playerSequence.push(color);
    const currentIndex = playerSequence.length - 1;

    if (playerSequence[currentIndex] === sequence[currentIndex]) {
        if (playerSequence.length === sequence.length) {
            checkSequence();
        }
    } else {
        messageDiv.textContent = 'Неправильно! Игра окончена. Нажмите "Начать игру", чтобы попробовать снова.';
        buttonContainer.style.display = 'none'; // Скрываем кнопки
        startButton.style.display = 'inline'; // Показываем кнопку "Начать игру"
    }
}

function checkSequence() {
    messageDiv.textContent = 'Правильно! Переходите к следующему уровню.';
    setTimeout(nextLevel, 2000);
}