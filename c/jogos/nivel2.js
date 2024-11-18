// Questões do Quiz
const questions = [
    {
        question: "Qual é o tipo de variável mais adequado para armazenar um número inteiro em C?",
        options: [
            "float",
            "char",
            "int",
            "double"
        ],
        correct: 2,
        explanation: "int é o tipo ideal para números inteiros, pois não armazena decimais."
    },
    {
        question: "Qual declaração de variável está correta em C?",
        options: [
            "numero = 5;",
            "int 1numero = 5;",
            "float numero = 5,5;",
            "int numero = 5;"
        ],
        correct: 3,
        explanation: "A declaração correta inclui o tipo (int) e usa ponto e vírgula no final."
    },
    {
        question: "Como declarar uma variável para armazenar o caractere 'A'?",
        options: [
            "char letra = A;",
            "char letra = \"A\";",
            "char letra = 'A';",
            "string letra = 'A';"
        ],
        correct: 2,
        explanation: "Caracteres únicos em C são declarados com aspas simples."
    },
    {
        question: "Qual tipo de variável ocupa mais espaço na memória?",
        options: [
            "int",
            "float",
            "char",
            "double"
        ],
        correct: 3,
        explanation: "double ocupa 8 bytes, sendo o tipo básico que mais ocupa espaço."
    },
    {
        question: "Qual é a diferença entre float e double?",
        options: [
            "Não há diferença",
            "double tem maior precisão",
            "float é mais rápido",
            "float aceita números maiores"
        ],
        correct: 1,
        explanation: "double tem maior precisão por usar mais bytes de memória."
    },
    {
        question: "Qual nome de variável é inválido em C?",
        options: [
            "numeroTotal",
            "numero_total",
            "1numero",
            "_numero"
        ],
        correct: 2,
        explanation: "Variáveis não podem começar com números em C."
    },
    {
        question: "Qual é o valor padrão de uma variável int não inicializada em C?",
        options: [
            "0",
            "Lixo de memória",
            "null",
            "-1"
        ],
        correct: 1,
        explanation: "Variáveis locais não inicializadas contêm lixo de memória."
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Começa com a explicação
    document.getElementById('explanation').style.display = 'block';
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('result').style.display = 'none';

    // Botão para começar o quiz
    document.getElementById('startQuiz').addEventListener('click', () => {
        document.getElementById('explanation').style.display = 'none';
        document.getElementById('quiz').style.display = 'block';
        showQuestion();
    });
});

// Mostra a questão atual
function showQuestion() {
    const questionData = questions[currentQuestion];
    const container = document.getElementById('questionContainer');
    
    // Atualiza o número da questão
    document.getElementById('currentQuestion').textContent = currentQuestion + 1;
    
    // Cria o HTML da questão
    container.innerHTML = `
        <div class="question">
            <h3>${questionData.question}</h3>
            <div class="options">
                ${questionData.options.map((option, index) => `
                    <div class="option" data-index="${index}">
                        ${option}
                    </div>
                `).join('')}
            </div>
            <div class="explanation" style="display: none;">
                ${questionData.explanation}
            </div>
            <button id="nextBtn" class="btn" style="display: none; margin-top: 1rem;">
                ${currentQuestion === questions.length - 1 ? 'Ver Resultado' : 'Próxima Questão'}
            </button>
        </div>
    `;

    // Adiciona eventos aos botões de opção
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.addEventListener('click', () => {
            if (!answered) {
                answered = true;
                checkAnswer(parseInt(option.dataset.index));
            }
        });
    });

    // Evento para próxima questão
    document.getElementById('nextBtn').addEventListener('click', nextQuestion);
}

// Verifica a resposta
function checkAnswer(selectedIndex) {
    const questionData = questions[currentQuestion];
    const options = document.querySelectorAll('.option');
    const explanation = document.querySelector('.explanation');
    
    options.forEach((option, index) => {
        if (index === questionData.correct) {
            option.classList.add('correct');
        } else if (index === selectedIndex) {
            option.classList.add('wrong');
        }
        option.style.pointerEvents = 'none';
    });

    if (selectedIndex === questionData.correct) {
        score++;
    }

    explanation.style.display = 'block';
    document.getElementById('nextBtn').style.display = 'block';
}

// Próxima questão ou resultado
function nextQuestion() {
    answered = false;
    
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        showResult();
    }
}

// Mostra o resultado final
function showResult() {
    const percentage = (score / questions.length) * 100;
    const resultDiv = document.getElementById('result');
    
    document.getElementById('quiz').style.display = 'none';
    resultDiv.style.display = 'block';
    
    resultDiv.innerHTML = `
        <div class="result-container">
            <h2>Resultado do Quiz</h2>
            <div class="score">
                ${score} de ${questions.length} questões corretas (${percentage.toFixed(1)}%)
            </div>
            <div class="feedback ${percentage >= 50 ? 'good' : 'bad'}">
                ${percentage >= 50 ? 
                    `Parabéns! Você demonstrou um bom entendimento sobre variáveis e tipos em C!` : 
                    `Recomendamos revisar o conteúdo e tentar novamente.
                     <button onclick="location.reload()" class="btn">
                        Tentar Novamente
                     </button>`
                }
            </div>
            <button onclick="window.location.href='../index.html'" class="btn">
                Voltar ao Menu
            </button>
        </div>
    `;
}

// Theme Toggle
document.getElementById('themeToggle').addEventListener('click', () => {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    
    const themeIcon = document.querySelector('.theme-toggle i');
    themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
});

// Inicialização do tema
document.addEventListener('DOMContentLoaded', () => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    const themeIcon = document.querySelector('.theme-toggle i');
    themeIcon.className = prefersDark ? 'fas fa-moon' : 'fas fa-sun';
});