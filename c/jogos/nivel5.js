const questions = [
    {
        question: "Como declarar corretamente um array de 5 inteiros em C?",
        options: [
            "array int[5];",
            "int array(5);",
            "int[5] array;",
            "int array[5];"
        ],
        correct: 3,
        explanation: "Em C, arrays são declarados especificando o tipo, seguido do nome e o tamanho entre colchetes."
    },
    {
        question: "Qual é a forma correta de declarar um ponteiro para inteiro em C?",
        options: [
            "int ptr*;",
            "int *ptr;",
            "pointer int ptr;",
            "int& ptr;"
        ],
        correct: 1,
        explanation: "Ponteiros são declarados usando o asterisco (*) antes do nome da variável ou após o tipo."
    },
    {
        question: "Como acessar o terceiro elemento de um array em C?",
        options: [
            "array[3];",
            "array[2];",
            "array(3);",
            "array.3;"
        ],
        correct: 1,
        explanation: "Arrays em C são baseados em zero, então o terceiro elemento tem índice 2."
    },
    {
        question: "O que o operador & faz em C?",
        options: [
            "Concatena strings",
            "Retorna o endereço de memória",
            "Compara dois valores",
            "Cria um novo ponteiro"
        ],
        correct: 1,
        explanation: "O operador & (e comercial) retorna o endereço de memória de uma variável."
    },
    {
        question: "Como acessar o valor apontado por um ponteiro?",
        options: [
            "ptr.value",
            "value(ptr)",
            "*ptr",
            "&ptr"
        ],
        correct: 2,
        explanation: "O operador * (asterisco) é usado para derreferenciar um ponteiro e acessar o valor apontado."
    },
    {
        question: "O que acontece quando incrementamos um ponteiro para int?",
        options: [
            "O endereço aumenta em 1 byte",
            "O endereço aumenta em 4 bytes",
            "O valor apontado aumenta em 1",
            "Gera um erro de compilação"
        ],
        correct: 1,
        explanation: "Ao incrementar um ponteiro, o endereço aumenta pelo tamanho do tipo (geralmente 4 bytes para int)."
    },
    {
        question: "Qual é a relação entre arrays e ponteiros em C?",
        options: [
            "Não há relação entre eles",
            "São estruturas completamente diferentes",
            "O nome do array é um ponteiro para seu primeiro elemento",
            "Arrays são mais rápidos que ponteiros"
        ],
        correct: 2,
        explanation: "Em C, o nome do array decai para um ponteiro que aponta para seu primeiro elemento."
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
                    `Parabéns! Você demonstrou um bom entendimento sobre Arrays e Ponteiros em C!` : 
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