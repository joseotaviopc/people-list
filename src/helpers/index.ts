
// CPF mask utility
const cpfMask = (value: string): string => {
    return value
        .replace(/\D/g, '') // Remove tudo que não é dígito
        .replace(/(\d{3})(\d)/, '$1.$2') // Coloca um ponto entre o terceiro e o quarto dígitos
        .replace(/(\d{3})(\d)/, '$1.$2') // Coloca um ponto entre o terceiro e o quarto dígitos
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2') // Coloca um hífen entre o terceiro e o quarto dígitos
        .slice(0, 14);
};

// CPF validation
const validateCPF = (cpf: string): boolean => {
    cpf = cpf.replace(/[.|-]/g, '');

    // Validate if CPF has 11 digits
    if (cpf.length !== 11) return false;

    // Validate if all digits are the same
    if (/^([0-9])\1+$/.test(cpf)) return false;

    // Calculate the first digit
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let firstDigit = sum % 11;
    firstDigit = firstDigit < 2 ? 0 : 11 - firstDigit;

    // Calculate the second digit
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    let secondDigit = sum % 11;
    secondDigit = secondDigit < 2 ? 0 : 11 - secondDigit;

    return (firstDigit === parseInt(cpf.charAt(9))) && (secondDigit === parseInt(cpf.charAt(10)));
};

// Phone mask utility
const phoneMask = (value: string): string => {
    return value
        .replace(/\D/g, '') // Remove tudo que não é dígito
        .replace(/(\d{2})(\d)/, '($1) $2') // Coloca parênteses no DDD e um espaço
        .replace(/(\d{5})(\d)/, '$1-$2') // Coloca hífen antes dos últimos 4 dígitos
        .slice(0, 15); // Limita o tamanho máximo
};

// Phone validation
const validatePhone = (phone: string): boolean => {
    phone = phone.replace(/[(|)|\-|\s]/g, ''); // Remove parênteses, hífen e espaços

    // Validate if phone has 11 digits (DDD + number)
    if (phone.length !== 11) return false;

    // Validate if all digits are not the same
    if (/^([0-9])\1+$/.test(phone)) return false;

    // Validate if DDD is valid (2 to 99)
    const ddd = parseInt(phone.substring(0, 2));
    if (ddd < 2 || ddd > 99) return false;

    return true;
};

export { cpfMask, validateCPF, phoneMask, validatePhone };