import {generateFragmentComments, generatePost} from './post-generator.js';
import {addEventForClosingModalWindow, isClickOrEscEvent, removeEventForClosingModalWindow} from './util.js';
import {photoHandler} from './form-handler.js';


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


// Переключает режимы для отображения картинки
const toggleModalToBigPicture = () => bigPictureElement.classList.toggle('hidden');

// Переключает режимы отображения модального окна
const toggleDisplayModesModal = () => body.classList.toggle('modal-open');

// Добавляет событие для закрытия модального окна просмотра поста по клику или Esc
const addEventCloseModalWindow = () => {
  const callback = (event) => {
    if (isClickOrEscEvent(event, 'id', 'picture-cancel')) {
      numberCommentsToShow = 0;
      toggleModalToBigPicture();
      removeEventForClosingModalWindow(bigPictureCancel, callback);
    }
  };
  addEventForClosingModalWindow(bigPictureCancel, callback);
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

  const fragment = generateFragmentComments(selectedComments);
  selectedComments.splice(0, selectedComments.length);
  socialComments.innerHTML = '';
  socialComments.append(fragment);
};

// Добавляет события для отображения комментариев
const addEventToShowComments = (postElement) => {
  const callback = (event) => {
    showComments(postElement);
    if (isClickOrEscEvent(event, 'id', 'picture-cancel')) {
      commentsLoader.removeEventListener('click', callback);
      removeEventForClosingModalWindow(bigPictureCancel, callback);
      toggleDisplayModesModal();
    }
  };
  commentsLoader.addEventListener('click', callback);
  addEventForClosingModalWindow(bigPictureCancel, callback);
};

// Показывает пост в модальном окне
export const showPostToModalWindow = (posts) => {
  container.addEventListener('click', (event) => {
    const dataId = event.target.closest('[data-thumbnail-id]');
    if (!dataId) {
      return;
    }

    const postElement = posts.find((post) => post.id === parseInt(dataId.dataset.thumbnailId, 10));
    if (postElement) {
      toggleModalToBigPicture();
      toggleDisplayModesModal();
      generatePost(postElement);
      showComments(postElement);
      addEventToShowComments(postElement);
      addEventCloseModalWindow();
    }
  });
  photoHandler();
};
