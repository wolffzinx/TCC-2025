const questions = [
    {
        question: "Qual é a palavra-chave usada para declarar uma função que não retorna valor em C?",
        options: [
            "null",
            "void",
            "empty",
            "noreturn"
        ],
        correct: 1,
        explanation: "void é a palavra-chave correta para funções que não retornam valor."
    },
    {
        question: "Como declarar corretamente uma função que recebe dois números inteiros e retorna sua soma?",
        options: [
            "void soma(int x, int y) { return x + y; }",
            "int soma(int x + int y) { return xy; }",
            "int soma(int x, int y) { return x + y; }",
            "return soma(int x, int y) { x + y; }"
        ],
        correct: 2,
        explanation: "A sintaxe correta é: tipo_retorno nome_funcao(parametros) { corpo_funcao }"
    },
    {
        question: "O que acontece se uma função do tipo int não tiver uma instrução return?",
        options: [
            "O programa não compila",
            "Retorna 0 automaticamente",
            "Retorna um valor aleatório",
            "Causa comportamento indefinido"
        ],
        correct: 3,
        explanation: "Funções com tipo de retorno definido devem ter return, caso contrário, o comportamento é indefinido."
    },
    {
        question: "Qual é a forma correta de chamar uma função em C?",
        options: [
            "chamarFuncao[];",
            "chamarFuncao{};",
            "chamarFuncao();",
            "chamarFuncao;"
        ],
        correct: 2,
        explanation: "Funções são chamadas usando parênteses, mesmo quando não têm argumentos."
    },
    {
        question: "O que é um protótipo de função?",
        options: [
            "Uma função que não pode ser modificada",
            "A declaração da função sem o corpo",
            "Uma função dentro de outra função",
            "Uma função que só pode ser usada uma vez"
        ],
        correct: 1,
        explanation: "O protótipo é a declaração antecipada da função, informando seu tipo de retorno, nome e parâmetros."
    },
    {
        question: "Qual é a diferença entre parâmetros e argumentos?",
        options: [
            "São a mesma coisa",
            "Parâmetros são na declaração, argumentos são na chamada",
            "Argumentos são na declaração, parâmetros são na chamada",
            "Parâmetros são apenas para números"
        ],
        correct: 1,
        explanation: "Parâmetros são as variáveis na declaração da função, argumentos são os valores passados na chamada."
    },
    {
        question: "Como passar um array para uma função em C?",
        options: [
            "Não é possível passar arrays para funções",
            "Passando apenas o nome do array",
            "Copiando cada elemento individualmente",
            "Usando apenas o primeiro elemento"
        ],
        correct: 1,
        explanation: "Arrays são passados para funções usando apenas o nome do array, que decai para um ponteiro."
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('explanation').style.display = 'block';
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('result').style.display = 'none';

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
    
    document.getElementById('currentQuestion').textContent = currentQuestion + 1;
    
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

    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.addEventListener('click', () => {
            if (!answered) {
                answered = true;
                checkAnswer(parseInt(option.dataset.index));
            }
        });
    });

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
                    `Parabéns! Você demonstrou um bom entendimento sobre funções em C!` : 
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