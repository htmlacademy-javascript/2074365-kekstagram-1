// Время показа сообщения
const ALERT_SHOW_TIME = 5000;

//Функция генерации последовательных чисел
export const generateNumber = () => {
  let id = 0;
  return () => id++;
};

// Проверяет событие по клику или по нажатию Esc
export const isClickOrEscEvent = (event, type, element) => {
  const isClickToCloseButton = event.target.getAttribute(type) === element;
  const isPushToEscape = event.key === 'Escape';
  return isClickToCloseButton || isPushToEscape;
};

// Проверяет событие по отправке формы
export const isFormSubmitEvent = (event) => event.target.getAttribute('id') === 'upload-select-image';

// Проверяет событие по клику за пределы модального окна
export const isClickOutsideModal = (event, element) => !element.some((item) => item.contains(event.target));

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

export const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};
