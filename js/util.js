//Функция генерации случайного числа в заданном диапазоне
export const getRandomPositiveNumber = (firstNumber, secondNumber) => {
  const lower = Math.ceil(Math.min(Math.abs(firstNumber), Math.abs(secondNumber)));
  const upper = Math.floor(Math.max(Math.abs(firstNumber), Math.abs(secondNumber)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//Получить случайное количество, случайных элементов из массива
export const getRandomElementByArray = (count, array) =>
  Array.from({length: getRandomPositiveNumber(1, count)}, () =>
    array[getRandomPositiveNumber(0, array.length - 1)]);

//Функция генерации последовательных чисел
export const generateNumber = () => {
  let id = 1;
  return () => id++;
};
