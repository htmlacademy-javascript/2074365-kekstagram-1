//Шаблон картинки
const thumbnailTemplate = document
  .querySelector('#picture')
  .content
  .querySelector('.picture');

//Контейнер для изображений от других пользователей
const picturesContainer = document.querySelector('.pictures');

//Инициализируем шаблон данными
const initializeTemplateWithData = ({url, likes, comments, description}) => {
  const clonePictureTemplate = thumbnailTemplate.cloneNode(true);
  clonePictureTemplate.querySelector('.picture__img').src = url;
  clonePictureTemplate.querySelector('.picture__img').alt = description;
  clonePictureTemplate.querySelector('.picture__likes').textContent = likes;
  clonePictureTemplate.querySelector('.picture__comments').textContent = comments;
  return clonePictureTemplate;
};

//Отрисовать миниатюры
export const renderingThumbnails = (posts) => {
  const fragment = document.createDocumentFragment();
  posts.forEach((post) => fragment.append(initializeTemplateWithData(post)));
  picturesContainer.append(fragment);
};
