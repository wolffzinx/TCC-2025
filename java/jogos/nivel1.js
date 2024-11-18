document.addEventListener('DOMContentLoaded', () => {
    // Configuração dos níveis
    const levels = [
        {
            id: 1,
            title: "Variáveis e Tipos",
            instruction: `<h3>Variáveis e Tipos de Dados</h3>
                <p>Em Java, toda variável tem um tipo específico. Os tipos mais básicos são:</p>
                <ul>
                    <li><code>int</code>: números inteiros</li>
                    <li><code>double</code>: números decimais</li>
                    <li><code>String</code>: texto</li>
                    <li><code>boolean</code>: verdadeiro ou falso</li>
                </ul>
                <div class="challenge">
                    <h4>Desafio:</h4>
                    <p>Crie uma variável do tipo int chamada "idade" e atribua o valor 25 a ela.</p>
                </div>`,
            hints: [
                "1. Lembre-se que variáveis int são para números inteiros.",
                "2. A sintaxe é: int nomeDaVariavel = valor;",
                "3. Não esqueça do ponto e vírgula no final!",
                "4. Resposta: int idade = 25; System.out.println(idade);"
            ],
            solution: `public class Main {
    public static void main(String[] args) {
        int idade = 25;
        System.out.println(idade);
    }
}`
        },
        {
            id: 2,
            title: "Operações Matemáticas",
            instruction: `<h3>Operações Matemáticas em Java</h3>
                <p>Java suporta operações matemáticas básicas:</p>
                <ul>
                    <li><code>+</code>: soma</li>
                    <li><code>-</code>: subtração</li>
                    <li><code>*</code>: multiplicação</li>
                    <li><code>/</code>: divisão</li>
                </ul>
                <div class="challenge">
                    <h4>Desafio:</h4>
                    <p>Crie duas variáveis int: num1 = 10 e num2 = 5, e mostre a soma delas.</p>
                </div>`,
            hints: [
                "1. Declare as duas variáveis primeiro: int num1 e int num2",
                "2. Use o operador + para somar os números",
                "3. Use System.out.println() para mostrar o resultado",
                "4. Resposta: int num1 = 10; int num2 = 5; System.out.println(num1 + num2);"
            ],
            solution: `public class Main {
    public static void main(String[] args) {
        int num1 = 10;
        int num2 = 5;
        System.out.println(num1 + num2);
    }
}`
        },
        {
            id: 3,
            title: "Strings em Java",
            instruction: `<h3>Trabalhando com Strings</h3>
                <p>Strings são sequências de caracteres em Java. Para criar uma String:</p>
                <ul>
                    <li>Use aspas duplas: "texto"</li>
                    <li>Declare com String (com S maiúsculo)</li>
                </ul>
                <div class="challenge">
                    <h4>Desafio:</h4>
                    <p>Crie uma String com seu nome e mostre "Olá, [seu_nome]!"</p>
                </div>`,
            hints: [
                '1. Declare uma String com seu nome usando aspas duplas',
                '2. Use o operador + para juntar "Olá, " com seu nome',
                '3. Não esqueça de adicionar "!" no final da mensagem',
                '4. Resposta: String nome = "João"; System.out.println("Olá, " + nome + "!");'
            ],
            solution: `public class Main {
    public static void main(String[] args) {
        String nome = "João";
        System.out.println("Olá, " + nome + "!");
    }
}`
        }
    ];

    // Estado do jogo
    const gameState = {
        currentLevel: 0,
        hintsShown: false
    };

    // Elementos da UI
    const editor = ace.edit("editor");
    const instructionsContent = document.querySelector('.lesson-content');
    const hintBtn = document.querySelector('.hint-btn');
    const hints = document.querySelector('.hints');
    const outputText = document.querySelector('#output-text');
    const nextBtn = document.querySelector('.next-btn');
    const menuBtn = document.querySelector('.menu-btn');
    const runBtn = document.querySelector('.run-btn');

    // Configuração inicial do editor
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/java");
    editor.setFontSize(14);

    // Função para carregar nível
    function loadLevel(levelIndex) {
        const level = levels[levelIndex];
        
        // Resetar estado
        gameState.hintsShown = false;
        hintBtn.disabled = false;
        hintBtn.textContent = 'Mostrar Dicas';
        
        // Atualizar conteúdo
        instructionsContent.innerHTML = level.instruction;
        hints.innerHTML = level.hints.map(hint => 
            `<div class="hint">${hint}</div>`
        ).join('');
        
        // Esconder todas as dicas
        document.querySelectorAll('.hint').forEach(hint => {
            hint.classList.remove('show');
        });
        
        // Resetar editor
        editor.setValue(`public class Main {
    public static void main(String[] args) {
        // Escreva seu código aqui
        
    }
}`);
        editor.clearSelection();

        // Atualizar botões
        nextBtn.classList.add('hidden');
        menuBtn.classList.add('hidden');
        outputText.textContent = '';
    }

    // Sistema de dicas
    hintBtn.addEventListener('click', () => {
        if (!gameState.hintsShown) {
            document.querySelectorAll('.hint').forEach(hint => {
                hint.classList.add('show');
            });
            gameState.hintsShown = true;
            hintBtn.textContent = 'Dicas mostradas';
            hintBtn.disabled = true;
        }
    });

    // Verificar solução
    function checkSolution(userCode, solution) {
        const cleanUserCode = userCode.replace(/\s+/g, '').toLowerCase();
        const cleanSolution = solution.replace(/\s+/g, '').toLowerCase();
        return cleanUserCode === cleanSolution;
    }

    // Executar código
    runBtn.addEventListener('click', () => {
        const userCode = editor.getValue();
        const currentLevel = levels[gameState.currentLevel];
        
        try {
            let isCorrect = checkSolution(userCode, currentLevel.solution);
            
            // Verificações específicas para cada nível
            if (gameState.currentLevel === 0) {
                if (userCode.includes('int idade = 25;')) {
                    outputText.textContent = '25';
                    if (userCode.includes('System.out.println(idade)')) {
                        isCorrect = true;
                    }
                }
            } else if (gameState.currentLevel === 1) {
                if (userCode.includes('num1 = 10') && userCode.includes('num2 = 5')) {
                    outputText.textContent = '15';
                    if (userCode.includes('System.out.println(num1 + num2)')) {
                        isCorrect = true;
                    }
                }
            } else if (gameState.currentLevel === 2) {
                if (userCode.includes('String nome') && userCode.includes('System.out.println')) {
                    outputText.textContent = 'Olá, João!';
                    if (userCode.includes('System.out.println("Olá, " + nome + "!")')) {
                        isCorrect = true;
                    }
                }
            }

            if (isCorrect) {
                outputText.textContent += '\n\nParabéns! Você completou o desafio!';
                if (gameState.currentLevel === levels.length - 1) {
                    menuBtn.classList.remove('hidden');
                } else {
                    nextBtn.classList.remove('hidden');
                }
            } else if (!outputText.textContent) {
                throw new Error('Verifique seu código e tente novamente.');
            }
        } catch (error) {
            outputText.textContent = `Erro: ${error.message}`;
        }
    });

    // Navegação
    nextBtn.addEventListener('click', () => {
        gameState.currentLevel++;
        loadLevel(gameState.currentLevel);
    });

    menuBtn.addEventListener('click', () => {
        window.location.href = '../index.html';
    });

    // Inicializar primeiro nível
    loadLevel(0);

    // Tema
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('i');

    function updateThemeIcon(theme) {
        themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        editor.setTheme(theme === 'light' ? "ace/theme/chrome" : "ace/theme/monokai");
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