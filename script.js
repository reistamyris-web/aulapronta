const numeroSenha = document.querySelector('.parametro-senha__texto');
const botoes = document.querySelectorAll('.parametro-senha__botao');
const campoSenha = document.querySelector('#campo-senha');
const checkbox = document.querySelectorAll('.checkbox');

const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
const numeros = '0123456789';
const simbolos = '!@#$%&*?';

let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;

botoes[0].addEventListener('click', diminuiTamanho);
botoes[1].addEventListener('click', aumentaTamanho);

function diminuiTamanho() {
    if (tamanhoSenha > 1) {
        tamanhoSenha--;
        numeroSenha.textContent = tamanhoSenha;
        geraSenha();
    }
}

function aumentaTamanho() {
    if (tamanhoSenha < 50) {
        tamanhoSenha++;
        numeroSenha.textContent = tamanhoSenha;
        geraSenha();
    }
}

for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].addEventListener('change', geraSenha);
}

function geraSenha() {
    let alfabeto = '';

    if (checkbox[0].checked) {
        alfabeto += letrasMaiusculas;
    }

    if (checkbox[1].checked) {
        alfabeto += letrasMinusculas;
    }

    if (checkbox[2].checked) {
        alfabeto += numeros;
    }

    if (checkbox[3].checked) {
        alfabeto += simbolos;
    }

    if (alfabeto.length === 0) {
        campoSenha.value = '';
        classificaSenha(0);
        return;
    }

    let senha = '';

    for (let i = 0; i < tamanhoSenha; i++) {
        let indice = Math.floor(Math.random() * alfabeto.length);
        senha += alfabeto[indice];
    }

    campoSenha.value = senha;
    classificaSenha(alfabeto.length);
}

function classificaSenha(tamanhoAlfabeto) {
    const barra = document.querySelector('.forca');
    const valorEntropia = document.querySelector('.entropia');

    let entropia = 0;

    if (tamanhoAlfabeto > 0) {
        entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
    }

    if (barra) {
        barra.classList.remove('fraca', 'media', 'forte');

        if (entropia > 57) {
            barra.classList.add('forte');
        } else if (entropia > 35) {
            barra.classList.add('media');
        } else {
            barra.classList.add('fraca');
        }
    }

    if (valorEntropia) {
        valorEntropia.textContent =
            entropia.toFixed(1) + ' bits de entropia';
    }
}

geraSenha();
