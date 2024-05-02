import {addEventForClosingModalWindow, isCloseModalWindow, removeEventForClosingModalWindow} from './util.js';


const body = document.querySelector('body');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const text = document.querySelector('.text');
const uploadFile = document.querySelector('#upload-file');
const uploadCancel = document.querySelector('#upload-cancel');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

// Сбрасывает значения полей
const resetValuesToField = (...elements) => {
  for (let i = 0; i < elements.length; i++) {
    elements[i].value = null;
  }
};

// Отменить закрытие модального окна при нажатии Esc
const cancelCloseModalWindow = (event) => {
  if (event.key === 'Escape') {
    event.stopPropagation();
  }
};

// Обработчик для отслеживания нажатия на клавишу
const handlerTrackingKeystroke = () => {
  text.addEventListener('keydown', cancelCloseModalWindow);
};

// Обработчик для поля Хэш-тег и комментария
const handlerToField = () => {
  text.addEventListener('focusin', handlerTrackingKeystroke);
};

// Закрывает окно редактирования фотографий по клику или Esc
const closePhotoHandler = () => {
  const handleClose = (event) => {
    if (isCloseModalWindow(event, 'upload-cancel')) {
      body.classList.remove('modal-open');
      imgUploadOverlay.classList.add('hidden');

      // Сбрасывает значения полей
      resetValuesToField(uploadFile, textHashtags, textDescription);

      // Удалить обработчик закрытия модального окна
      removeEventForClosingModalWindow(uploadCancel, handleClose);

      // Удалить обработчик для поля Хэш-тег и комментария
      text.removeEventListener('focusin', handlerTrackingKeystroke);

      // Удалить обработчик для отслеживания нажатия на клавишу
      text.removeEventListener('keydown', cancelCloseModalWindow);
    }
  };

  // Добавить обработчик закрытия модального окна
  addEventForClosingModalWindow(uploadCancel, handleClose);
};

// Обработчик фотографий
export const photoHandler = () => {
  uploadFile.addEventListener('change', () => {
    body.classList.add('modal-open');
    imgUploadOverlay.classList.remove('hidden');
    handlerToField();
    closePhotoHandler();
  });
};
