const validaNome = (nome) => {
    if (!nome) return 'O campo nome não pode ser nulo';
    return null;
};

const validaCPF = (cpf) => {
    if (!cpf) return 'O campo CPF não pode ser nulo';
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
    if (!telefone) return 'O campo telefone não pode ser nulo';
    if (!/^\d+$/.test(telefone)) return 'Digite apenas numeros e sem espaço'
    if (telefone.length !== 11) return 'Quantidade incorreta de digitos'
    return null;
};

const validaCEP = (cep) => {
    if(!cep) return 'O campo CEP não pode ser nulo';
    if (!/^\d+$/.test(cep)) return 'Digite apenas numeros e sem espaço'
    if (cep.length !== 8) return 'Quantidade incorreta de digitos'
}

const validaNumeroResidencia = (numero) => {
    if(!numero) return 'O campo numero não pode ser nulo';
}

const validaComplemento = (complemento) => {
    if(!complemento) return 'O campo numero não pode ser nulo';
}

const validaEmail = (email) => {
    if (!email) return 'O campo email não pode ser nulo';
    if (!/\S+@\S+\.\S+/.test(email)) return "E-mail invalido" // verificando se possui caracteres antes de depois do @ e ponto apos o @
    return null;
}

const validaSenha = (senha) => {
    if (!senha) return 'O campo senha não pode ser nulo';
    if (senha.length < 8) return 'A senha deve ter pelo menos 8 caracteres';
    return null;
};

export {
    validaSenha,
    validaEmail,
    validaNome,
    validaCPF,
    validaTelefone,
    validaCEP,
    validaNumeroResidencia,
    validaComplemento
}