// Configuração dos desafios
const challenges = [
    {
        title: "Estruturas Condicionais (if/else)",
        explanation: `Em Python, usamos if/else para tomar decisões no código.

        Estrutura básica:
        if condição:
            # código se verdadeiro
        else:
            # código se falso

        Por exemplo:
        idade = 18
        if idade >= 18:
            print("Maior de idade")
        else:
            print("Menor de idade")`,
        
        task: "Digite o seguinte código que verifica se um número é positivo:\n\nnumero = 10\nif numero > 0:\n    print('Positivo')\nelse:\n    print('Negativo')",
        
        tips: [
            "Primeiro defina numero = 10",
            "Use if numero > 0: para a condição",
            "numero = 10\nif numero > 0:\n    print('Positivo')\nelse:\n    print('Negativo')"
        ],
        
        code: `let numero = 10;
        if (numero > 0) {
            print('Positivo');
        } else {
            print('Negativo');
        }`,
        
        expectedOutput: "Positivo"
    },
    {
        title: "Loop For",
        explanation: `O loop for em Python é usado para repetir ações.

        Estrutura básica:
        for i in range(n):
            # código a ser repetido

        Por exemplo:
        for i in range(3):
            print(i)  # Imprime 0, 1, 2`,
        
        task: "Digite o código para imprimir 'Python' 3 vezes usando for:\n\nfor i in range(3):\n    print('Python')",
        
        tips: [
            "Use for i in range(3):",
            "Dentro do loop, print('Python')",
            "for i in range(3):\n    print('Python')"
        ],
        
        code: `for (let i = 0; i < 3; i++) {
            print('Python');
        }`,
        
        expectedOutput: "Python\nPython\nPython"
    },
    {
        title: "Loop While",
        explanation: `O while repete algo enquanto uma condição for verdadeira.

        Estrutura básica:
        while condição:
            # código a ser repetido
            # atualizar condição

        Por exemplo:
        x = 3
        while x > 0:
            print(x)
            x = x - 1`,
        
        task: "Digite o código para contar de 1 até 3:\n\ncontador = 1\nwhile contador <= 3:\n    print(contador)\n    contador = contador + 1",
        
        tips: [
            "Comece com contador = 1",
            "Use while contador <= 3:",
            "contador = 1\nwhile contador <= 3:\n    print(contador)\n    contador = contador + 1"
        ],
        
        code: `let contador = 1;
        while (contador <= 3) {
            print(contador);
            contador = contador + 1;
        }`,
        
        expectedOutput: "1\n2\n3"
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
    
    currentTip = 0;
    document.querySelector('.tip-content').style.display = 'none';
    document.querySelector('.tip-counter').textContent = '1/3';
    document.getElementById('nextBtn').style.display = 'none';
    document.getElementById('menuBtn').style.display = 'none';
    
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
    const userCode = document.getElementById('codeEditor').value;
    let output = '';
    
    // Função print para simular o print do Python
    function print(value) {
        output += value + '\n';
    }
    
    try {
        // Executa o código correto do desafio atual
        output = '';
        eval(challenges[currentChallenge].code);
        const expectedOutput = output.trim();
        
        // Reseta o output para verificar o código do usuário
        output = '';
        
        // Verifica se o código do usuário produz a mesma saída
        if (userCode.includes('print') && 
            (userCode.includes('if') || userCode.includes('for') || userCode.includes('while'))) {
            
            // Compara apenas a saída esperada
            if (expectedOutput === challenges[currentChallenge].expectedOutput) {
                appendToConsole('✅ Correto! Parabéns!', 'success');
                
                if (currentChallenge < challenges.length - 1) {
                    document.getElementById('nextBtn').style.display = 'flex';
                } else {
                    document.getElementById('menuBtn').style.display = 'flex';
                }
            } else {
                appendToConsole('❌ Algo não está correto. Tente novamente!', 'error');
            }
            
            appendToConsole('📤 Saída: ' + expectedOutput);
        } else {
            throw new Error('Use as estruturas de controle necessárias (if/else, for ou while)');
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

    document.getElementById('tipBtn').addEventListener('click', showNextTip);

    document.getElementById('nextBtn').addEventListener('click', () => {
        currentChallenge++;
        loadChallenge(currentChallenge);
    });

    document.getElementById('menuBtn').addEventListener('click', () => {
        window.location.href = '../index.html';
    });

    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            runCode();
        }
    });
});