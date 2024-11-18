// Conteúdo de estudo
const studyContent = `
    <p>Em JavaScript, as variáveis são como caixas onde podemos guardar diferentes tipos de informações. Existem algumas formas de declarar variáveis:</p>

    <p><code>let</code> - Usado para valores que podem mudar
    <br>Exemplo: <code>let idade = 25;</code></p>

    <p><code>const</code> - Usado para valores que não mudam
    <br>Exemplo: <code>const PI = 3.14;</code></p>

    <p>Os principais tipos de dados em JavaScript são:</p>

    <p>1. <code>number</code> - Números (inteiros e decimais)
    <br>Exemplo: <code>let preco = 19.99;</code></p>

    <p>2. <code>string</code> - Texto
    <br>Exemplo: <code>let nome = "Maria";</code></p>

    <p>3. <code>boolean</code> - Verdadeiro ou Falso
    <br>Exemplo: <code>let ativo = true;</code></p>

    <p>4. <code>undefined</code> - Valor não definido
    <br>Exemplo: <code>let valor;</code></p>

    <p>5. <code>null</code> - Valor nulo (ausência intencional)
    <br>Exemplo: <code>let dados = null;</code></p>

    <p>Leia com atenção os exemplos acima e, quando estiver pronto, clique em "Começar Quiz" para testar seus conhecimentos!</p>
`;

// Questões do Quiz
const questions = [
    {
        question: "Qual palavra-chave é usada para declarar uma variável que pode ter seu valor alterado posteriormente?",
        options: [
            "const",
            "let",
            "var",
            "fixed"
        ],
        correct: 1
    },
    {
        question: "Qual é o tipo de dado usado para armazenar texto em JavaScript?",
        options: [
            "text",
            "word",
            "string",
            "char"
        ],
        correct: 2
    },
    {
        question: "Como declarar uma constante em JavaScript?",
        options: [
            "let x = 10;",
            "constant x = 10;",
            "final x = 10;",
            "const x = 10;"
        ],
        correct: 3
    },
    {
        question: "Qual é o valor de uma variável que foi declarada mas não inicializada?",
        options: [
            "null",
            "undefined",
            "0",
            "false"
        ],
        correct: 1
    },
    {
        question: "Qual tipo de dado é usado para representar números em JavaScript?",
        options: [
            "int",
            "float",
            "decimal",
            "number"
        ],
        correct: 3
    },
    {
        question: "Qual é o resultado do código: typeof 'Hello World'?",
        options: [
            "text",
            "string",
            "word",
            "undefined"
        ],
        correct: 1
    },
    {
        question: "Qual é a diferença entre null e undefined?",
        options: [
            "São a mesma coisa",
            "null é atribuído pelo JavaScript, undefined pelo programador",
            "undefined é atribuído pelo JavaScript, null pelo programador",
            "Não existe diferença na prática"
        ],
        correct: 2
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

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Carrega o conteúdo de estudo
    document.querySelector('.content').innerHTML = studyContent;

    // Event listener para começar o quiz
    document.getElementById('startQuizBtn').addEventListener('click', startQuiz);
});

function startQuiz() {
    document.getElementById('studySection').style.display = 'none';
    document.getElementById('quizSection').style.display = 'block';
    loadQuestion();
}

function loadQuestion() {
    const question = questions[currentQuestion];
    document.getElementById('currentQuestion').textContent = currentQuestion + 1;
    document.getElementById('questionText').textContent = question.question;

    const optionsContainer = document.querySelector('.options-container');
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(optionElement);
    });
}

function selectOption(index) {
    // Remove seleção anterior
    document.querySelectorAll('.option').forEach(option => {
        option.classList.remove('selected');
    });

    // Seleciona nova opção
    document.querySelectorAll('.option')[index].classList.add('selected');
    selectedOption = index;

    // Verifica resposta após um pequeno delay
    setTimeout(checkAnswer, 500);
}

function checkAnswer() {
    const question = questions[currentQuestion];
    const options = document.querySelectorAll('.option');

    // Marca resposta correta e incorreta
    options[question.correct].classList.add('correct');
    if (selectedOption !== question.correct) {
        options[selectedOption].classList.add('wrong');
    } else {
        score++;
    }

    // Aguarda um pouco antes de passar para próxima questão
    setTimeout(() => {
        currentQuestion++;
        
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }, 1500);
}

function showResults() {
    const percentage = Math.round((score / questions.length) * 100);
    document.getElementById('scoreValue').textContent = percentage;

    const message = percentage >= 50 
        ? "Parabéns! Você está pronto para avançar para a próxima fase!"
        : "Que tal revisar o conteúdo e tentar novamente?";
    
    document.getElementById('scoreMessage').textContent = message;
    
    document.querySelector('.question-container').style.display = 'none';
    document.getElementById('resultSection').style.display = 'block';

    // Event listeners para os botões
    document.getElementById('retryBtn').addEventListener('click', retryQuiz);
    document.getElementById('menuBtn').addEventListener('click', () => {
        window.location.href = '../index.html';
    });
}

function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedOption = null;
    
    document.querySelector('.question-container').style.display = 'block';
    document.getElementById('resultSection').style.display = 'none';
    
    loadQuestion();
}