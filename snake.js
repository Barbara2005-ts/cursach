const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const box = 20; // размер клетки
let snake = [{ x: 9 * box, y: 9 * box }]; // начальная позиция змейки
let direction; // направление движения
let food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box }; // начальная позиция еды

// Обработчик нажатий клавиш
document.addEventListener('keydown', directionControl);

function directionControl(event) {
    if (event.keyCode === 37 && direction !== 'RIGHT') {
        direction = 'LEFT';
    } else if (event.keyCode === 38 && direction !== 'DOWN') {
        direction = 'UP';
    } else if (event.keyCode === 39 && direction !== 'LEFT') {
        direction = 'RIGHT';
    } else if (event.keyCode === 40 && direction !== 'UP') {
        direction = 'DOWN';
    }
}

// Функция отрисовки игры
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Отрисовка еды
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);

    // Отрисовка змейки
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? 'green' : 'lightgreen';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = 'darkgreen';
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // Текущая позиция змейки
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Изменение позиции змейки в зависимости от направления
    if (direction === 'LEFT') snakeX -= box;
    if (direction === 'UP') snakeY -= box;
    if (direction === 'RIGHT') snakeX += box;
    if (direction === 'DOWN') snakeY += box;

    // Проверка на поедание еды
    if (snakeX === food.x && snakeY === food.y) {
        food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box };
    } else {
        snake.pop(); // Удаляем последний элемент, если еда не съедена
    }

    // Добавляем новую голову змейки
    const newHead = { x: snakeX, y: snakeY };

    // Проверка на столкновение с границами или с самой собой
    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
        alert('Игра окончена!');
    }

    snake.unshift(newHead); // Добавляем новую голову
}

// Функция проверки столкновения
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

// Функция перезапуска игры
function restartGame() {
    clearInterval(game);
    snake = [{ x: 9 * box, y: 9 * box }];
    direction = null;
    food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box };
    game = setInterval(draw, 100);
}

// Запуск игры
let game = setInterval(draw, 100);