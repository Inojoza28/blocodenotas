// Seleção dos elementos
const textarea = document.getElementById('notepad');
const clearBtn = document.getElementById('clearBtn');
const downloadBtn = document.getElementById('downloadBtn');
const incFontBtn = document.getElementById('incFontBtn');
const decFontBtn = document.getElementById('decFontBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const focusBtn = document.getElementById('focusBtn');
const header = document.getElementById('header');
const menuToggleBtn = document.getElementById('menuToggleBtn');
const toolbar = document.querySelector('.toolbar');
// Seleciona o botão para restaurar o header/toolbar
const showToolbarBtn = document.getElementById('showToolbarBtn');

// Carrega o conteúdo salvo, se houver
textarea.value = localStorage.getItem('notepadText') || '';

// Carrega o tamanho da fonte salvo ou define o padrão (18px)
let fontSize = parseInt(localStorage.getItem('notepadFontSize')) || 18;
textarea.style.fontSize = fontSize + 'px';

// Salva automaticamente o conteúdo ao digitar
textarea.addEventListener('input', () => {
    localStorage.setItem('notepadText', textarea.value);
});

// Botão Limpar
clearBtn.addEventListener('click', () => {
    if (confirm('Tem certeza que deseja limpar o bloco de notas?')) {
        textarea.value = '';
        localStorage.removeItem('notepadText');
    }
});

// Botão Baixar
downloadBtn.addEventListener('click', () => {
    const text = textarea.value;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'notas.txt';
    a.click();
    window.URL.revokeObjectURL(url);
});

// Botão Aumentar Fonte
incFontBtn.addEventListener('click', () => {
    fontSize += 2;
    textarea.style.fontSize = fontSize + 'px';
    localStorage.setItem('notepadFontSize', fontSize);
});

// Botão Diminuir Fonte
decFontBtn.addEventListener('click', () => {
    if (fontSize > 10) {
        fontSize -= 2;
        textarea.style.fontSize = fontSize + 'px';
        localStorage.setItem('notepadFontSize', fontSize);
    }
});

// Botão Fullscreen com troca de ícone
fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().then(() => {
            fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
        }).catch(err => {
            alert(`Erro ao tentar entrar em tela cheia: ${err.message}`);
        });
    } else {
        document.exitFullscreen().then(() => {
            fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
        });
    }
});

// Botão Modo Foco: oculta o header (inclusive a toolbar) e exibe o botão para restaurar
focusBtn.addEventListener('click', () => {
    header.style.transform = 'translateY(-100%)';
    showToolbarBtn.style.display = 'block';
    // Oculta o menu hambúrguer e garante que a toolbar esteja fechada
    menuToggleBtn.style.display = 'none';
    toolbar.classList.remove('active');
    menuToggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
});

// Botão para restaurar o header/toolbar
showToolbarBtn.addEventListener('click', () => {
    header.style.transform = 'translateY(0)';
    showToolbarBtn.style.display = 'none';
    // Restaura o menu hambúrguer conforme definido na CSS (sem inline style)
    menuToggleBtn.style.display = '';
});

// Menu hambúrguer: alterna a exibição da toolbar e troca o ícone
menuToggleBtn.addEventListener('click', () => {
    toolbar.classList.toggle('active');
    if (toolbar.classList.contains('active')) {
        menuToggleBtn.innerHTML = '<i class="fas fa-times"></i>';
    } else {
        menuToggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
});
