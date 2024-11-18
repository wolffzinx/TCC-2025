// Conteúdo de estudo
const studyContent = `
    <p>Em JavaScript, funções são blocos de código que podem ser reutilizados. Existem várias formas de criar funções:</p>

    <p>1. Função Declarativa:
    <br><code>function soma(a, b) {
    <br>    return a + b;
    <br>}</code></p>

    <p>2. Função de Expressão:
    <br><code>const soma = function(a, b) {
    <br>    return a + b;
    <br>};</code></p>

    <p>3. Arrow Function (mais moderna):
    <br><code>const soma = (a, b) => a + b;</code></p>

    <p>Funções podem receber parâmetros e retornar valores:
    <br><code>function saudacao(nome) {
    <br>    return "Olá, " + nome;
    <br>}</code></p>

    <p>Também podemos ter parâmetros padrão:
    <br><code>function saudacao(nome = "visitante") {
    <br>    return "Olá, " + nome;
    <br>}</code></p>

    <p>Leia com atenção os exemplos acima e, quando estiver pronto, clique em "Começar Quiz" para testar seus conhecimentos!</p>
`;

// Questões do Quiz
const questions = [
    {
        question: "Qual é a principal diferença entre uma função declarativa e uma arrow function?",
        options: [
            "Não há diferença, são apenas sintaxes diferentes",
            "Arrow functions não podem receber parâmetros",
            "Arrow functions têm escopo léxico do 'this'",
            "Funções declarativas não podem retornar valores"
        ],
        correct: 2
    },
    {
        question: "Como declarar uma função que recebe um parâmetro padrão?",
        options: [
            "function minhaFuncao(param = default) {}",
            "function minhaFuncao(param: default) {}",
            "function minhaFuncao(param || default) {}",
            "function minhaFuncao(param default) {}"
        ],
        correct: 0
    },
    {
        question: "Qual é a forma correta de escrever uma arrow function que retorna a soma de dois números?",
        options: [
            "const soma => (a, b) { return a + b }",
            "const soma = (a, b) => a + b",
            "const soma = (a, b) => { a + b }",
            "const soma => a, b => a + b"
        ],
        correct: 1
    },
    {
        question: "O que acontece se chamarmos uma função com menos argumentos do que parâmetros definidos?",
        options: [
            "A função retorna undefined",
            "A função gera um erro",
            "Os parâmetros faltantes recebem undefined",
            "Os parâmetros faltantes recebem null"
        ],
        correct: 2
    },
    {
        question: "Qual é a principal vantagem de usar funções em seu código?",
        options: [
            "Deixar o código mais lento",
            "Aumentar o tamanho do arquivo",
            "Reutilização de código",
            "Dificultar a manutenção"
        ],
        correct: 2
    },
    {
        question: "Como podemos armazenar uma função em uma variável?",
        options: [
            "var = function() {}",
            "const function = () {}",
            "const minhaFuncao = () => {}",
            "function = const () {}"
        ],
        correct: 2
    },
    {
        question: "O que é o 'return' em uma função?",
        options: [
            "Uma palavra reservada que termina a função",
            "Um comando para reiniciar a função",
            "Um valor que a função envia de volta quando é chamada",
            "Uma forma de nomear a função"
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
        option.classList.remove('selected', 'correct', 'wrong');
    });

    // Seleciona nova opção
    const options = document.querySelectorAll('.option');
    options[index].classList.add('selected');
    
    const question = questions[currentQuestion];
    
    // Marca resposta correta e incorreta
    setTimeout(() => {
        options[question.correct].classList.add('correct');
        if (index !== question.correct) {
            options[index].classList.add('wrong');
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
    }, 500);
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
        window.location.href = '../../index.html';
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