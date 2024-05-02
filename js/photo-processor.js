const scaleControlValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview');
const img = imgUploadPreview.querySelector('img');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');


const MIN_SCALE = 25;
const MAX_SCALE = 100;
const SCALE_STEP = 25;

let defaultImageSize;


// Масштабирует изображение
const scaleImage = (value) => {
  img.style.transform = `scale(${value / MAX_SCALE})`;
  scaleControlValue.value = `${value}%`;
};

// Уменьшить изображение
const reduceImage = () => {
  if (defaultImageSize > MIN_SCALE) {
    defaultImageSize -= SCALE_STEP;
    scaleImage(defaultImageSize);
  }
};

// Увеличить изображение
const increaseImage = () => {
  if (defaultImageSize < MAX_SCALE) {
    defaultImageSize += SCALE_STEP;
    scaleImage(defaultImageSize);
  }
};

// Обработчик уменьшения размера изображения
const handlerReduceImageSize = () => scaleControlSmaller.addEventListener('click', reduceImage);

// Обработчик увеличения размера изображения
const handlerIncreaseImageSize = () => scaleControlBigger.addEventListener('click', increaseImage);

// Выставить значения по умолчанию
export const setDefaultValues = () => {
  defaultImageSize = MAX_SCALE;
  img.style.transform = 'scale(1)';
  scaleControlValue.value = '100%';
};

// Удаление обработчиков событий по изменению размера изображений
export const deleteEventHandlersToResizingImages = () => {
  scaleControlSmaller.removeEventListener('click', reduceImage);
  scaleControlBigger.removeEventListener('click', increaseImage);
};

// Обработчик размера изображения
export const handlerImageSize = () => {
  setDefaultValues();
  handlerReduceImageSize();
  handlerIncreaseImageSize();
};
