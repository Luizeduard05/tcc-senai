const validaEmail = (email) => {
    if (!email) return 'O campo email não pode ser nulo';
    if(!/\S+@\S+\.\S+/.test(email)) return "E-mail invalido" // verificando se possui caracteres antes de depois do @ e ponto apos o @
    return null;
}

const validaSenha = (senha) => {
    if (!senha) return 'O campo senha não pode ser nulo';
    if (senha.length < 8) return 'A senha deve ter pelo menos 8 caracteres';
    return null;
};

export {
    validaSenha,
    validaEmail
}