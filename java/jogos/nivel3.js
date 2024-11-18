document.addEventListener('DOMContentLoaded', () => {
    const levels = [
        {
            id: 1,
            title: "Herança Básica",
            instruction: `<h3>Herança em Java</h3>
                <p>Herança permite que uma classe herde características de outra classe usando <code>extends</code>.</p>
                <ul>
                    <li>A classe que herda é chamada de subclasse</li>
                    <li>A classe base é chamada de superclasse</li>
                </ul>
                <div class="challenge">
                    <h4>Desafio:</h4>
                    <p>Crie uma classe Animal com um método som() e uma classe Gato que herda de Animal e retorna "Miau!"</p>
                </div>`,
            hints: [
                "1. Crie a classe Animal com o método som()",
                "2. Use 'extends' para Gato herdar de Animal",
                "3. Use @Override no método som()",
                "4. Resposta:\nclass Animal {\n    void som() {}\n}\n\nclass Gato extends Animal {\n    void som() {\n        System.out.println(\"Miau!\");\n    }\n}"
            ],
            solution: `class Animal {
    void som() {}
}

class Gato extends Animal {
    void som() {
        System.out.println("Miau!");
    }
}

public class Main {
    public static void main(String[] args) {
        new Gato().som();
    }
}`
        },
        {
            id: 2,
            title: "Polimorfismo",
            instruction: `<h3>Polimorfismo em Java</h3>
                <p>Polimorfismo permite tratar objetos de diferentes classes de maneira uniforme.</p>
                <div class="challenge">
                    <h4>Desafio:</h4>
                    <p>Crie uma classe Animal e uma classe Gato. Use uma variável do tipo Animal para criar um Gato.</p>
                </div>`,
            hints: [
                "1. Crie a classe Animal com método som()",
                "2. Crie Gato herdando de Animal",
                "3. Use Animal como tipo da variável",
                "4. Resposta:\nAnimal animal = new Gato();\nanimal.som();"
            ],
            solution: `class Animal {
    void som() {}
}

class Gato extends Animal {
    void som() {
        System.out.println("Miau!");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal animal = new Gato();
        animal.som();
    }
}`
        },
        {
            id: 3,
            title: "Classes Abstratas",
            instruction: `<h3>Classes Abstratas em Java</h3>
                <p>Classes abstratas não podem ser instanciadas e podem ter métodos abstratos.</p>
                <div class="challenge">
                    <h4>Desafio:</h4>
                    <p>Crie uma classe abstrata Animal com método abstrato som() e uma classe Gato que implementa este método.</p>
                </div>`,
            hints: [
                "1. Use 'abstract class' para Animal",
                "2. Declare o método abstrato som()",
                "3. Implemente o método em Gato",
                "4. Resposta:\nabstract class Animal {\n    abstract void som();\n}\n\nclass Gato extends Animal {\n    void som() {\n        System.out.println(\"Miau!\");\n    }\n}"
            ],
            solution: `abstract class Animal {
    abstract void som();
}

class Gato extends Animal {
    void som() {
        System.out.println("Miau!");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal animal = new Gato();
        animal.som();
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
    function checkSolution(userCode, expectedOutput) {
        const cleanUserCode = userCode.replace(/\s+/g, '').toLowerCase();
        return cleanUserCode.includes('class') && 
               cleanUserCode.includes('animal') && 
               cleanUserCode.includes('gato') && 
               cleanUserCode.includes('som');
    }

    // Executar código
    runBtn.addEventListener('click', () => {
        const userCode = editor.getValue();
        const currentLevel = levels[gameState.currentLevel];
        
        try {
            let isCorrect = false;
            
            // Verificações específicas para cada nível
            if (gameState.currentLevel === 0) {
                if (userCode.includes('class Animal') && 
                    userCode.includes('class Gato extends Animal') && 
                    userCode.includes('som')) {
                    outputText.textContent = 'Miau!';
                    isCorrect = true;
                }
            } else if (gameState.currentLevel === 1) {
                if (userCode.includes('Animal animal = new Gato()') && 
                    userCode.includes('som')) {
                    outputText.textContent = 'Miau!';
                    isCorrect = true;
                }
            } else if (gameState.currentLevel === 2) {
                if (userCode.includes('abstract class Animal') && 
                    userCode.includes('abstract void som') && 
                    userCode.includes('class Gato extends Animal')) {
                    outputText.textContent = 'Miau!';
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