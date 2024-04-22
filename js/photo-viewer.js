const bigPictureElement = document.querySelector('.big-picture');
const templateComment = document.querySelector('#comment').content.querySelector('.social__comment');


//Инициализируем шаблон данными
const initializeTemplateWithData = (comment) => {
  const cloneTemplateComment = templateComment.cloneNode(true);
  cloneTemplateComment.querySelector('.social__picture').src = comment.avatar;
  cloneTemplateComment.querySelector('.social__picture').alt = comment.name;
  cloneTemplateComment.querySelector('.social__text').textContent = comment.message.join('. ');
  return cloneTemplateComment;
};

// Генерирует комментарии для поста
const generatingComments = (postElement) => {
  const fragment = document.createDocumentFragment();
  postElement.comments.forEach((comment) => fragment.append(initializeTemplateWithData(comment)));

  const socialComments = document.querySelector('.social__comments');
  socialComments.innerHTML = '';
  socialComments.append(fragment);
};

// Генерирует пост для модального окна
const generatingPost = (postElement) => {
  const description = postElement.description.join(', ');

  const bigPicture = document.querySelector('.big-picture__img').querySelector('img');
  bigPicture.src = postElement.url;
  bigPicture.alt = description;

  const likesCount = document.querySelector('.likes-count');
  likesCount.textContent = postElement.likes;

  const commentsCount = document.querySelector('.comments-count');
  commentsCount.textContent = `${postElement.comments.length}`;

  const socialCaption = document.querySelector('.social__caption');
  socialCaption.textContent = description;
  generatingComments(postElement);
};

// Показывает модальное окно
const showsModalWindow = () => bigPictureElement.classList.remove('hidden');

// Скрывает элементы комментария
const hideCommentElements = () => {
  const commentCount = document.querySelector('.social__comment-count');
  commentCount.classList.add('hidden');

  const commentsLoader = document.querySelector('.comments-loader');
  commentsLoader.classList.add('hidden');

  const body = document.querySelector('body');
  body.classList.add('modal-open');
};

// Закрывает модальное окно по клику или Esc
function closeModalWindow() {
  const bigPictureCancel = document.querySelector('.big-picture__cancel');

  const handleClose = () => {
    bigPictureElement.classList.add('hidden');
    bigPictureCancel.removeEventListener('click', handleClose);
    document.removeEventListener('keydown', handleClose);
  };

  bigPictureCancel.addEventListener('click', handleClose);
  document.addEventListener('keydown', handleClose);
}

// Показывает пост в модальном окне
export const showPost = (posts) => {
  const container = document.querySelector('.pictures');
  container.addEventListener('click', (event) => {
    const dataId = event.target.closest('[data-thumbnail-id]');
    if (!dataId) {
      return;
    }

    const postElement = posts.find((post) => post.id === parseInt(dataId.dataset.thumbnailId, 10));
    if (postElement) {
      showsModalWindow();
      hideCommentElements();
      generatingPost(postElement);
      closeModalWindow();
    }
  });
};
