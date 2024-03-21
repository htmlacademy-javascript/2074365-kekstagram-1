/** Функция для проверки, является ли строка палиндромом */
const isPalindrome = (inputString) => {
  const string = inputString.replaceAll(' ', '').toLowerCase();
  return string === string.split('').reverse().join('');
};
isPalindrome('Лёша на полке клопа нашёл ');


/**
 * Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого
 * положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN:
 */
const extractNumbers = (input) => {
  if (typeof input === 'number' && !Number.isNaN(input)) {
    return Math.abs(Number(input.toString().replace('.', '')));
  }

  const numbersOnly = input.replace(/\D/g, '');
  return numbersOnly === '' ? 'NaN' : Number(numbersOnly);
};
extractNumbers(1.5);


/**
 * Функция, которая принимает три параметра: исходную строку, минимальную длину и строку с добавочными
 * символами — и возвращает исходную строку, дополненную указанными символами до заданной длины.
 * Символы добавляются в начало строки. Если исходная строка превышает заданную длину, она не должна обрезаться.
 * Если «добивка» слишком длинная, она обрезается с конца
 */
const creatingFileAddresses = (string, minLength, auxiliaryString) => {
  const currentLength = minLength - string.length;
  if (currentLength <= 0) {
    return string;
  }

  const repeatCount = Math.floor(currentLength / auxiliaryString.length);
  const remainderLength = currentLength % auxiliaryString.length;

  return auxiliaryString.slice(0, remainderLength) + auxiliaryString.repeat(repeatCount) + string;
};
creatingFileAddresses('qwerty', 4, '0');


/** Функция для проверки длины строки. */
const checkStringLength = (string, stringLength) => stringLength >= string.length;
checkStringLength('проверяемая строка', 10);
