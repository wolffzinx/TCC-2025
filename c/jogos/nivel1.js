const levels = [
    {
        title: "Hello World em C",
        description: "Crie um programa que imprima \"Hello, World!\"",
        expectedOutput: "Hello, World!",
        tips: [
            "Use printf() para imprimir texto",
            "O texto deve estar entre aspas duplas",
            "Digite exatamente: printf(\"Hello, World!\");"
        ]
    },
    {
        title: "Seu Nome",
        description: "Imprima \"Meu nome é CodeCrafter\"",
        expectedOutput: "Meu nome é CodeCrafter",
        tips: [
            "Use printf() novamente",
            "Cuidado com os espaços no texto",
            "Digite: printf(\"Meu nome é CodeCrafter\");"
        ]
    },
    {
        title: "Mensagem Final",
        description: "Imprima \"Concluí a primeira fase!\"",
        expectedOutput: "Concluí a primeira fase!",
        tips: [
            "Mesmo formato dos anteriores",
            "Cuidado com os acentos",
            "Digite: printf(\"Concluí a primeira fase!\");"
        ]
    }
];

let currentLevel = 0;
let currentTips = 3;

// Atualiza o conteúdo do nível
function updateLevel() {
    const level = levels[currentLevel];
    
    // Atualiza título e descrição
    document.querySelector('.nav-title').textContent = `Nível 1: Exercício ${currentLevel + 1}/3`;
    document.querySelector('h2').textContent = level.title;
    document.querySelector('.task p').textContent = level.description;
    
    // Reseta dicas
    currentTips = 3;
    document.querySelector('#tipBtn span').textContent = `(${currentTips} restantes)`;
    document.getElementById('tipBtn').disabled = false;
    
    // Limpa dicas anteriores
    document.getElementById('dicas').innerHTML = '';
    
    // Limpa editor e output
    document.getElementById('codeEditor').value = '// Seu código aqui';
    document.getElementById('outputText').innerHTML = '';
    
    // Esconde botão de próximo/menu
    document.getElementById('nextBtn').style.display = 'none';
}

// Sistema de dicas
document.getElementById('tipBtn').addEventListener('click', () => {
    if (currentTips > 0) {
        const tipIndex = 3 - currentTips;
        const tipElement = document.createElement('div');
        tipElement.className = 'tip';
        
        if (currentTips === 1) {
            // Última dica (resposta)
            tipElement.classList.add('answer');
        }
        
        tipElement.textContent = levels[currentLevel].tips[tipIndex];
        document.getElementById('dicas').appendChild(tipElement);
        
        // Força reflow para animação funcionar
        void tipElement.offsetWidth;
        tipElement.classList.add('show');
        
        currentTips--;
        document.querySelector('#tipBtn span').textContent = `(${currentTips} restantes)`;
        
        if (currentTips === 0) {
            document.getElementById('tipBtn').disabled = true;
        }
    }
});

// Execução do código
document.getElementById('runBtn').addEventListener('click', () => {
    const code = document.getElementById('codeEditor').value;
    const outputDiv = document.getElementById('outputText');
    outputDiv.innerHTML = '';
    
    try {
        const match = code.match(/printf\s*\(\s*"([^"]*)"\s*\)\s*;?/);
        
        if (!match) {
            throw new Error('Erro: Comando printf() não encontrado ou mal formatado!');
        }
        
        const output = match[1];
        outputDiv.textContent = output;
        
        if (output === levels[currentLevel].expectedOutput) {
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Parabéns! Código executado com sucesso!';
            outputDiv.appendChild(successMessage);
            
            if (currentLevel === levels.length - 1) {
                // Último nível - mostrar botão de menu
                const menuBtn = document.createElement('button');
                menuBtn.className = 'btn next-btn';
                menuBtn.innerHTML = '<i class="fas fa-home"></i> Voltar ao Menu';
                menuBtn.onclick = () => window.location.href = '../index.html';
                document.querySelector('.button-container').appendChild(menuBtn);
            } else {
                // Próximo nível
                const nextBtn = document.getElementById('nextBtn');
                nextBtn.style.display = 'block';
                nextBtn.textContent = `Próximo Exercício (${currentLevel + 2}/3)`;
            }
        } else {
            throw new Error('Output não corresponde ao esperado. Tente novamente!');
        }
    } catch (error) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.innerHTML = `<i class="fas fa-times-circle"></i> ${error.message}`;
        outputDiv.appendChild(errorMessage);
    }
});

// Limpar output
document.getElementById('clearBtn').addEventListener('click', () => {
    document.getElementById('outputText').innerHTML = '';
});

// Próximo nível
document.getElementById('nextBtn').addEventListener('click', () => {
    currentLevel++;
    updateLevel();
});

// Theme Toggle
document.getElementById('themeToggle').addEventListener('click', () => {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    const themeIcon = document.querySelector('.theme-toggle i');
    themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
});

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    updateLevel();
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    const themeIcon = document.querySelector('.theme-toggle i');
    themeIcon.className = prefersDark ? 'fas fa-moon' : 'fas fa-sun';
});