const scaleControlValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview');
const img = imgUploadPreview.querySelector('img');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');


const MIN_SCALE = 25;
const MAX_SCALE = 100;
const SCALE_STEP = 25;

let currentImageSize = MAX_SCALE;


// Масштабирует изображение
const scaleImage = (value) => {
  img.style.transform = `scale(${value / MAX_SCALE})`;
  scaleControlValue.value = `${value}%`;
};

// Обработчик изменения размера изображения
const onScaleControlClick = (event) => {
  const isReduce = event.target.classList.contains('scale__control--smaller');
  const isIncrease = event.target.classList.contains('scale__control--bigger');

  if ((isReduce && currentImageSize > MIN_SCALE) || (isIncrease && currentImageSize < MAX_SCALE)) {
    const imageSize = isReduce ? currentImageSize -= SCALE_STEP : currentImageSize += SCALE_STEP;
    scaleImage(imageSize);
  }
};

// Добавляет событие для уменьшения размера изображения
const addEventToReduceImageSize = () => scaleControlSmaller.addEventListener('click', onScaleControlClick);

// Добавляет событие для увеличения размера изображения
const addEventToIncreaseImageSize = () => scaleControlBigger.addEventListener('click', onScaleControlClick);

// Выставить значения по умолчанию
const setDefaultValues = () => {
  currentImageSize = MAX_SCALE;
  scaleImage(MAX_SCALE);
};

// Удаление обработчиков событий по изменению размера изображений
export const deleteEventToResizingImages = () => {
  scaleControlSmaller.removeEventListener('click', onScaleControlClick);
  scaleControlBigger.removeEventListener('click', onScaleControlClick);
};

// Обработчик размера изображения
export const handlerImageSize = () => {
  setDefaultValues();
  addEventToReduceImageSize();
  addEventToIncreaseImageSize();
};
