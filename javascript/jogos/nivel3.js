// Configuração dos desafios
const challenges = [
    {
        title: "If/Else em JavaScript",
        explanation: `Em JavaScript, usamos estruturas condicionais para tomar decisões no código.

        A estrutura if/else permite executar diferentes blocos de código baseado em condições:

        if (condição) {
            // código se verdadeiro
        } else {
            // código se falso
        }

        Por exemplo:
        let idade = 18;
        if (idade >= 18) {
            console.log("Maior de idade");
        } else {
            console.log("Menor de idade");
        }`,
        
        task: "Crie um programa que recebe uma nota (já definida como variável) e exibe 'Aprovado' se a nota for maior ou igual a 7, e 'Reprovado' caso contrário.",
        
        tips: [
            "Declare uma variável 'nota' com um valor",
            "Use if (nota >= 7) para verificar a aprovação",
            "let nota = 8;\nif (nota >= 7) {\n    console.log('Aprovado');\n} else {\n    console.log('Reprovado');\n}"
        ],
        
        verify: (code, output) => {
            return (code.includes('if') && code.includes('else') && 
                   (output === 'Aprovado' || output === 'Reprovado'));
        }
    },
    {
        title: "Switch Case",
        explanation: `O switch é útil quando precisamos comparar uma variável com vários valores diferentes.

        switch (variável) {
            case valor1:
                // código
                break;
            case valor2:
                // código
                break;
            default:
                // código padrão
        }

        Por exemplo:
        let dia = 1;
        switch (dia) {
            case 1: console.log("Domingo"); break;
            case 2: console.log("Segunda"); break;
            default: console.log("Outro dia");
        }`,
        
        task: "Crie um programa que converte notas em conceitos: 10 = 'A', 9 = 'B', 8 = 'C', 7 = 'D', menor que 7 = 'F'.",
        
        tips: [
            "Use switch com uma nota definida",
            "Lembre-se do break após cada case",
            "let nota = 9;\nswitch (nota) {\n    case 10: console.log('A'); break;\n    case 9: console.log('B'); break;\n    case 8: console.log('C'); break;\n    case 7: console.log('D'); break;\n    default: console.log('F');\n}"
        ],
        
        verify: (code, output) => {
            return code.includes('switch') && 
                   code.includes('case') && 
                   ['A', 'B', 'C', 'D', 'F'].includes(output.trim());
        }
    },
    {
        title: "Loop For",
        explanation: `O loop for é usado para repetir um bloco de código um número específico de vezes.

        Estrutura básica:
        for (inicialização; condição; incremento) {
            // código a ser repetido
        }

        Por exemplo:
        for (let i = 0; i < 5; i++) {
            console.log(i); // Mostra: 0, 1, 2, 3, 4
        }`,
        
        task: "Crie um programa que use um loop for para mostrar a tabuada do 5 (5 x 1 até 5 x 10).",
        
        tips: [
            "Use for com i começando em 1 até 10",
            "Multiplique 5 por i em cada iteração",
            "for (let i = 1; i <= 10; i++) {\n    console.log('5 x ' + i + ' = ' + (5 * i));\n}"
        ],
        
        verify: (code, output) => {
            return code.includes('for') && 
                   output.includes('5 x') && 
                   output.includes('50');
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