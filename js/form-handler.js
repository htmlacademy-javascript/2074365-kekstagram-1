import {sendData} from './remote-data.js';
import {
  addEventForClosingModalWindow,
  isClickOrEscEvent,
  isClickOutsideModal,
  isFormSubmitEvent,
  removeEventForClosingModalWindow
} from './util.js';
import {deleteEventHandlersToResizingImages, handlerImageSize} from './photo-processor.js';
import {createsPhotoEffect, removeEventToSelectEffect} from './photo-filters.js';
import {
  blockSubmitButton,
  formattingCommentsField,
  formattingHashTagField,
  pristine,
  unblockSubmitButton,
  validateFields
} from './form-validator.js';


const uploadFile = document.querySelector('#upload-file');
const uploadCancel = document.querySelector('#upload-cancel');
const form = document.querySelector('.img-upload__form');
const body = document.querySelector('body');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const text = document.querySelector('.text');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const sliderElement = document.querySelector('.effect-level__slider');
const success = document.querySelector('#success').content.querySelector('.success');
const error = document.querySelector('#error').content.querySelector('.error');

let isErrorSend;


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
  pristine.reset();
};

// Отменить закрытие модального окна при нажатии Esc
const cancelCloseModalWindow = (event) => {
  if (event.key === 'Escape') {
    event.stopPropagation();
  }
};

// Обработчик для отслеживания нажатия на клавишу
const handlerTrackingKeystroke = () => text.addEventListener('keydown', cancelCloseModalWindow);

// Обработчик для поля Хэш-тег и комментария
const handlerToField = () => text.addEventListener('focusin', handlerTrackingKeystroke);

// Удаление обработчиков событий
const removeEventListeners = (listener) => {
  text.removeEventListener('focusin', handlerTrackingKeystroke);
  text.removeEventListener('keydown', cancelCloseModalWindow);
  form.removeEventListener('submit', listener);
  deleteEventHandlersToResizingImages();
  removeEventToSelectEffect();
};

// Открывает и закрывает окно фоторедактора
const togglePhotoEditor = () => {
  body.classList.toggle('modal-open');
  imgUploadOverlay.classList.toggle('hidden');
};

// Сбросить настройки фоторедактора
const resetPhotoEditor = (listener) => {
  togglePhotoEditor();
  resetPhotoEditorSettings();
  removeEventForClosingModalWindow(uploadCancel, listener);
  removeEventListeners(listener);
};

// Обработчик модальных окон
const handleModals = (button, eventTarget, comparisonElements) => {
  const listener = (event) => {
    if (isClickOrEscEvent(event, 'class', button.className) || isClickOutsideModal(event, comparisonElements)) {
      removeEventForClosingModalWindow(button, listener);
      eventTarget.removeEventListener('click', listener);
      eventTarget.remove();
    }
  };
  addEventForClosingModalWindow(button, listener);
  eventTarget.addEventListener('click', listener);
};

// Обработчик модального окна успешной загрузки
const handleSuccessModal = () => {
  const successButton = document.querySelector('.success__button');
  const successElements = Array.from(success.querySelectorAll('*'));
  handleModals(successButton, success, successElements);
};

// Обработчик модального окна с неуспешной загрузкой
const handleErrorModal = () => {
  const errorButton = document.querySelector('.error__button');
  const errorElements = Array.from(error.querySelectorAll('*'));
  handleModals(errorButton, error, errorElements);
};

// Отправить данные по загруженному контенту
const uploadPhotoData = (event, listener) => {
  sendData(event.target)
    .then(() => {
      resetPhotoEditor(listener);
      body.append(success);
      handleSuccessModal();
    })
    .catch(() => {
      body.append(error);
      handleErrorModal();
      isErrorSend = true;
    })
    .finally(unblockSubmitButton);
};

// Отправляет валидную форму
const submitValidForm = (event, listener) => {
  if (pristine.validate()) {
    blockSubmitButton();
    formattingHashTagField();
    formattingCommentsField();
    uploadPhotoData(event, listener);
  }
};

// Слушатель обработчика фоторедактора
const listenerPhotoEditor = (event) => {
  if (isFormSubmitEvent(event)) {
    event.preventDefault();
    submitValidForm(event, listenerPhotoEditor);
  } else if (isClickOrEscEvent(event, 'id', 'upload-cancel') && !isErrorSend) {
    resetPhotoEditor(listenerPhotoEditor);
  }
  isErrorSend = false;
};

// Обработчик фоторедактора
const handlerPhotoEditor = () => {
  addEventForClosingModalWindow(uploadCancel, listenerPhotoEditor);
  form.addEventListener('submit', listenerPhotoEditor);
};

// Обработчик фотографий
export const photoHandler = () => {
  validateFields();
  uploadFile.addEventListener('change', () => {
    togglePhotoEditor();
    handlerToField();
    handlerImageSize();
    createsPhotoEffect();
    handlerPhotoEditor();
  });
};
