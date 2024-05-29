const effectLevel = document.querySelector('.img-upload__effect-level');
const effectElements = document.querySelector('.img-upload__effects');
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const imageElement = document.querySelector('.img-upload__preview').querySelector('img');


// Массив эффектов
const EFFECTS = [
  {
    name: 'none',
    filter: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: ''
  },
  {
    name: 'chrome',
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  {
    name: 'sepia',
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  {
    name: 'marvin',
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  {
    name: 'phobos',
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  {
    name: 'heat',
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  }
];

const ORIGINAL_EFFECT = EFFECTS[0];
let effect = ORIGINAL_EFFECT;


// добавить глубину эффекта
const addDepthOfEffect = (value) => {
  effectLevelValue.value = `${Number(value)}`;
};

// Сбросить стили фильтра
const resetStyleFilter = () => {
  imageElement.style.filter = '';
};

// Слушатель при обновлении слайдера
const onSliderUpdate = () => {
  const sliderValue = sliderElement.noUiSlider.get();
  if (imageElement.className && imageElement.className !== 'effects__preview--none') {
    imageElement.style.filter = `${effect.filter}(${sliderValue}${effect.unit})`;
    addDepthOfEffect(sliderValue);
  }
};

// Добавляет событие на обновлении слайдера
const addEventOnSliderUpdate = () => sliderElement.noUiSlider.on('update', onSliderUpdate);

// Установить значения слайдера
const setSliderValues = (value) => {
  if (value) {
    effect = EFFECTS.find((item) => value === item.name);
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: effect.min,
        max: effect.max
      },
      step: effect.step,
      start: effect.max
    });
  }
  addDepthOfEffect(effect.max);
};

// Изменить значение эффекта
const changeEffectValue = (value) => setSliderValues(value);

// Удаляет класс у изображения предварительного просмотра
const removeClassAnImage = () => imageElement.removeAttribute('class');

// Добавляет класс изображению предварительного просмотра
const addClassAnImage = (nameStyle) => imageElement.classList.add(`effects__preview--${nameStyle}`);

// Скрывает или показывает ползунок
const hideOrShowSlider = (value) => effectLevel.classList.toggle('visually-hidden', value === 'none');

// Обработчик для выбора эффекта
const onImgUploadEffectsChange = (event) => {
  const nameStyle = event.target.value;
  hideOrShowSlider(nameStyle);
  changeEffectValue(nameStyle);
  removeClassAnImage();
  resetStyleFilter();
  addClassAnImage(nameStyle);
};

// Добавляет событие для выбора эффекта
const addEventToSelectEffect = () => effectElements.addEventListener('change', onImgUploadEffectsChange);

// Создает noUiSlider
const createNoUiSlider = () => {
  const maxValue = ORIGINAL_EFFECT.max;
  noUiSlider.create(sliderElement, {
    range: {
      min: ORIGINAL_EFFECT.min,
      max: maxValue
    },
    start: maxValue,
    step: ORIGINAL_EFFECT.step,
    connect: 'lower'
  });
  addDepthOfEffect(maxValue);
};

// Удаляет событие для выбора эффекта
export const removeEventToSelectEffect = () => effectElements.removeEventListener('change', onImgUploadEffectsChange);

// Создает фото эффекты
export const createsPhotoEffect = () => {
  hideOrShowSlider('none');
  createNoUiSlider();
  removeClassAnImage();
  resetStyleFilter();
  addEventToSelectEffect();
  addEventOnSliderUpdate();
};
