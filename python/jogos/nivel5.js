// Configuração das perguntas do quiz
const questions = [
    {
        question: "Como acessar o primeiro elemento de uma lista em Python?",
        options: [
            "lista(0)",
            "lista[1]",
            "lista[0]",
            "lista.primeiro()"
        ],
        correct: 2,
        explanation: "Em Python, usamos lista[0] para acessar o primeiro elemento. A indexação começa em 0."
    },
    {
        question: "Qual método é usado para adicionar um elemento ao final de uma lista?",
        options: [
            "lista.add(item)",
            "lista.append(item)",
            "lista.insert(item)",
            "lista.push(item)"
        ],
        correct: 1,
        explanation: "append() é o método usado para adicionar elementos ao final de uma lista. Exemplo: frutas.append('uva')"
    },
    {
        question: "Como obter uma sublista com os elementos do índice 1 ao 3?",
        options: [
            "lista[1-3]",
            "lista[1:3]",
            "lista(1,3)",
            "lista.slice(1,3)"
        ],
        correct: 1,
        explanation: "Usamos lista[1:3] para slice. Isso retorna elementos do índice 1 até o 2 (3 não é incluído)"
    },
    {
        question: "Qual é a forma correta de criar um dicionário em Python?",
        options: [
            "{chave = valor}",
            "{chave: valor}",
            "[chave: valor]",
            "dict(chave = valor)"
        ],
        correct: 1,
        explanation: "Dicionários são criados usando chaves {} e dois pontos entre chave e valor: {'nome': 'Ana'}"
    },
    {
        question: "Como acessar um valor em um dicionário de forma segura (sem erro se a chave não existir)?",
        options: [
            "dict[chave]",
            "dict.value(chave)",
            "dict.get(chave)",
            "dict.access(chave)"
        ],
        correct: 2,
        explanation: "O método get() é seguro pois retorna None se a chave não existir: pessoa.get('idade')"
    },
    {
        question: "Qual a principal diferença entre listas e dicionários?",
        options: [
            "Listas são mais rápidas",
            "Dicionários só aceitam strings",
            "Listas usam índices numéricos, dicionários usam chaves",
            "Dicionários não podem ser modificados"
        ],
        correct: 2,
        explanation: "Listas são acessadas por índices numéricos (0, 1, 2...), dicionários por chaves definidas pelo usuário"
    },
    {
        question: "Como verificar se uma chave existe em um dicionário?",
        options: [
            "chave in dict",
            "dict.contains(chave)",
            "dict.has(chave)",
            "dict.exists(chave)"
        ],
        correct: 0,
        explanation: "Use o operador 'in': if 'nome' in pessoa: # verifica se 'nome' existe no dicionário"
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
        feedbackElement.textContent = 'Que tal revisar o conteúdo e tentar novamente? Listas e dicionários são estruturas fundamentais em Python!';
        document.getElementById('menuBtn').style.display = 'none';
    } else {
        feedbackElement.textContent = 'Excelente! Você demonstrou um bom entendimento das estruturas de dados em Python!';
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