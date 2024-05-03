import {addEventForClosingModalWindow, isCloseModalWindow, removeEventForClosingModalWindow} from './util.js';
import {deleteEventHandlersToResizingImages, handlerImageSize} from './photo-processor.js';
import {createsPhotoEffect, removeEventToSelectEffect} from './photo-filters.js';


const uploadFile = document.querySelector('#upload-file');
const uploadCancel = document.querySelector('#upload-cancel');
const body = document.querySelector('body');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const text = document.querySelector('.text');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const sliderElement = document.querySelector('.effect-level__slider');


// Сбрасывает значения полей
const resetValuesToField = (...elements) => {
  elements.forEach((element) => {
    element.value = '';
  });
};

// Сбросить параметры редактора фотографий
const resetPhotoEditorSettings = () => {
  resetValuesToField(uploadFile, textHashtags, textDescription);
  sliderElement.noUiSlider.destroy();
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

// Удаление обработчиков событий
const removeEventListeners = () => {
  text.removeEventListener('focusin', handlerTrackingKeystroke);
  text.removeEventListener('keydown', cancelCloseModalWindow);
  deleteEventHandlersToResizingImages();
  removeEventToSelectEffect();
};

// Закрывает окно редактирования фотографий по клику или Esc
const closePhotoHandler = () => {
  const handleClose = (event) => {
    if (isCloseModalWindow(event, 'upload-cancel')) {
      body.classList.remove('modal-open');
      imgUploadOverlay.classList.add('hidden');
      resetPhotoEditorSettings();
      removeEventForClosingModalWindow(uploadCancel, handleClose);
      removeEventListeners();
    }
  };
  addEventForClosingModalWindow(uploadCancel, handleClose);
};

// Обработчик фотографий
export const photoHandler = () => {
  uploadFile.addEventListener('change', () => {
    body.classList.add('modal-open');
    imgUploadOverlay.classList.remove('hidden');
    handlerToField();
    handlerImageSize();
    createsPhotoEffect();
    closePhotoHandler();
  });
};
