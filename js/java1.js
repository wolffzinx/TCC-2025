document.addEventListener('DOMContentLoaded', () => {  
    const questions = [  
        {  
            question: "Qual a forma correta de declarar uma função (método) em Java?",  
            options: ["public void minhaFuncao()", "void minhaFuncao()", "function minhaFuncao()"],  
            answer: 0  
        },  
        {  
            question: "Qual das opções a seguir é a maneira correta de verificar se uma variável x é maior que 10 em Java?",  
            options: ["if (x > 10)", "if x > 10", "if (x > 10) then"],  
            answer: 0  
        },  
        {  
            question: "Qual dos métodos abaixo usamos para receber algum dado do usuário através do CLI?",  
            options: ["System.in()", "Scanner.nextLine()", "input()"],  
            answer: 1  
        },  
        {  
            question: "Qual é o melhor atalho para incrementar a variável a=0 em Java?",  
            options: ["java.util.*", "java.io.*", "java.lang.*"],  
            answer: 0  
        },  
        {  
            question: "Qual das opções a seguir é a maneira correta de verificar se uma variável x é maior que 10 em Python?",  
            options: ["if (x > 10) {}", "a += 1;", "a++;"],  
            answer: 2  
        }  
    ];  

    let currentQuestionIndex = 0;  
    let score = 0;  

    const questionText = document.getElementById('question-text');  
    const optionsContainer = document.getElementById('options');  
    const verifyButton = document.getElementById('verify');  
    const resultText = document.getElementById('result');  
    const scoreContainer = document.getElementById('score-container');  
    const scoreText = document.getElementById('score-text');  
    const retryButton = document.getElementById('retry');  
    const progressBar = document.getElementById('progress-bar');  

    function loadQuestion() {  
        if (currentQuestionIndex < questions.length) {  
            const currentQuestion = questions[currentQuestionIndex];  
            questionText.textContent = currentQuestion.question;  
            optionsContainer.innerHTML = '';  
            currentQuestion.options.forEach((option, index) => {  
                const button = document.createElement('button');  
                button.classList.add('btn', 'btn-outline-light', 'option');  
                button.textContent = option;  
                button.setAttribute('data-value', index);  
                optionsContainer.appendChild(button);  

                button.addEventListener('click', () => {  
                    optionsContainer.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected-pink'));  
                    button.classList.add('selected-pink');  
                });  
            });  
            resultText.textContent = '';  
            updateProgressBar();  
        } else {  
            displayScore();  
        }  
    }  

    function updateProgressBar() {  
        const percentage = ((currentQuestionIndex + 1) / questions.length) * 100;  
        progressBar.style.width = percentage + '%';  
    }  

    loadQuestion();  

    verifyButton.addEventListener('click', () => {  
        const selectedOption = optionsContainer.querySelector('.selected-pink');  
        if (!selectedOption) {  
            resultText.textContent = 'Por favor, selecione uma opção!';  
            return;  
        }  

        const value = selectedOption.getAttribute('data-value');  
        handleAnswer(parseInt(value) === questions[currentQuestionIndex].answer);  
    });  

    function handleAnswer(isCorrect) {  
        if (isCorrect) {  
            score++;  
            resultText.textContent = 'Correto!';  
            resultText.classList.remove('text-danger');  
            resultText.classList.add('text-success');  
        } else {  
            resultText.textContent = 'Incorreto! Você errou esta pergunta.';  
            resultText.classList.remove('text-success');  
            resultText.classList.add('text-danger');  
        }  
        
        setTimeout(() => {  
            currentQuestionIndex++;  
            loadQuestion();  
        }, 1000);  
    }  

    function displayScore() {  
        questionText.textContent = "Quiz Finalizado!";  
        optionsContainer.innerHTML = '';  
        verifyButton.style.display = 'none';  

        const percentage = (score / questions.length) * 100;  
        scoreText.textContent = `Você acertou ${score} de ${questions.length} (${percentage.toFixed(2)}%)`;  
        
        scoreContainer.style.display = 'block';  

        if (percentage > 60) {  
            scoreText.innerHTML += "<br>Parabéns! Você pode voltar ao menu.";  
        } else {  
            scoreText.innerHTML += "<br>Tente novamente!";  
        }  
    }  

    retryButton.addEventListener('click', () => {  
        currentQuestionIndex = 0;  
        score = 0;  
        scoreContainer.style.display = 'none';  
        verifyButton.style.display = 'block';  
        loadQuestion();  
    });  
});
