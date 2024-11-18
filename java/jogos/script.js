// Configuração das fases
const phases = {
    1: {
        title: "Hello World em Java",
        description: "Vamos criar seu primeiro programa Java! O famoso 'Hello World' é tradicionalmente o primeiro programa que todo programador escreve ao aprender uma nova linguagem.",
        example: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Olá, Mundo!");
    }
}`,
        explanation: [
            "public class: Define uma classe que pode ser usada por outros programas",
            "main: O ponto de entrada principal do programa",
            "System.out.println(): Comando para imprimir texto na tela",
            "String[] args: Parâmetros que podem ser passados ao programa"
        ],
        challenge: "Crie um programa que imprima 'Olá, Mundo!' na tela.",
        hints: [
            "Comece criando uma classe chamada 'HelloWorld'",
            "Adicione o método main com os parâmetros corretos",
            "Use System.out.println() para imprimir o texto",
            "Resposta: public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println(\"Olá, Mundo!\");\n    }\n}"
        ],
        validation: (code) => {
            const cleanCode = code.replace(/\s+/g, '').toLowerCase();
            return cleanCode.includes('publicclasshelloworld') &&
                   cleanCode.includes('publicstaticvoidmain(string[]args)') &&
                   cleanCode.includes('system.out.println("olá,mundo!")');
        }
    },
    2: {
        title: "Variáveis em Java",
        description: "Vamos aprender a criar e usar variáveis em Java. Variáveis são espaços na memória que guardam valores que podemos usar depois.",
        example: `public class Variables {
    public static void main(String[] args) {
        String nome = "João";
        int idade = 25;
        System.out.println("Nome: " + nome);
        System.out.println("Idade: " + idade);
    }
}`,
        explanation: [
            "String: Tipo de variável para texto",
            "int: Tipo de variável para números inteiros",
            "=: Operador de atribuição",
            "+ : Operador de concatenação para juntar textos"
        ],
        challenge: "Crie um programa que declare uma variável nome com seu nome e idade com 20, e imprima ambos.",
        hints: [
            "Declare uma variável String para o nome",
            "Declare uma variável int para a idade",
            "Use System.out.println() para cada variável",
            "Resposta: public class Variables {\n    public static void main(String[] args) {\n        String nome = \"Seu Nome\";\n        int idade = 20;\n        System.out.println(\"Nome: \" + nome);\n        System.out.println(\"Idade: \" + idade);\n    }\n}"
        ],
        validation: (code) => {
            const cleanCode = code.replace(/\s+/g, '').toLowerCase();
            return cleanCode.includes('stringnome=') &&
                   cleanCode.includes('intidade=20') &&
                   cleanCode.includes('system.out.println');
        }
    },
    3: {
        title: "Operações Básicas",
        description: "Vamos aprender a fazer cálculos simples em Java usando operadores matemáticos básicos.",
        example: `public class Calculator {
    public static void main(String[] args) {
        int a = 10;
        int b = 5;
        int soma = a + b;
        System.out.println("Soma: " + soma);
    }
}`,
        explanation: [
            "Operador +: Soma dois números",
            "Operador -: Subtrai dois números",
            "Operador *: Multiplica dois números",
            "Operador /: Divide dois números"
        ],
        challenge: "Crie um programa que some os números 15 e 7 e imprima o resultado.",
        hints: [
            "Declare duas variáveis int com os valores 15 e 7",
            "Crie uma variável para armazenar a soma",
            "Imprima o resultado usando System.out.println()",
            "Resposta: public class Soma {\n    public static void main(String[] args) {\n        int a = 15;\n        int b = 7;\n        int soma = a + b;\n        System.out.println(\"Soma: \" + soma);\n    }\n}"
        ],
        validation: (code) => {
            const cleanCode = code.replace(/\s+/g, '').toLowerCase();
            return cleanCode.includes('inta=15') &&
                   cleanCode.includes('intb=7') &&
                   cleanCode.includes('soma=a+b') &&
                   cleanCode.includes('system.out.println');
        }
    }
};

// Estado atual
let currentPhase = 1;
let editor;
let currentHint = 0;

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    initializeEditor();
    loadPhase(currentPhase);
    setupEventListeners();
    initializeThemeToggle();
});

// Configuração do Editor
function initializeEditor() {
    editor = CodeMirror(document.getElementById("codeEditor"), {
        mode: "text/x-java",
        theme: "monokai",
        lineNumbers: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        indentUnit: 4,
        tabSize: 4,
        lineWrapping: true,
        value: phases[currentPhase].example
    });
}

// Setup de Event Listeners
function setupEventListeners() {
    document.getElementById('runButton').addEventListener('click', runCode);
    document.getElementById('hintButton').addEventListener('click', showHintModal);
    document.getElementById('clearButton').addEventListener('click', clearOutput);
    document.getElementById('prevHint').addEventListener('click', () => navigateHint(-1));
    document.getElementById('nextHint').addEventListener('click', () => navigateHint(1));

    // Todas as fases são clicáveis
    document.querySelectorAll('.step').forEach((step, index) => {
        step.addEventListener('click', () => {
            loadPhase(index + 1);
        });
    });
}

// Carregamento de Fase
function loadPhase(phaseNumber) {
    currentPhase = phaseNumber;
    const phase = phases[phaseNumber];
    
    document.querySelector('.instruction-title').textContent = phase.title;
    document.querySelector('.instruction-description').textContent = phase.description;
    
    const codeElement = document.querySelector('.code-example code');
    codeElement.textContent = phase.example;
    
    const explanationList = document.querySelector('.explanation-list');
    explanationList.innerHTML = '';
    phase.explanation.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        explanationList.appendChild(li);
    });
    
    document.querySelector('.challenge-text').textContent = phase.challenge;
    
    editor.setValue(phase.example);
    updateProgress();
    currentHint = 0;
}

// Atualização do Progresso
function updateProgress() {
    const progressFill = document.querySelector('.progress-fill');
    const totalPhases = Object.keys(phases).length;
    const progress = ((currentPhase - 1) / (totalPhases - 1)) * 100;
    progressFill.style.width = `${progress}%`;
    
    document.querySelectorAll('.step').forEach((step, index) => {
        const phaseNumber = index + 1;
        step.classList.remove('active', 'completed');
        
        if (phaseNumber < currentPhase) {
            step.classList.add('completed');
        } else if (phaseNumber === currentPhase) {
            step.classList.add('active');
        }
        
        // Todas as fases ficam clicáveis
        step.style.cursor = 'pointer';
        step.style.opacity = '1';
    });
}

// Sistema de Dicas
function showHintModal() {
    const modal = new bootstrap.Modal(document.getElementById('hintModal'));
    showHint(currentHint);
    modal.show();
}

function showHint(index) {
    const phase = phases[currentPhase];
    const hintContent = document.getElementById('hintContent');
    const prevButton = document.getElementById('prevHint');
    const nextButton = document.getElementById('nextHint');
    
    hintContent.textContent = phase.hints[index];
    document.getElementById('hintCounter').textContent = `${index + 1}/${phase.hints.length}`;
    
    prevButton.disabled = index === 0;
    nextButton.disabled = index === phase.hints.length - 1;
    
    hintContent.className = index === phase.hints.length - 1 ? 'hint-content answer' : 'hint-content';
}

function navigateHint(direction) {
    currentHint = Math.max(0, Math.min(currentHint + direction, phases[currentPhase].hints.length - 1));
    showHint(currentHint);
}

// Execução do Código
function runCode() {
    const code = editor.getValue();
    const output = document.getElementById('output');
    const phase = phases[currentPhase];
    
    output.innerHTML = '';
    
    try {
        if (phase.validation(code)) {
            output.innerHTML = `<div class="success-output">
                <i class="fas fa-check-circle"></i>
                <span>Código correto! Parabéns!</span>
            </div>`;
            showSuccess();
        } else {
            throw new Error("O código não está correto. Tente novamente!");
        }
    } catch (error) {
        output.innerHTML = `<div class="error-output">
            <i class="fas fa-times-circle"></i>
            <span>${error.message}</span>
        </div>`;
    }
}

// Sucesso e Próxima Fase
function showSuccess() {
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    
    if (currentPhase < Object.keys(phases).length) {
        document.querySelector('.success-message').textContent = 
            `Você completou a fase ${currentPhase}! Pronto para o próximo desafio?`;
        
        document.getElementById('nextPhaseButton').onclick = () => {
            currentPhase++;
            loadPhase(currentPhase);
            successModal.hide();
            updateProgress();
        };
    } else {
        showCompletion();
    }
    
    successModal.show();
}

// Conclusão do Nível
function showCompletion() {
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    document.querySelector('.success-message').textContent = 
        "Parabéns! Você completou todas as fases do nível 1!";
    
    const nextButton = document.getElementById('nextPhaseButton');
    nextButton.innerHTML = '<i class="fas fa-home"></i><span>Voltar ao Menu</span>';
    nextButton.onclick = () => {
        window.location.href = "../../java/index.html";
    };
    
    successModal.show();
}

// Toggle de Tema
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    themeToggle.addEventListener('click', () => {
        const html = document.documentElement;
        const isDark = html.getAttribute('data-theme') === 'dark';
        
        html.setAttribute('data-theme', isDark ? 'light' : 'dark');
        themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        
        editor.setOption('theme', isDark ? 'default' : 'monokai');
    });
}

// Limpar Console
function clearOutput() {
    const output = document.getElementById('output');
    output.innerHTML = '';
}