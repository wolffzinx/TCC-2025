// Configuração dos desafios
const challenges = [
    {
        title: "Console.log em JavaScript",
        explanation: `Em JavaScript, usamos o comando console.log() para exibir mensagens no console.

        Por exemplo, se quisermos exibir um texto simples:
        console.log("Exemplo de mensagem");

        Ou se quisermos exibir um número:
        console.log(42);

        Você também pode exibir múltiplos valores:
        console.log("Número:", 42);`,
        
        task: "Crie um comando que exiba a mensagem 'Meu primeiro código JavaScript!' no console.",
        
        tips: [
            "Lembre-se de usar console.log()",
            "O texto deve estar entre aspas",
            "console.log('Meu primeiro código JavaScript!');"
        ],
        
        verify: (code, output) => {
            return output.trim() === "Meu primeiro código JavaScript!";
        }
    },
    {
        title: "Variáveis e Operações",
        explanation: `Em JavaScript, podemos criar variáveis usando let ou const.
        
        Por exemplo, para criar uma variável numérica:
        let idade = 25;
        
        Para realizar operações matemáticas:
        let soma = 10 + 5;
        let multiplicacao = 4 * 3;
        
        E podemos exibir o resultado:
        console.log(soma);        // Mostra: 15
        console.log(multiplicacao); // Mostra: 12`,
        
        task: "Crie duas variáveis numéricas (x e y) com os valores 20 e 10, faça a multiplicação entre elas e mostre o resultado no console.",
        
        tips: [
            "Declare as variáveis usando let x = 20 e let y = 10",
            "Use o operador * para multiplicação",
            "let x = 20;\nlet y = 10;\nconsole.log(x * y);"
        ],
        
        verify: (code, output) => {
            return output.trim() === "200" && 
                   code.includes('x') && 
                   code.includes('y') && 
                   code.includes('*');
        }
    },
    {
        title: "Strings e Concatenação",
        explanation: `Em JavaScript, podemos juntar (concatenar) strings de diferentes formas.
        
        Usando o operador +:
        let nome = "João";
        let sobrenome = "Silva";
        console.log(nome + " " + sobrenome);
        
        Ou usando template strings (mais moderno):
        console.log(\`\${nome} \${sobrenome}\`);
        
        Ambos mostrarão: João Silva`,
        
        task: "Crie duas variáveis, nome e linguagem, e use-as para exibir a mensagem 'Olá Maria! Você está programando em JavaScript.' no console.",
        
        tips: [
            "Crie as variáveis nome e linguagem com os valores corretos",
            "Use concatenação com + ou template string com `${}`",
            "let nome = 'Maria';\nlet linguagem = 'JavaScript';\nconsole.log(`Olá ${nome}! Você está programando em ${linguagem}.`);"
        ],
        
        verify: (code, output) => {
            return output.trim() === "Olá Maria! Você está programando em JavaScript." &&
                   code.includes('nome') &&
                   code.includes('linguagem');
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

// Funções do Console
function appendToConsole(content, type = '') {
    const consoleOutput = document.getElementById('consoleOutput');
    const line = document.createElement('div');
    line.textContent = content;
    if (type) line.classList.add(type);
    consoleOutput.appendChild(line);
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

function clearConsole() {
    document.getElementById('consoleOutput').innerHTML = '';
}

// Sistema de Dicas
function showNextTip() {
    if (currentTip >= 3) return;

    const tipContainer = document.querySelector('.tip-container');
    const challenge = challenges[currentChallenge];
    
    const tipElement = document.createElement('div');
    tipElement.className = 'tip';
    tipElement.textContent = challenge.tips[currentTip];
    tipContainer.appendChild(tipElement);
    
    currentTip++;
    
    document.querySelector('.tip-counter').textContent = `${currentTip}/3`;
    
    if (currentTip === 3) {
        document.getElementById('tipBtn').style.display = 'none';
    }
}

// Carregar Desafio
function loadChallenge(index) {
    const challenge = challenges[index];
    
    // Atualiza título e conteúdo
    document.querySelector('.challenge-content h2').textContent = challenge.title;
    document.querySelector('.explanation-text').textContent = challenge.explanation;
    document.querySelector('.task-text').textContent = challenge.task;
    
    // Reseta as dicas
    document.querySelector('.tip-container').innerHTML = '';
    document.getElementById('tipBtn').style.display = 'flex';
    
    // Reseta o editor
    document.getElementById('codeEditor').value = '';
    
    // Limpa o console
    clearConsole();
    
    // Esconde botões de navegação
    document.getElementById('nextBtn').style.display = 'none';
    document.getElementById('menuBtn').style.display = 'none';
    
    // Reseta contadores
    currentChallenge = index;
    currentTip = 0;
    document.querySelector('.tip-counter').textContent = '1/3';
}

// Executar Código
function runCode() {
    const code = document.getElementById('codeEditor').value;
    clearConsole();

    try {
        // Captura a saída do console.log
        const originalLog = console.log;
        let output = '';
        console.log = (...args) => {
            output = args.join(' ');
            originalLog.apply(console, args);
        };

        // Executa o código
        eval(code);

        // Restaura o console.log original
        console.log = originalLog;

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

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    loadChallenge(0);

    // Botão de Dica
    document.getElementById('tipBtn').addEventListener('click', showNextTip);

    // Botão Próximo Nível
    document.getElementById('nextBtn').addEventListener('click', () => {
        loadChallenge(currentChallenge + 1);
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