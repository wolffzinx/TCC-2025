const levels = [
    {
        title: "If/Else Básico",
        description: "Crie um programa que verifica se um número é positivo ou negativo. Use o número 5 para teste.",
        expectedOutput: "Positivo",
        tips: [
            "Use if para verificar se o número é maior ou igual a 0",
            "Use printf() para imprimir o resultado",
            "Digite: if (5 >= 0) { printf(\"Positivo\"); } else { printf(\"Negativo\"); }"
        ]
    },
    {
        title: "Switch Case",
        description: "Crie um programa que converte o número 1 em texto. Se for 1, imprima \"Um\".",
        expectedOutput: "Um",
        tips: [
            "Use switch para verificar o valor",
            "Cada caso deve ter um break",
            "Digite: switch(1) { case 1: printf(\"Um\"); break; }"
        ]
    },
    {
        title: "Loop For",
        description: "Use um loop for para imprimir \"Loop\" exatamente uma vez.",
        expectedOutput: "Loop",
        tips: [
            "Use for com um contador",
            "O loop deve executar apenas uma vez",
            "Digite: for(int i=0; i<1; i++) { printf(\"Loop\"); }"
        ]
    }
];

let currentLevel = 0;
let currentTips = 3;

// Atualiza o conteúdo do nível
function updateLevel() {
    const level = levels[currentLevel];
    
    document.querySelector('.nav-title').textContent = `Nível 3: Exercício ${currentLevel + 1}/3`;
    document.querySelector('h2').textContent = level.title;
    document.querySelector('.task p').textContent = level.description;
    
    currentTips = 3;
    document.querySelector('#tipBtn span').textContent = `(${currentTips} restantes)`;
    document.getElementById('tipBtn').disabled = false;
    
    document.getElementById('dicas').innerHTML = '';
    document.getElementById('codeEditor').value = '// Seu código aqui';
    document.getElementById('outputText').innerHTML = '';
    
    document.getElementById('nextBtn').style.display = 'none';
    
    // Remove o botão de menu se existir
    const menuBtn = document.querySelector('#menuBtn');
    if (menuBtn) {
        menuBtn.remove();
    }
}

// Sistema de dicas
document.getElementById('tipBtn').addEventListener('click', () => {
    if (currentTips > 0) {
        const tipIndex = 3 - currentTips;
        const tipElement = document.createElement('div');
        tipElement.className = 'tip';
        
        if (currentTips === 1) {
            tipElement.classList.add('answer');
        }
        
        tipElement.textContent = levels[currentLevel].tips[tipIndex];
        document.getElementById('dicas').appendChild(tipElement);
        
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
        let output = '';
        
        // Verifica o nível atual e faz a verificação apropriada
        switch(currentLevel) {
            case 0: // If/Else
                if (code.includes('if') && code.includes('printf')) {
                    const printMatch = code.match(/printf\s*\(\s*"([^"]*)"\s*\)\s*;/);
                    if (printMatch && printMatch[1] === "Positivo") {
                        output = "Positivo";
                    }
                }
                break;
                
            case 1: // Switch
                if (code.includes('switch') && code.includes('printf')) {
                    const printMatch = code.match(/printf\s*\(\s*"([^"]*)"\s*\)\s*;/);
                    if (printMatch && printMatch[1] === "Um") {
                        output = "Um";
                    }
                }
                break;
                
            case 2: // For
                if (code.includes('for') && code.includes('printf')) {
                    const printMatch = code.match(/printf\s*\(\s*"([^"]*)"\s*\)\s*;/);
                    if (printMatch && printMatch[1] === "Loop") {
                        output = "Loop";
                    }
                }
                break;
        }
        
        outputDiv.textContent = output;
        
        if (output === levels[currentLevel].expectedOutput) {
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Parabéns! Código executado com sucesso!';
            outputDiv.appendChild(successMessage);
            
            if (currentLevel === levels.length - 1) {
                const menuBtn = document.createElement('button');
                menuBtn.id = 'menuBtn';
                menuBtn.className = 'btn next-btn';
                menuBtn.innerHTML = '<i class="fas fa-home"></i> Voltar ao Menu';
                menuBtn.onclick = () => window.location.href = '../index.html';
                document.querySelector('.button-container').appendChild(menuBtn);
            } else {
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