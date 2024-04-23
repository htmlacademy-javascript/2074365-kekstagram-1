import {generatingFragmentComments, generatingPost} from './post-generator.js';

const container = document.querySelector('.pictures');
const body = document.querySelector('body');
const bigPictureElement = document.querySelector('.big-picture');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const commentsLoader = document.querySelector('.comments-loader');
const socialCommentCount = document.querySelector('.social__comment-count');
const socialComments = document.querySelector('.social__comments');
const MINIMUM_COMMENTS = 5;

let numberCommentsToShow = 0;
const selectedComments = [];


// Показывает модальное окно
const showsModalWindow = () => bigPictureElement.classList.remove('hidden');

// Скрывает элементы комментария
const hideCommentElements = () => body.classList.add('modal-open');

// Проверяет событие по клику или по нажатию Esc
const isCloseModalWindow = (event) => {
  const isClickToCloseButton = event.target.getAttribute('id') === 'picture-cancel';
  const isPushToEscape = event.key === 'Escape';
  return isClickToCloseButton || isPushToEscape;
};

// Добавляет события по закрытию модального окна
const addEventForClosingModalWindow = (fun) => {
  bigPictureCancel.addEventListener('click', fun);
  document.addEventListener('keydown', fun);
};

// Удаляет события по закрытию модального окна
const removeEventForClosingModalWindow = (fun) => {
  bigPictureCancel.removeEventListener('click', fun);
  document.removeEventListener('keydown', fun);
};

// Закрывает модальное окно по клику или Esc
const closeModalWindow = () => {
  const handleClose = (event) => {
    if (isCloseModalWindow(event)) {
      numberCommentsToShow = 0;
      bigPictureElement.classList.add('hidden');
      removeEventForClosingModalWindow(handleClose);
    }
  };
  addEventForClosingModalWindow(handleClose);
};

// Показывает комментарии
const showComments = (postElement) => {
  const comments = postElement.comments;
  const commentsLength = comments.length;
  numberCommentsToShow += MINIMUM_COMMENTS;

  const currentCommentsLength = numberCommentsToShow <= commentsLength ? numberCommentsToShow : commentsLength;
  commentsLoader.classList.toggle('hidden', numberCommentsToShow >= commentsLength);
  socialCommentCount.firstChild.nodeValue = `${currentCommentsLength} из `;

  for (let i = 0; i < currentCommentsLength; i++) {
    selectedComments.push(comments[i]);
  }

  const fragment = generatingFragmentComments(selectedComments);
  selectedComments.splice(0, selectedComments.length);
  socialComments.innerHTML = '';
  socialComments.append(fragment);
};

// Добавляет события для отображения комментариев
const addEventToShowComments = (postElement) => {
  const addEvent = (event) => {
    showComments(postElement);
    if (isCloseModalWindow(event)) {
      commentsLoader.removeEventListener('click', addEvent);
      removeEventForClosingModalWindow(addEvent);
    }
  };
  commentsLoader.addEventListener('click', addEvent);
  addEventForClosingModalWindow(addEvent);
};

// Показывает пост в модальном окне
export const showPost = (posts) => {
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
      showComments(postElement);
      addEventToShowComments(postElement);
      closeModalWindow();
    }
  });
};
