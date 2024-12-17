let combos = [
    ['Q', 'Q'],  // Rozbudowane kombinacje
    ['Q', 'W'],
    ['Q', 'E'],
    ['W', 'Q'],
    ['W', 'E'],
    ['W', 'W'],
    ['E', 'Q'],
    ['E', 'W'],
    ['E', 'E']
];

const keyImages = {
    'Q': 'qhwei.png',
    'W': 'hweiw.png',
    'E': 'hweie.png'
};
const comboImages = {
'Q,Q': 'qq.png',
'Q,W': 'qw.png',
'Q,E': 'qe.png',
'W,Q': 'wq.png',
'W,E': 'we.png',
'W,W': 'ww.png',
'E,Q': 'eq.png',
'E,W': 'ew.png',
'E,E': 'ee.png',

};

let correctCombo;
let userInputs = [];
let timerInterval;
let startTime;

function startTimer() {
    startTime = Date.now(); // Zapisujemy czas startu
    timerInterval = setInterval(function() {
        timeLeft = Math.max(0, 10 - Math.floor((Date.now() - startTime) / 1000)); // Czas w sekundach, nie idzie poniżej 0
        document.getElementById('time').textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            checkCombo();
        }
    }, 1000);
}

function generateRandomCombo() {
    const randomIndex = Math.floor(Math.random() * combos.length);
    correctCombo = combos[randomIndex]; // Losowanie kombinacji

    // Wyświetlenie tekstu kombinacji
    document.getElementById('combo-text').textContent = correctCombo.join(' -> ');

    // Wyświetlenie obrazka kombinacji
    const comboKey = correctCombo.join(',');
    const comboImage = comboImages[comboKey];
    const comboImageElement = document.getElementById('combo-image');

    if (comboImage) {
        comboImageElement.src = comboImage;
        comboImageElement.style.display = 'block'; // Pokazanie obrazka
    } else {
        comboImageElement.style.display = 'none'; // Ukrycie, jeśli brak obrazka
    }

    displayKeys(); // Wyświetlenie klawiszy
}


function displayKeys() {
    const keyButtonsContainer = document.getElementById('key-buttons');
    keyButtonsContainer.innerHTML = '';

    correctCombo.forEach(key => {
        let keyElement = document.createElement('div');
        keyElement.id = 'key-' + key;
        keyElement.classList.add('key-container');
        keyElement.style.backgroundImage = `url(${keyImages[key]})`;
        keyButtonsContainer.appendChild(keyElement);
    });
}

function checkCombo() {
    if (JSON.stringify(userInputs) === JSON.stringify(correctCombo)) {
        clearInterval(timerInterval); // Stop timer if user completes combo
        displayCompletionTime();
        displayCompletionMessage();
    } else {
        displayFeedback();
        resetGame();
    }
}

function handleKeyPress(event) {
    const key = event.key.toUpperCase();
    const keyElement = document.getElementById('key-' + key);

    if (correctCombo[userInputs.length] === key) {
        userInputs.push(key);
        keyElement.classList.add('correct');  // Dodanie klasy correct
        if (userInputs.length === correctCombo.length) {
            clearInterval(timerInterval); // Stop timer if user completes combo
            checkCombo();
        }
    } else {
        keyElement.classList.add('incorrect');
        displayFeedback();
        resetGame();
    }
}

function displayFeedback() {
    let feedbackElement = document.getElementById('feedback');
    feedbackElement.innerHTML = '';
    
    for (let i = 0; i < correctCombo.length; i++) {
        if (userInputs[i] === correctCombo[i]) {
            feedbackElement.innerHTML += `<span class="correct">${correctCombo[i]} </span>`;
        } else {
            feedbackElement.innerHTML += `<span class="incorrect">${userInputs[i] || '_'} </span>`;
        }
    }
}

function displayCompletionTime() {
    let endTime = Date.now();
    let elapsedTime = endTime - startTime; // Obliczamy czas miniony od startu
    let seconds = Math.floor(elapsedTime / 1000); // Liczymy sekundy
    let milliseconds = elapsedTime % 1000; // Resztkowe milisekundy
    
    document.getElementById('completion-time').textContent = `Combo completed in: ${seconds}s.${milliseconds.toString().padStart(3, '0')}ms`;
}

function displayCompletionMessage() {
    let messageElement = document.getElementById('completion-message');
    messageElement.style.display = 'block'; // Pokazuje komunikat
}

function resetGame() {
    timeLeft = 10;
    userInputs = [];
    document.getElementById('time').textContent = timeLeft;
    document.getElementById('feedback').innerHTML = '';
    document.getElementById('completion-time').textContent = '';
    document.getElementById('completion-message').style.display = 'none'; // Ukrywa komunikat
    startTimer();

    document.querySelectorAll('.key-container').forEach(function(el) {
        el.classList.remove('correct', 'incorrect');
    });

    generateRandomCombo();
}

document.addEventListener('keydown', handleKeyPress);
document.addEventListener('keydown', function(event) {
    if (event.key === ' ') {
        resetGame();
    }
});

// Initialize random combo
generateRandomCombo();
startTimer();
