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

// Проверяет событие по клику или по нажатию Esc
export const isCloseModalWindow = (event, buttonId) => {
  const isClickToCloseButton = event.target.getAttribute('id') === buttonId;
  const isPushToEscape = event.key === 'Escape';
  return isClickToCloseButton || isPushToEscape;
};

// Добавляет события по закрытию модального окна
export const addEventForClosingModalWindow = (element, fun) => {
  document.addEventListener('keydown', fun);
  element.addEventListener('click', fun);
};

// Удаляет события по закрытию модального окна
export const removeEventForClosingModalWindow = (element, fun) => {
  document.removeEventListener('keydown', fun);
  element.removeEventListener('click', fun);
};
