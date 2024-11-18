document.addEventListener('DOMContentLoaded', () => {
    const levels = [
        {
            id: 1,
            title: "Criando Objetos",
            instruction: `<h3>Objetos em Java</h3>
                <p>Em Java, objetos são instâncias de classes que contêm atributos e métodos.</p>
                <ul>
                    <li>Use <code>new</code> para criar objetos</li>
                    <li>Atributos armazenam dados</li>
                    <li>Métodos definem comportamentos</li>
                </ul>
                <div class="challenge">
                    <h4>Desafio:</h4>
                    <p>Crie uma classe Pessoa com nome e idade, e um método apresentar() que mostra "Olá, me chamo [nome] e tenho [idade] anos".</p>
                </div>`,
            hints: [
                "1. Declare os atributos nome e idade",
                "2. Crie um construtor para inicializar os atributos",
                "3. Crie o método apresentar()",
                "4. Resposta:\nclass Pessoa {\n    String nome;\n    int idade;\n    Pessoa(String n, int i) {\n        nome = n;\n        idade = i;\n    }\n    void apresentar() {\n        System.out.println(\"Olá, me chamo \" + nome + \" e tenho \" + idade + \" anos\");\n    }\n}"
            ],
            solution: `class Pessoa {
    String nome;
    int idade;
    
    Pessoa(String n, int i) {
        nome = n;
        idade = i;
    }
    
    void apresentar() {
        System.out.println("Olá, me chamo " + nome + " e tenho " + idade + " anos");
    }
}

public class Main {
    public static void main(String[] args) {
        Pessoa p = new Pessoa("João", 20);
        p.apresentar();
    }
}`
        },
        {
            id: 2,
            title: "Getters e Setters",
            instruction: `<h3>Encapsulamento em Java</h3>
                <p>Getters e Setters são métodos para acessar e modificar atributos privados.</p>
                <div class="challenge">
                    <h4>Desafio:</h4>
                    <p>Crie uma classe Conta com saldo privado e métodos getSaldo() e depositar(valor).</p>
                </div>`,
            hints: [
                "1. Use private para o atributo saldo",
                "2. Crie o método getSaldo()",
                "3. Crie o método depositar()",
                "4. Resposta:\nclass Conta {\n    private double saldo;\n    public double getSaldo() {\n        return saldo;\n    }\n    public void depositar(double valor) {\n        saldo += valor;\n    }\n}"
            ],
            solution: `class Conta {
    private double saldo;
    
    public double getSaldo() {
        return saldo;
    }
    
    public void depositar(double valor) {
        saldo += valor;
    }
}

public class Main {
    public static void main(String[] args) {
        Conta c = new Conta();
        c.depositar(100);
        System.out.println("Saldo: " + c.getSaldo());
    }
}`
        },
        {
            id: 3,
            title: "Métodos Estáticos",
            instruction: `<h3>Métodos Estáticos em Java</h3>
                <p>Métodos estáticos pertencem à classe e não aos objetos.</p>
                <div class="challenge">
                    <h4>Desafio:</h4>
                    <p>Crie uma classe Calculadora com um método estático somar(a, b) que retorna a soma de dois números.</p>
                </div>`,
            hints: [
                "1. Use static na declaração do método",
                "2. O método deve receber dois parâmetros",
                "3. Retorne a soma dos parâmetros",
                "4. Resposta:\nclass Calculadora {\n    public static int somar(int a, int b) {\n        return a + b;\n    }\n}"
            ],
            solution: `class Calculadora {
    public static int somar(int a, int b) {
        return a + b;
    }
}

public class Main {
    public static void main(String[] args) {
        int resultado = Calculadora.somar(5, 3);
        System.out.println("5 + 3 = " + resultado);
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

    // Executar código
    runBtn.addEventListener('click', () => {
        const userCode = editor.getValue();
        const currentLevel = levels[gameState.currentLevel];
        
        try {
            let isCorrect = false;
            
            // Verificações específicas para cada nível
            if (gameState.currentLevel === 0) {
                if (userCode.includes('class Pessoa') && 
                    userCode.includes('String nome') && 
                    userCode.includes('int idade') &&
                    userCode.includes('apresentar')) {
                    outputText.textContent = 'Olá, me chamo João e tenho 20 anos';
                    isCorrect = true;
                }
            } else if (gameState.currentLevel === 1) {
                if (userCode.includes('private double saldo') && 
                    userCode.includes('getSaldo') && 
                    userCode.includes('depositar')) {
                    outputText.textContent = 'Saldo: 100.0';
                    isCorrect = true;
                }
            } else if (gameState.currentLevel === 2) {
                if (userCode.includes('static') && 
                    userCode.includes('somar') && 
                    userCode.includes('return a + b')) {
                    outputText.textContent = '5 + 3 = 8';
                    isCorrect = true;
                }
            }

            if (isCorrect) {
                outputText.textContent += '\n\nParabéns! Você completou o desafio!';
                if (gameState.currentLevel === levels.length - 1) {
                    menuBtn.classList.remove('hidden');
                } else {
                    nextBtn.classList.remove('hidden');
                }
            } else {
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