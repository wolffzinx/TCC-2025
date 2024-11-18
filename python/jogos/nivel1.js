// Configuração dos desafios
const challenges = [
    {
        title: "Seu primeiro programa Python",
        explanation: `Em Python, podemos exibir texto na tela usando a função print().

        A função print() é uma das funções mais básicas e úteis em Python. Ela exibe o conteúdo entre parênteses na tela.

        Por exemplo:
        print("Olá!") -> Exibe: Olá!

        Para textos (strings), usamos aspas duplas "" ou simples ''.
        
        Importante: Python é sensível a maiúsculas e minúsculas, então Print() é diferente de print()`,
        
        task: "Crie seu primeiro programa Python! Use a função print() para exibir a mensagem 'Hello, World!' na tela.",
        
        tips: [
            "Use a função print() para exibir texto",
            "O texto deve estar entre aspas (simples ou duplas)",
            "print('Hello, World!') ou print(\"Hello, World!\")"
        ],
        
        verify: (code, output) => {
            return output.trim() === 'Hello, World!';
        }
    },
    {
        title: "Operações Matemáticas",
        explanation: `Python pode ser usado como uma calculadora! 
        
        Operadores básicos:
        + para adição
        - para subtração
        * para multiplicação
        / para divisão
        
        Por exemplo:
        print(5 + 3)  -> Exibe: 8
        print(10 - 4) -> Exibe: 6
        print(2 * 3)  -> Exibe: 6
        print(8 / 2)  -> Exibe: 4.0`,
        
        task: "Use print() para calcular e exibir o resultado de 15 + 7.",
        
        tips: [
            "Coloque a operação matemática dentro do print()",
            "Não precisa usar aspas para números",
            "print(15 + 7)"
        ],
        
        verify: (code, output) => {
            return output.trim() === '22';
        }
    },
    {
        title: "Concatenação de Strings",
        explanation: `Em Python, podemos juntar (concatenar) textos usando o operador +.
        
        Por exemplo:
        print("Olá " + "Mundo")  -> Exibe: Olá Mundo
        
        Observe o espaço após "Olá ", ele é importante para separar as palavras!
        
        Também podemos usar vírgulas para separar itens no print:
        print("Olá", "Mundo")    -> Exibe: Olá Mundo`,
        
        task: "Use print() e concatenação para exibir 'Python é incrível!'",
        
        tips: [
            "Você pode usar + para juntar as strings",
            "Lembre-se dos espaços entre as palavras",
            "print('Python ' + 'é ' + 'incrível!')"
        ],
        
        verify: (code, output) => {
            return output.trim() === 'Python é incrível!';
        }
    }
];

let currentChallenge = 0;
let currentTip = 0;

// Theme Toggle
document.getElementById('themeToggle').addEventListener('click', () => {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
    const themeIcon = document.querySelector('.theme-toggle i');
    themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
});

// Carrega o desafio atual
function loadChallenge(index) {
    const challenge = challenges[index];
    
    // Reset do estado
    currentTip = 0;
    document.querySelector('.tip-content').style.display = 'none';
    document.querySelector('.tip-counter').textContent = '1/3';
    document.getElementById('nextBtn').style.display = 'none';
    document.getElementById('menuBtn').style.display = 'none';
    
    // Atualiza o conteúdo
    document.querySelector('.explanation-text').innerHTML = challenge.explanation;
    document.querySelector('.task-text').textContent = challenge.task;
    document.getElementById('codeEditor').value = '';
    document.getElementById('consoleOutput').innerHTML = '';
}

// Mostra a próxima dica
function showNextTip() {
    const challenge = challenges[currentChallenge];
    const tipContent = document.querySelector('.tip-content');
    
    if (currentTip < challenge.tips.length) {
        tipContent.textContent = challenge.tips[currentTip];
        tipContent.style.display = 'block';
        currentTip++;
        document.querySelector('.tip-counter').textContent = `${currentTip}/3`;
    }
}

// Executa o código
function runCode() {
    const code = document.getElementById('codeEditor').value;
    let output = '';
    
    // Simula a função print do Python
    const print = (...args) => {
        output += args.join(' ') + '\n';
    };
    
    try {
        // Salva o console.log original
        const originalLog = console.log;
        console.log = (...args) => {
            output += args.join(' ') + '\n';
        };

        // Executa o código
        eval(code);

        // Restaura o console.log original
        console.log = originalLog;

        // Remove a última quebra de linha
        output = output.trim();

        // Verifica se o código está correto
        const challenge = challenges[currentChallenge];
        if (challenge.verify(code, output)) {
            appendToConsole('✅ Correto! Parabéns!', 'success');
            
            // Mostra o botão apropriado
            if (currentChallenge < challenges.length - 1) {
                document.getElementById('nextBtn').style.display = 'flex';
            } else {
                document.getElementById('menuBtn').style.display = 'flex';
            }
        } else {
            appendToConsole('❌ Algo não está correto. Tente novamente!', 'error');
        }

        // Exibe a saída do código
        if (output) {
            appendToConsole('📤 Saída: ' + output);
        }

    } catch (error) {
        appendToConsole('❌ Erro: ' + error.message, 'error');
    }
}

// Adiciona texto ao console
function appendToConsole(text, className = '') {
    const consoleOutput = document.getElementById('consoleOutput');
    const line = document.createElement('div');
    line.textContent = text;
    if (className) line.className = className;
    consoleOutput.appendChild(line);
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

// Limpa o console
function clearConsole() {
    document.getElementById('consoleOutput').innerHTML = '';
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    loadChallenge(0);

    // Botão de Dica
    document.getElementById('tipBtn').addEventListener('click', showNextTip);

    // Botão Próximo Nível
    document.getElementById('nextBtn').addEventListener('click', () => {
        currentChallenge++;
        loadChallenge(currentChallenge);
    });

    // Botão Menu
    document.getElementById('menuBtn').addEventListener('click', () => {
        window.location.href = '../index.html';
    });

    // Atalho de teclado para executar (Ctrl + Enter)
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            runCode();
        }
    });
});