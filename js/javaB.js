let currentPhase = 0;
let correctAnswers = 0;

const phrases = [
    {
        text: "Como você imprime 'Olá, Mundo!' em Java?",
        options: ["System.out.println", "\"Olá, Mundo!\"", ";", "(", ")"],
        answer: ["System.out.println", "(", "\"Olá, Mundo!\"", ")", ";"],
        explanation: "Para imprimir 'Olá, Mundo!' em Java, usamos o método System.out.println(), que imprime o texto e pula para a próxima linha."
    },
    {
        text: "Como criar uma variável chamada x e atribuir a ela o valor 5 em Java?",
        options: ["int", "x", "=", "5", ";", "double"],
        answer: ["int", "x", "=", "5", ";"],
        explanation: "Em Java, declaramos uma variável especificando seu tipo (como int) seguido pelo nome da variável, atribuição de valor e ponto e vírgula."
    },
    {
        text: "Como pedir ao usuário para digitar seu nome e armazenar em uma variável chamada nome em Java?",
        options: ["Scanner", "new", "=", "nome", "(", "System.in", ")", "nextLine"],
        answer: ["Scanner", "scanner", "=", "new", "Scanner", "(", "System.in", ")", ";", "String", "nome", "=", "scanner.nextLine", "(", ")", ";"],
        explanation: "Em Java, usamos a classe Scanner para receber a entrada do usuário e armazenar o valor na variável especificada."
    },
    {
        text: "Como somar 10 e 20 em Java?",
        options: ["+", "20", "10", "int", "soma", "="],
        answer: ["int", "soma", "=", "10", "+", "20", ";"],
        explanation: "Em Java, podemos somar dois números usando o operador + e armazenar o resultado em uma variável."        
    },
    {
        text: "Como somar 10 e 20?",
        options: ["10", "x", "7", ")", "20", "+"],
        answer: ["10", "+", "20", ")"],
        explanation: "Podemos somar dois números em Python usando o operador +."
    }
];

function loadPhase() {
    const phrase = phrases[currentPhase];
    document.getElementById('phrase').innerText = phrase.text;
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = ''; // Limpa opções anteriores

    phrase.options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'btn btn-outline-light option';
        button.innerText = option;
        button.onclick = () => selectOption(button);
        optionsContainer.appendChild(button);
    });

    document.getElementById('translatedSentence').innerText = '';
    document.getElementById('resultMessage').innerText = '';
    updateProgress();
}

function selectOption(button) {
    const selectedWord = button.innerText;
    const translatedSentence = document.getElementById('translatedSentence');

    if (!translatedSentence.innerText.includes(selectedWord)) {
        translatedSentence.innerText += (translatedSentence.innerText ? ' ' : '') + selectedWord;
    }
}

function checkAnswer() {
    const translatedSentenceArray = document.getElementById('translatedSentence').innerText.split(' ');
    const correctAnswer = phrases[currentPhase].answer;
    const isCorrect = JSON.stringify(translatedSentenceArray) === JSON.stringify(correctAnswer);

    if (isCorrect) {
        correctAnswers++;
        document.getElementById('resultMessage').innerText = "Resposta correta!";
    } else {
        document.getElementById('resultMessage').innerText = "Resposta errada! A resposta correta era: " + correctAnswer.join(' ');
    }

    document.getElementById('menuButton').classList.remove('d-none');
}

function nextPhase() {
    checkAnswer();
    currentPhase++;
    if (currentPhase < phrases.length) {
        showExplanation();
    } else {
        showResults();
    }
}

function showExplanation() {
    const phrase = phrases[currentPhase];
    document.getElementById('explanationTitle').innerText = `Fase ${currentPhase + 1}`;
    document.getElementById('explanationText').innerText = phrase.explanation;
    document.getElementById('explanationContainer').classList.remove('d-none');
    document.getElementById('quizContainer').classList.add('d-none');
}

function showPhase() {
    document.getElementById('explanationContainer').classList.add('d-none');
    document.getElementById('quizContainer').classList.remove('d-none');
    loadPhase();
}

function updateProgress() {
    const progress = ((currentPhase + 1) / phrases.length) * 100;
    const progressBar = document.getElementById('progress');
    progressBar.style.width = progress + '%';
    progressBar.setAttribute('aria-valuenow', progress);
}

function showResults() {
    const totalQuestions = phrases.length;
    const percentage = ((correctAnswers / totalQuestions) * 100).toFixed(2);
    let message;

    if (percentage === 100) {
        message = "Parabéns! Você acertou todas as questões!";
    } else if (percentage >= 75) {
        message = "Ótimo trabalho! Você acertou " + correctAnswers + " de " + totalQuestions + " (" + percentage + "%).";
    } else if (percentage >= 50) {
        message = "Bom esforço! Você acertou " + correctAnswers + " de " + totalQuestions + " (" + percentage + "%).";
    } else {
        message = "Você acertou " + correctAnswers + " de " + totalQuestions + " (" + percentage + "%). Tente novamente!";
    }

    document.getElementById('finalMessage').innerText = message;
    document.getElementById('translatedSentence').innerText = '';
    document.getElementById('optionsContainer').innerHTML = '';
    document.getElementById('progress').style.width = '100%';
    document.getElementById('phrase').innerText = '';
    document.getElementById('quizContainer').classList.add('d-none');
    document.getElementById('resultsContainer').classList.remove('d-none');
}

function goToMenu() {
    currentPhase = 0;
    correctAnswers = 0;
    document.getElementById('resultsContainer').classList.add('d-none');
    loadPhase();
    document.getElementById('menuButton').classList.add('d-none');
    document.getElementById('quizContainer').classList.remove('d-none');
}

document.addEventListener('DOMContentLoaded', () => {
    showExplanation(); 
});
