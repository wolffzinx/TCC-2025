// Configuração das perguntas do quiz
const questions = [
    {
        question: "Qual é a palavra-chave usada para definir uma função em Python?",
        options: [
            "function",
            "def",
            "func",
            "define"
        ],
        correct: 1,
        explanation: "Em Python, usamos 'def' para definir uma função. Exemplo: def minha_funcao():"
    },
    {
        question: "O que é um parâmetro de função?",
        options: [
            "O valor retornado pela função",
            "Uma variável definida dentro da função",
            "Uma variável que a função recebe para trabalhar",
            "O nome da função"
        ],
        correct: 2,
        explanation: "Parâmetros são variáveis que uma função recebe para processar. Exemplo: def soma(a, b):"
    },
    {
        question: "Qual a diferença entre return e print em uma função?",
        options: [
            "São a mesma coisa",
            "print mostra na tela, return envia valor para o programa",
            "return mostra na tela, print envia valor para o programa",
            "print só funciona com strings, return com números"
        ],
        correct: 1,
        explanation: "print() exibe valores na tela, enquanto return envia um valor de volta para onde a função foi chamada"
    },
    {
        question: "Como importar apenas a função randint do módulo random?",
        options: [
            "import randint from random",
            "from random import randint",
            "import random.randint",
            "from randint import random"
        ],
        correct: 1,
        explanation: "from random import randint é a forma correta de importar apenas a função randint do módulo random"
    },
    {
        question: "Qual módulo Python é usado para operações matemáticas como raiz quadrada?",
        options: [
            "calculator",
            "mathematics",
            "math",
            "compute"
        ],
        correct: 2,
        explanation: "O módulo math contém funções matemáticas como sqrt(), cos(), sin(), etc."
    },
    {
        question: "O que é escopo local em uma função?",
        options: [
            "Variáveis que podem ser usadas em qualquer lugar do programa",
            "Variáveis definidas dentro da função que só existem dentro dela",
            "Variáveis que são passadas como parâmetros",
            "Variáveis que são retornadas pela função"
        ],
        correct: 1,
        explanation: "Escopo local refere-se às variáveis definidas dentro de uma função que só podem ser acessadas dentro dela"
    },
    {
        question: "Como definir um valor padrão para um parâmetro de função?",
        options: [
            "def funcao(x = default)",
            "def funcao(x: default)",
            "def funcao(x = 10)",
            "def funcao(default x)"
        ],
        correct: 2,
        explanation: "Use = após o parâmetro para definir um valor padrão. Exemplo: def saudacao(nome = 'Usuário'):"
    }
];

let currentQuestion = 0;
let score = 0;
let selectedOption = null;

// Theme Toggle
document.getElementById('themeToggle').addEventListener('click', () => {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
    const themeIcon = document.querySelector('.theme-toggle i');
    themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
});

// Iniciar Quiz
document.getElementById('startQuizBtn').addEventListener('click', () => {
    document.getElementById('explanation').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    loadQuestion();
});

// Carregar Questão
function loadQuestion() {
    selectedOption = null;
    const question = questions[currentQuestion];
    
    document.getElementById('question').textContent = question.question;
    document.getElementById('questionNumber').textContent = `Pergunta ${currentQuestion + 1}/${questions.length}`;
    
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option';
        button.textContent = option;
        button.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(button);
    });
    
    document.getElementById('nextBtn').disabled = true;
}

// Selecionar Opção
function selectOption(index) {
    if (selectedOption !== null) return; // Previne múltiplas seleções
    
    selectedOption = index;
    const options = document.querySelectorAll('.option');
    const correctIndex = questions[currentQuestion].correct;
    
    options.forEach((option, i) => {
        option.classList.remove('selected', 'correct', 'wrong');
        if (i === index) {
            option.classList.add('selected');
            if (i === correctIndex) {
                option.classList.add('correct');
                score++;
            } else {
                option.classList.add('wrong');
            }
        } else if (i === correctIndex) {
            option.classList.add('correct');
        }
    });

    // Mostrar explicação
    const explanation = document.createElement('div');
    explanation.className = 'explanation';
    explanation.textContent = questions[currentQuestion].explanation;
    document.getElementById('options').appendChild(explanation);
    
    document.getElementById('nextBtn').disabled = false;
}

// Próxima Questão
document.getElementById('nextBtn').addEventListener('click', () => {
    currentQuestion++;
    
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

// Mostrar Resultado
function showResult() {
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    
    const percentage = (score / questions.length) * 100;
    const scoreElement = document.getElementById('score');
    const feedbackElement = document.getElementById('feedback');
    
    scoreElement.textContent = `Pontuação: ${score}/${questions.length} (${percentage.toFixed(1)}%)`;
    
    if (percentage < 50) {
        feedbackElement.textContent = 'Que tal revisar o conteúdo e tentar novamente? Funções e módulos são conceitos importantes!';
        document.getElementById('menuBtn').style.display = 'none';
    } else {
        feedbackElement.textContent = 'Excelente! Você demonstrou um bom entendimento de funções e módulos em Python!';
        document.getElementById('retryBtn').style.display = 'none';
    }
}

// Botões de Resultado
document.getElementById('retryBtn').addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    document.getElementById('result').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    loadQuestion();
});

document.getElementById('menuBtn').addEventListener('click', () => {
    window.location.href = '../index.html';
});