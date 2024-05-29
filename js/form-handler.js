import {sendData} from './remote-data.js';
import {
  addEventForClosingModalWindow,
  isClickOrEscEvent,
  isClickOutsideModal,
  isFormSubmitEvent,
  removeEventForClosingModalWindow
} from './util.js';
import {deleteEventToResizingImages, handlerImageSize} from './photo-processor.js';
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
const preview = document.querySelector('.img-upload__preview').querySelector('img');
const effectsPreview = document.querySelectorAll('.effects__preview');

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

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

// Обработчик отмены закрытия модального окна при нажатии Esc
const onEventKeydown = (event) => {
  if (event.key === 'Escape') {
    event.stopPropagation();
  }
};

// Обработчик для отслеживания фокусировки на элементе
const onTextFocusin = () => text.addEventListener('keydown', onEventKeydown);

// Добавляет события для поля Хэш-тег и комментария
const addEventsToField = () => text.addEventListener('focusin', onTextFocusin);

// Удаление обработчиков событий
const removeEventToListeners = (callback) => {
  text.removeEventListener('focusin', onTextFocusin);
  text.removeEventListener('keydown', onEventKeydown);
  form.removeEventListener('submit', callback);
  deleteEventToResizingImages();
  removeEventToSelectEffect();
};

// Открывает и закрывает окно фоторедактора
const togglePhotoEditor = () => {
  body.classList.toggle('modal-open');
  imgUploadOverlay.classList.toggle('hidden');
};

// Сбросить настройки фоторедактора
const resetPhotoEditor = (callback) => {
  togglePhotoEditor();
  resetPhotoEditorSettings();
  removeEventForClosingModalWindow(uploadCancel, callback);
  removeEventToListeners(callback);
};

// Добавляет событие для модальных окон
const addEvetnToModals = (button, eventTarget, comparisonElements) => {
  const callback = (event) => {
    const classNameToEvent = event.target.className;
    if ('error__button' === classNameToEvent || 'error' === classNameToEvent) {
      isErrorSend = false;
    }

    if (isClickOrEscEvent(event, 'class', button.className) || isClickOutsideModal(event, comparisonElements)) {
      removeEventForClosingModalWindow(button, callback);
      eventTarget.removeEventListener('click', callback);
      eventTarget.remove();
    }
  };
  addEventForClosingModalWindow(button, callback);
  eventTarget.addEventListener('click', callback);
};

// Добавляет событие для модального окна успешной загрузки
const addEventToSuccessModal = () => {
  const successButton = document.querySelector('.success__button');
  const successElements = Array.from(success.querySelectorAll('*'));
  addEvetnToModals(successButton, success, successElements);
};

// Добавляет событие для модального окна с неуспешной загрузкой
const addEventToErrorModal = () => {
  const errorButton = document.querySelector('.error__button');
  const errorElements = Array.from(error.querySelectorAll('*'));
  addEvetnToModals(errorButton, error, errorElements);
};

// Отправить данные по загруженному контенту
const uploadPhotoData = (event, callback) => {
  sendData(event.target)
    .then(() => {
      resetPhotoEditor(callback);
      body.append(success);
      addEventToSuccessModal();
    })
    .catch(() => {
      body.append(error);
      addEventToErrorModal();
      isErrorSend = true;
    })
    .finally(unblockSubmitButton);
};

// Отправляет валидную форму
const submitValidForm = (event, callback) => {
  if (pristine.validate()) {
    blockSubmitButton();
    formattingHashTagField();
    formattingCommentsField();
    uploadPhotoData(event, callback);
  }
};

// Обработчик фоторедактора
const onFormSubmitKeydownClick = (event) => {
  if (isFormSubmitEvent(event)) {
    event.preventDefault();
    submitValidForm(event, onFormSubmitKeydownClick);
  } else if (isClickOrEscEvent(event, 'id', 'upload-cancel') && isErrorSend) {
    error.remove();
    isErrorSend = false;
  } else if (isClickOrEscEvent(event, 'id', 'upload-cancel') && !isErrorSend) {
    resetPhotoEditor(onFormSubmitKeydownClick);
  }
};

// Добавляет события для фоторедактора
const addEventsToPhotoEditor = () => {
  addEventForClosingModalWindow(uploadCancel, onFormSubmitKeydownClick);
  form.addEventListener('submit', onFormSubmitKeydownClick);
};

// Предварительный показ фото
const showPhotoPreview = () => {
  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((item) => fileName.endsWith(item));
  if (matches) {
    const url = URL.createObjectURL(file);
    effectsPreview
      .forEach((item) => {
        item.style.backgroundImage = `url(${url})`;
      });
    preview.src = url;
  }
};

// Обработчик фотографий
export const photoHandler = () => {
  validateFields();
  uploadFile.addEventListener('change', () => {
    showPhotoPreview();
    togglePhotoEditor();
    addEventsToField();
    handlerImageSize();
    createsPhotoEffect();
    addEventsToPhotoEditor();
  });
};
