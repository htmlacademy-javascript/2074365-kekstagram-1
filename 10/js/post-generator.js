const socialCaption = document.querySelector('.social__caption');
const commentsCount = document.querySelector('.comments-count');
const likesCount = document.querySelector('.likes-count');
const bigPicture = document.querySelector('.big-picture__img').querySelector('img');
const fragment = document.createDocumentFragment();
const templateComment = document.querySelector('#comment').content.querySelector('.social__comment');


//Инициализируем шаблон данными
const initializeTemplateWithData = (comment) => {
  const cloneTemplateComment = templateComment.cloneNode(true);
  cloneTemplateComment.querySelector('.social__picture').src = comment.avatar;
  cloneTemplateComment.querySelector('.social__picture').alt = comment.name;
  cloneTemplateComment.querySelector('.social__text').textContent = comment.message;
  return cloneTemplateComment;
};

// Генерирует фрагмент комментарий для поста
export const generatingFragmentComments = (selectedComments) => {
  selectedComments.forEach((comment) => fragment.append(initializeTemplateWithData(comment)));
  return fragment;
};

// Генерирует пост для модального окна
export const generatingPost = (postElement) => {
  const description = postElement.description;
  bigPicture.src = postElement.url;
  bigPicture.alt = description;
  likesCount.textContent = postElement.likes;
  commentsCount.textContent = `${postElement.comments.length}`;
  socialCaption.textContent = description;
};
