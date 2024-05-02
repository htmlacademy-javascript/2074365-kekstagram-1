const form = document.querySelector('.img-upload__form');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

const regExpToHashTag = /^#[a-zа-яё0-9]{1,19}$/i;
const regExpToComments = /^(?:(?!\s\s).){0,140}$/;

const ERROR_MESSAGE_HASH_TAG = 'Поле хэш-тег не валидно';
const ERROR_MESSAGE_COMMENT = 'Поле комментарий не валидно';


// Валидатор Pristine
const pristine = new Pristine(form, {
  classTo: 'text__label',
  errorTextParent: 'text__label',
  errorTextTag: 'div',
  errorTextClass: 'text__label-error'
});

// Проходят ли валидацию Хэш-Теги по регулярному выражению
const isEveryValidHashTag = (array) => array.every((item) => regExpToHashTag.test(item));

// Допустимое ли количество Хэш-Тегов
const isValidQuantityHashTag = (array) => array.length >= 0 && array.length <= 5;

// Проверяет наличие дубликатов
const isNoDuplicates = (array) => new Set(array).size === array.length;

// Проходят ли Хэш-Теги валидацию по условиям (возвращает true или false)
const isValidateHashTagField = (value) => {
  const hashTagArray = value.split(' ').filter((item) => item);
  return isEveryValidHashTag(hashTagArray) && isValidQuantityHashTag(hashTagArray) && isNoDuplicates(hashTagArray);
};

// Проверить по условиям поле комментария (возвращает true или false)
const isValidateCommentField = (value) => regExpToComments.test(value);

// Валидирует поле
const validateField = (element, validateFunction, message) => {
  // Валидация поля Хэш-Тег
  pristine.addValidator(
    // Валидируемое поле
    form.querySelector(element),
    // Валидация
    validateFunction,
    // Сообщение об ошибке
    message
  );
};

// Форматирует поле Хэш-Теги
const formattingHashTagField = () => {
  textHashtags.value = textHashtags.value.split(' ').filter((item) => item).join(' ');
};

// Форматирует поле комментария
const formattingCommentsField = () => {
  textDescription.value = textDescription.value.trim();
};

// Добавляем событие отправки формы
const addEventSubmitForm = () => {
  const checkEvent = (event) => {
    if (pristine.validate()) {
      formattingHashTagField();
      formattingCommentsField();
      form.removeEventListener('submit', checkEvent);
    } else {
      event.preventDefault();
    }
  };
  form.addEventListener('submit', checkEvent);
};

// Валидирует поля
export const validateFields = () => {
  addEventSubmitForm();
  validateField('#text__hashtags-id', isValidateHashTagField, ERROR_MESSAGE_HASH_TAG);
  validateField('#text__description-id', isValidateCommentField, ERROR_MESSAGE_COMMENT);
};
