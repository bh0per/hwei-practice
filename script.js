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
    'Q': 'https://photos.fife.usercontent.google.com/pw/AP1GczOurUxy_Y-x6lfh052-trpyLhM3gEIcN7nAlHaSivE9y3HM9LfwNc4=w101-h105-s-no-gm?authuser=1',
    'W': 'https://photos.fife.usercontent.google.com/pw/AP1GczPlQbl-R9_Xap4-rG6A_HYwCjzk7eNTWYf8OMGI87nFDK5ySgbYu04=w98-h101-s-no-gm?authuser=1',
    'E': 'https://photos.fife.usercontent.google.com/pw/AP1GczMg-s2glwAglC0DweNknSbZ3vlp9O7U9lAw1TmYqbljptPA8hosRV0=w98-h102-s-no-gm?authuser=1'
};
const comboImages = {
    'Q,Q': 'https://photos.fife.usercontent.google.com/pw/AP1GczMO0l0eUyITcdP0rkzH0tXXx-oPlBz3SBUZGdD8UfxR-ZqBZ07t6Oc=w64-h62-s-no-gm?authuser=1',
    'Q,W': 'https://photos.fife.usercontent.google.com/pw/AP1GczMhBCzuFcIElR8jvhWbMVpBqfONrqoptSkpMaPTwH6W0YBMb8rf76s=w66-h64-s-no-gm?authuser=1',
    'Q,E': 'https://photos.fife.usercontent.google.com/pw/AP1GczPUf87yNZrCX8tNFKhKh9ffOGTtBnvaVrMEj5_j5qobDgpa4X7nzXE=w66-h65-s-no-gm?authuser=1',
    'W,Q': 'https://photos.fife.usercontent.google.com/pw/AP1GczNKNBTpPlZeYm1ar4zXtGDJBKe1BkcVz_gA8Q7NmTXfCnxd0mPD3wM=w66-h64-s-no-gm?authuser=1',
    'W,E': 'https://photos.fife.usercontent.google.com/pw/AP1GczNetAi8VH6iXohg4E--sEaJ2_lZREfMwx0tQl2G03wr-Q1iRlDnhPk=w64-h62-s-no-gm?authuser=1',
    'W,W': 'https://photos.fife.usercontent.google.com/pw/AP1GczNqNPKHkoxJOodwnxDis4aP_oLqeVR_6T5IedVtWRLeawTjRDiXQ9I=w67-h65-s-no-gm?authuser=1',
    'E,Q': 'https://photos.fife.usercontent.google.com/pw/AP1GczPZJ4Eorg9WkJUkn6phOeVbQrle3xagvnDQvD9wKLHpshYowSRDHyQ=w66-h63-s-no-gm?authuser=1',
    'E,W': 'https://photos.fife.usercontent.google.com/pw/AP1GczNyd2VgfXn87RnsMsRc8GIslQ_XgLXAMHz90ggt_OemVlQCr2aqi7Q=w63-h63-s-no-gm?authuser=1',
    'E,E': 'https://photos.fife.usercontent.google.com/pw/AP1GczPYp9N0NjnTZjWUgS4NtKyDJ13Q9r8Ax31O4zxkAN0BlqKM1QInu3A=w65-h66-s-no-gm?authuser=1',
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
