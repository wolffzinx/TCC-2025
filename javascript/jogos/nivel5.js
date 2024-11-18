// Conteúdo de estudo
const studyContent = `
    <p>O DOM (Document Object Model) é a interface que permite ao JavaScript interagir com elementos HTML.</p>

    <p>Para selecionar elementos, podemos usar:
    <br><code>document.getElementById('meuId')</code> - Seleciona por ID
    <br><code>document.querySelector('.minhaClasse')</code> - Seleciona usando seletores CSS
    <br><code>document.getElementsByClassName('classe')</code> - Seleciona todos por classe</p>

    <p>Para modificar elementos:
    <br><code>elemento.innerHTML = 'Novo conteúdo'</code> - Altera o HTML interno
    <br><code>elemento.style.color = 'red'</code> - Modifica estilos
    <br><code>elemento.classList.add('novaClasse')</code> - Adiciona classes</p>

    <p>Eventos são ações que acontecem na página. Podemos "escutar" eventos assim:
    <br><code>elemento.addEventListener('click', function() {
    <br>    // código a ser executado
    <br>});</code></p>

    <p>Eventos comuns:
    <br>- click: quando clica em um elemento
    <br>- submit: quando envia um formulário
    <br>- keydown: quando pressiona uma tecla
    <br>- mouseover: quando passa o mouse sobre um elemento</p>

    <p>Leia com atenção os exemplos acima e, quando estiver pronto, clique em "Começar Quiz" para testar seus conhecimentos!</p>
`;

// Questões do Quiz
const questions = [
    {
        question: "Qual método é usado para selecionar um elemento pelo seu ID?",
        options: [
            "document.querySelector('#id')",
            "document.getElementById('id')",
            "document.findById('id')",
            "document.elementById('id')"
        ],
        correct: 1
    },
    {
        question: "Como adicionar um evento de clique a um elemento?",
        options: [
            "elemento.onClick(() => {})",
            "elemento.addClick(() => {})",
            "elemento.addEventListener('click', () => {})",
            "elemento.clickEvent(() => {})"
        ],
        correct: 2
    },
    {
        question: "Qual propriedade é usada para alterar o conteúdo HTML de um elemento?",
        options: [
            "innerText",
            "textContent",
            "innerHTML",
            "content"
        ],
        correct: 2
    },
    {
        question: "Como selecionar todos os elementos com uma determinada classe?",
        options: [
            "document.getElementByClass('classe')",
            "document.querySelector('.classe')",
            "document.getElementsByClassName('classe')",
            "document.findByClass('classe')"
        ],
        correct: 2
    },
    {
        question: "Qual evento é disparado quando um formulário é enviado?",
        options: [
            "onSubmit",
            "formSubmit",
            "submit",
            "sendForm"
        ],
        correct: 2
    },
    {
        question: "Como adicionar uma nova classe a um elemento?",
        options: [
            "elemento.class.add('novaClasse')",
            "elemento.addClass('novaClasse')",
            "elemento.classList.add('novaClasse')",
            "elemento.className.add('novaClasse')"
        ],
        correct: 2
    },
    {
        question: "Qual método é usado para remover um elemento do DOM?",
        options: [
            "elemento.delete()",
            "elemento.remove()",
            "elemento.destroy()",
            "elemento.clear()"
        ],
        correct: 1
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