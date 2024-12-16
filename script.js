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
    'Q': 'https://media.discordapp.net/attachments/852993484288688198/1318144659717095494/image.png?ex=67614160&is=675fefe0&hm=53cc3be991557301462c1254cc38f78145b580aea95de3359cc92094fd4b7782&=&format=webp&quality=lossless&width=111&height=115',
    'W': 'https://media.discordapp.net/attachments/852993484288688198/1318144779271278592/image.png?ex=6761417d&is=675feffd&hm=d68530ee422f2b459ec2b431fb839ce14f6b7204aec352c3b563dc368a3b5cc7&=&format=webp&quality=lossless&width=107&height=111',
    'E': 'https://media.discordapp.net/attachments/852993484288688198/1318144847873572964/image.png?ex=6761418d&is=675ff00d&hm=d05306e289d9daad33ec11f4e79413fe8f8a240e1d5759936144052e642edb8d&=&format=webp&quality=lossless&width=107&height=112'
};
const comboImages = {
    'Q,Q': 'https://media.discordapp.net/attachments/852993484288688198/1318182435464286228/image.png?ex=6761648f&is=6760130f&hm=a6078db16d314c0e50aaefe74fd8130ad9536b54ed5f566102bc3ec7770d3867&=&format=webp&quality=lossless&width=70&height=68',
    'Q,W': 'https://media.discordapp.net/attachments/852993484288688198/1318182446667403284/image.png?ex=67616491&is=67601311&hm=de26eb9d3cbadd6ef5d6ebad6e5cbd168d2b87cae005356ab30ef444aa85d41c&=&format=webp&quality=lossless&width=72&height=70',
    'Q,E': 'https://media.discordapp.net/attachments/852993484288688198/1318182516963807252/image.png?ex=676164a2&is=67601322&hm=7aa6c2c9a4e93e546069faed02a431330786da0e4caa92defcce53df436e50a0&=&format=webp&quality=lossless&width=72&height=71',
    'W,Q': 'https://media.discordapp.net/attachments/852993484288688198/1318182567031214150/image.png?ex=676164ae&is=6760132e&hm=8a50a18c249b1a76010860df8a51380d811c41cadffb6be6e8773a07aa350065&=&format=webp&quality=lossless&width=72&height=70',
    'W,E': 'https://media.discordapp.net/attachments/852993484288688198/1318184428203278356/image.png?ex=6761666a&is=676014ea&hm=3f64700b0130cc4ef2bb6362e02993adffd18c05be8aa62746af16c270994f5b&=&format=webp&quality=lossless&width=70&height=68',
    'W,W': 'https://media.discordapp.net/attachments/852993484288688198/1318182601684418601/image.png?ex=676164b6&is=67601336&hm=f0ea739c4b9eaae35f5322b17ee68114ce332869026069c3824074c2594e256a&=&format=webp&quality=lossless&width=73&height=71',
    'E,Q': 'https://media.discordapp.net/attachments/852993484288688198/1318182692872912896/image.png?ex=676164cc&is=6760134c&hm=48aa5588c19ac0bcf5bbbbbbdba918c55e9049a143db246d7d74e1df51c735c9&=&format=webp&quality=lossless&width=72&height=69',
    'E,W': 'https://media.discordapp.net/attachments/852993484288688198/1318182730638557204/image.png?ex=676164d5&is=67601355&hm=b1dc948de05f054ec74595a1a12a72912a7703b54822e15fc03673474b5cc38b&=&format=webp&quality=lossless&width=69&height=69',
    'E,E': 'https://media.discordapp.net/attachments/852993484288688198/1318182774661709824/image.png?ex=676164e0&is=67601360&hm=e97df74e16b7b2c2f04b15ca62e4a71587d7367079022581857460cde8cfebd3&=&format=webp&quality=lossless&width=71&height=72',
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
 