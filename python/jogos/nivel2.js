// Configuração das perguntas do quiz
const questions = [
    {
        question: "Qual é o tipo de dado usado para armazenar texto em Python?",
        options: [
            "int",
            "str",
            "float",
            "bool"
        ],
        correct: 1,
        explanation: "str (string) é o tipo usado para texto em Python. Exemplo: nome = 'Python'"
    },
    {
        question: "Como converter o número 42 para uma string em Python?",
        options: [
            "int('42')",
            "float('42')",
            "str(42)",
            "text(42)"
        ],
        correct: 2,
        explanation: "str(42) converte o número 42 para a string '42'"
    },
    {
        question: "Qual é o resultado de type(3.14)?",
        options: [
            "<class 'int'>",
            "<class 'str'>",
            "<class 'number'>",
            "<class 'float'>"
        ],
        correct: 3,
        explanation: "3.14 é um número decimal, portanto seu tipo é float"
    },
    {
        question: "Qual dessas é uma variável com nome válido em Python?",
        options: [
            "1nome",
            "meu-nome",
            "nome_completo",
            "nome@completo"
        ],
        correct: 2,
        explanation: "nome_completo é válido. Variáveis não podem começar com números ou conter caracteres especiais (exceto _)"
    },
    {
        question: "Qual é o valor da variável x após: x = 5 + 2.0?",
        options: [
            "7",
            "7.0",
            "5.2",
            "erro"
        ],
        correct: 1,
        explanation: "Quando misturamos int e float em uma operação, o resultado é float: 7.0"
    },
    {
        question: "Qual é o tipo do valor False em Python?",
        options: [
            "string",
            "boolean",
            "bool",
            "false"
        ],
        correct: 2,
        explanation: "False é do tipo bool (boolean) em Python"
    },
    {
        question: "Como verificar o tipo de uma variável x em Python?",
        options: [
            "typeof(x)",
            "x.type()",
            "type(x)",
            "x.typeof"
        ],
        correct: 2,
        explanation: "type(x) é a função correta para verificar o tipo de uma variável em Python"
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
        feedbackElement.textContent = 'Que tal tentar novamente? A prática leva à perfeição!';
        document.getElementById('menuBtn').style.display = 'none';
    } else {
        feedbackElement.textContent = 'Ótimo trabalho! Você está pronto para a próxima fase!';
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