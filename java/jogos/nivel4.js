document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            question: "Qual Collection deve ser usada quando precisamos manter a ordem de inserção e permitir elementos duplicados?",
            options: [
                "HashSet",
                "ArrayList",
                "HashMap",
                "TreeSet"
            ],
            correct: 1,
            explanation: "ArrayList mantém a ordem de inserção e permite elementos duplicados."
        },
        {
            question: "Como tratar corretamente uma possível NullPointerException?",
            options: [
                "Ignorar, pois é um erro comum",
                "Usar System.exit(0)",
                "Usar try-catch e tratar a exception",
                "Adicionar throws na assinatura do método"
            ],
            correct: 2,
            explanation: "O bloco try-catch é a forma correta de tratar exceptions em tempo de execução."
        },
        {
            question: "Qual Collection usar quando precisamos garantir elementos únicos?",
            options: [
                "ArrayList",
                "LinkedList",
                "HashSet",
                "Vector"
            ],
            correct: 2,
            explanation: "HashSet não permite elementos duplicados, garantindo unicidade."
        },
        {
            question: "Qual é a forma correta de adicionar um elemento em um ArrayList?",
            options: [
                "list.push(elemento);",
                "list.insert(elemento);",
                "list.add(elemento);",
                "list.put(elemento);"
            ],
            correct: 2,
            explanation: "O método add() é usado para adicionar elementos em um ArrayList."
        },
        {
            question: "Qual exception é lançada ao tentar converter uma String inválida para número?",
            options: [
                "ParseException",
                "ConversionException",
                "NumberFormatException",
                "IllegalArgumentException"
            ],
            correct: 2,
            explanation: "NumberFormatException é lançada quando há erro na conversão de String para número."
        },
        {
            question: "Como adicionar um par chave-valor em um HashMap?",
            options: [
                "map.add(chave, valor);",
                "map.put(chave, valor);",
                "map.insert(chave, valor);",
                "map.set(chave, valor);"
            ],
            correct: 1,
            explanation: "O método put() é usado para adicionar pares chave-valor em um HashMap."
        },
        {
            question: "Qual é a diferença principal entre ArrayList e LinkedList?",
            options: [
                "ArrayList permite duplicatas, LinkedList não",
                "ArrayList é mais rápido para acesso aleatório, LinkedList para inserções/remoções",
                "ArrayList é thread-safe, LinkedList não",
                "ArrayList só aceita números, LinkedList aceita qualquer tipo"
            ],
            correct: 1,
            explanation: "ArrayList é melhor para acesso aleatório, enquanto LinkedList é melhor para inserções e remoções frequentes."
        }
    ];

    let currentQuestion = 0;
    let score = 0;
    let answeredQuestions = new Set();

    const introSection = document.querySelector('.intro-section');
    const quizSection = document.querySelector('.quiz-section');
    const questionContainer = document.querySelector('.question-container');
    const resultContainer = document.querySelector('.result-container');
    const startQuizButton = document.querySelector('.start-quiz');

    // Iniciar Quiz
    startQuizButton.addEventListener('click', () => {
        introSection.classList.add('hidden');
        quizSection.classList.remove('hidden');
        showQuestion();
    });

    function showQuestion() {
        if (currentQuestion >= questions.length) {
            showResults();
            return;
        }

        const question = questions[currentQuestion];
        questionContainer.innerHTML = `
            <div class="question">
                <h3>Questão ${currentQuestion + 1} de ${questions.length}</h3>
                <p>${question.question}</p>
                <div class="options">
                    ${question.options.map((option, index) => `
                        <button class="option" data-index="${index}">
                            ${option}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        // Adicionar event listeners para as opções
        const options = document.querySelectorAll('.option');
        options.forEach(option => {
            option.addEventListener('click', () => checkAnswer(option));
        });
    }

    function checkAnswer(selectedOption) {
        if (answeredQuestions.has(currentQuestion)) return;

        const question = questions[currentQuestion];
        const selectedIndex = parseInt(selectedOption.dataset.index);
        const options = document.querySelectorAll('.option');

        answeredQuestions.add(currentQuestion);

        // Mostrar resposta correta e incorreta
        options[question.correct].classList.add('correct');
        if (selectedIndex !== question.correct) {
            selectedOption.classList.add('wrong');
        } else {
            score++;
        }

        // Mostrar explicação e aguardar antes de passar para próxima questão
        const explanation = document.createElement('p');
        explanation.className = 'explanation';
        explanation.textContent = question.explanation;
        questionContainer.querySelector('.question').appendChild(explanation);

        setTimeout(() => {
            currentQuestion++;
            showQuestion();
        }, 2000);
    }

    function showResults() {
        const percentage = (score / questions.length) * 100;
        const message = percentage >= 50 
            ? "Parabéns! Você está pronto para avançar para a próxima fase!"
            : "Que tal revisar o conteúdo sobre Collections e Exceptions e tentar novamente?";

        questionContainer.classList.add('hidden');
        resultContainer.classList.remove('hidden');
        resultContainer.innerHTML = `
            <h3>Resultado Final</h3>
            <p>Você acertou ${score} de ${questions.length} questões (${percentage.toFixed(1)}%)</p>
            <p>${message}</p>
            <div class="result-actions">
                ${percentage >= 50 
                    ? '<button onclick="window.location.href=\'../index.html\'">Voltar ao Menu</button>'
                    : '<button onclick="window.location.reload()">Tentar Novamente</button>'}
            </div>
        `;
    }

    // Tema
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('i');

    function updateThemeIcon(theme) {
        themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }

    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    }

    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    themeToggle.addEventListener('click', toggleTheme);
});