const validaNome = (nome) => {
    if (!nome) return 'Esse é um campo obrigatorio';
    return null;
};

const validaCPF = (cpf) => {
    if (!cpf) return 'Esse é um campo obrigatorio';
    cpf = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (cpf.length !== 11) return 'O CPF deve ter 11 dígitos';

    if (/^(\d)\1+$/.test(cpf)) return 'CPF inválido';   // Elimina CPFs inválidos conhecidos

    let soma = 0; // Validação do primeiro dígito verificador
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return 'CPF inválido';

    soma = 0; // Validação do segundo dígito verificador
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return 'CPF inválido';

    return null; // CPF válido
};


const validaTelefone = (telefone) => {
    if (!telefone) return 'Esse é um campo obrigatorio';
    if (!/^\d+$/.test(telefone)) return 'Digite apenas numeros e sem espaço'
    if (telefone.length !== 11) return 'Quantidade incorreta de digitos'
    return null;
};

const validaCEP = (cep) => {
    if(!cep) return 'Esse é um campo obrigatorio';
    if (!/^\d+$/.test(cep)) return 'Digite apenas numeros e sem espaço'
    if (cep.length !== 8) return 'Quantidade incorreta de digitos'
}

const validaNumeroResidencia = (numero) => {
    if(!numero) return 'Esse é um campo obrigatorio';
}

const validaComplemento = (complemento) => {
    if(!complemento) return 'Esse é um campo obrigatorio';
}

const validaEmail = (email) => {
    if (!email) return 'Esse é um campo obrigatorio';
    if (!/\S+@\S+\.\S+/.test(email)) return "E-mail invalido" // verificando se possui caracteres antes de depois do @ e ponto apos o @
    return null;
}

const validaSenha = (senha) => {
    if (!senha) return 'Esse é um campo obrigatorio';
    if (senha.length < 8) return 'A senha deve ter pelo menos 8 caracteres';
    return null;
};

const validaMarca = (marca) => {
    if(!marca) return 'Esse é um campo obrigatorio'
    if(marca.length < 2) return "nome curto para marca"
}

const validaValor = (valor) => {
    if(!valor) return 'Esse é um campo obrigatorio'
}

const validaPlaca = (placa) => {
    if(!placa) return 'Esse é um campo obrigatorio'
    if(placa.length < 7) return 'Placa invalida'
} 

const validaAno = (ano) =>  {
    if(!ano) return 'Esse é um campo obrigatorio'
} 

export {
    validaSenha,
    validaEmail,
    validaNome,
    validaCPF,
    validaTelefone,
    validaCEP,
    validaNumeroResidencia,
    validaComplemento,
    validaMarca, 
    validaValor,
    validaPlaca,
    validaAno
}