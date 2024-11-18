// Configuração das perguntas do quiz
const questions = [
    {
        question: "Qual é o tipo de variável correto para armazenar um número inteiro em Java?",
        options: [
            "string",
            "int",
            "decimal",
            "text"
        ],
        correct: 1
    },
    {
        question: "Como declarar corretamente uma variável do tipo String em Java?",
        options: [
            "String nome = João;",
            "string nome = 'João';",
            "String nome = \"João\";",
            "texto nome = \"João\";"
        ],
        correct: 2
    },
    {
        question: "Qual tipo de variável é usado para armazenar números com decimais em Java?",
        options: [
            "int",
            "float",
            "decimal",
            "double"
        ],
        correct: 3
    },
    {
        question: "Qual é o tipo correto para armazenar valores verdadeiro/falso em Java?",
        options: [
            "boolean",
            "bool",
            "TrueFalse",
            "Binary"
        ],
        correct: 0
    },
    {
        question: "Qual das seguintes é uma declaração válida de variável em Java?",
        options: [
            "1numero = 10;",
            "numero-um = 10;",
            "numeroUm = 10;",
            "@numero = 10;"
        ],
        correct: 2
    },
    {
        question: "Qual é o valor padrão de uma variável int quando ela é declarada sem valor inicial?",
        options: [
            "1",
            "0",
            "null",
            "undefined"
        ],
        correct: 1
    },
    {
        question: "Qual declaração está correta para uma constante em Java?",
        options: [
            "constant int MAX = 100;",
            "const int MAX = 100;",
            "final int MAX = 100;",
            "static int MAX = 100;"
        ],
        correct: 2
    }
];

// Variáveis globais
let currentQuestion = 0;
let score = 0;
let quizStarted = false;

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    themeToggle.addEventListener('click', () => {
        const html = document.documentElement;
        const isDark = html.getAttribute('data-theme') === 'dark';
        
        html.setAttribute('data-theme', isDark ? 'light' : 'dark');
        themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    });

    // Start Quiz Button
    document.getElementById('startQuiz').addEventListener('click', startQuiz);
});

// Funções do Quiz
function startQuiz() {
    document.getElementById('studySection').classList.remove('active');
    document.getElementById('quizSection').classList.add('active');
    quizStarted = true;
    showQuestion();
}

function showQuestion() {
    const questionContainer = document.getElementById('questionContainer');
    const currentQ = questions[currentQuestion];
    const progress = ((currentQuestion) / questions.length) * 100;

    document.querySelector('.progress').style.width = `${progress}%`;

    questionContainer.innerHTML = `
        <div class="question">
            <h3>Questão ${currentQuestion + 1} de ${questions.length}</h3>
            <p>${currentQ.question}</p>
        </div>
        <div class="options">
            ${currentQ.options.map((option, index) => `
                <div class="option" onclick="selectOption(${index})">
                    ${option}
                </div>
            `).join('')}
        </div>
    `;
}

function selectOption(optionIndex) {
    if (!quizStarted) return;

    const options = document.querySelectorAll('.option');
    const currentQ = questions[currentQuestion];

    // Desabilita todas as opções após a seleção
    options.forEach(option => option.style.pointerEvents = 'none');

    // Marca a resposta correta e errada
    options[currentQ.correct].classList.add('correct');
    if (optionIndex !== currentQ.correct) {
        options[optionIndex].classList.add('wrong');
    } else {
        score++;
    }

    // Aguarda um momento antes de passar para a próxima questão
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 1500);
}

function showResult() {
    const percentage = (score / questions.length) * 100;
    const resultContainer = document.getElementById('questionContainer');
    
    let message, buttonText, buttonAction;
    
    if (percentage < 50) {
        message = `
            <h2>Você acertou ${score} de ${questions.length} questões (${percentage}%)</h2>
            <p>Que tal revisar o conteúdo e tentar novamente?</p>
        `;
        buttonText = "Tentar Novamente";
        buttonAction = "location.reload()";
    } else {
        message = `
            <h2>Parabéns! Você acertou ${score} de ${questions.length} questões (${percentage}%)</h2>
            <p>Você está pronto para avançar para a próxima fase!</p>
        `;
        buttonText = "Próxima Fase";
        buttonAction = "window.location.href='../fase3/index.html'";
    }

    resultContainer.innerHTML = `
        <div class="result-container">
            ${message}
            <button class="neon-button" onclick="${buttonAction}">
                ${buttonText}
                <i class="fas fa-arrow-right"></i>
            </button>
        </div>
    `;
}

// Efeitos visuais adicionais (opcional)
function addVisualEffects() {
    // Adiciona efeito de hover nas opções
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('mouseenter', () => {
            option.style.transform = 'translateX(10px)';
        });
        option.addEventListener('mouseleave', () => {
            option.style.transform = 'translateX(0)';
        });
    });
}