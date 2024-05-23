import {debounce, initializeTemplateWithData} from './util.js';
import {getPosts} from './data.js';
import {showPostToModalWindow} from './post-viewer.js';


const filterButtons = document.querySelectorAll('.img-filters__button');
const filterForm = document.querySelector('.img-filters__form');

const NUMBER_RANDOM_POSTS = 10;

const Filter = {
  'RANDOM': 'filter-random',
  'DISCUSSED': 'filter-discussed'
};


let DEFAULT_POSTS = [];

// Отобразить изображения в виде галереи
const renderGallery = (data) => {
  const picturesContainer = document.querySelector('.pictures');
  const pictures = document.querySelectorAll('.picture');
  const template = document.querySelector('#picture').content.querySelector('.picture');
  const fragment = document.createDocumentFragment();
  pictures.forEach((item) => item.remove());
  data.forEach((post) => fragment.append(initializeTemplateWithData(post, template)));
  picturesContainer.append(fragment);
};

// Получить 10 случайных постов
const getRandomPosts = () => {
  const uniqueElements = new Set();
  while (uniqueElements.size < NUMBER_RANDOM_POSTS) {
    const randomIndex = Math.floor(Math.random() * DEFAULT_POSTS.length);
    uniqueElements.add(DEFAULT_POSTS[randomIndex]);
  }
  return Array.from(uniqueElements);
};

// Получить отсортированные посты по комментариям
const getSortPostsByComments = () =>
  [...DEFAULT_POSTS].filter((item) => item && (item.comments !== undefined && item.comments !== null))
    .sort((first, second) => second.comments.length - first.comments.length);

// Получить отсортированные посты
const getSortedPosts = (event) => {
  if (event.target.classList.contains('img-filters__button')) {
    filterButtons.forEach((button) => button.classList.remove('img-filters__button--active'));
    event.target.classList.add('img-filters__button--active');
    const attribute = event.target.getAttribute('id');
    switch (attribute) {
      case Filter.RANDOM :
        return getRandomPosts();
      case Filter.DISCUSSED :
        return getSortPostsByComments();
      default :
        return DEFAULT_POSTS;
    }
  }
};

// Создаем debounce только один раз вне функции listenerToSorting
const debounceRenderGallery = debounce(renderGallery);

// Слушатель сортировки
const listenerToSorting = (event) => {
  debounceRenderGallery(getSortedPosts(event));
};

// Добавляет событие на сортировку
const addEventForSorting = () => filterForm.addEventListener('click', listenerToSorting);

// Рендеринг миниатюр и модального окна
const renderingThumbnails = () => {
  DEFAULT_POSTS = [...getPosts()];
  renderGallery(DEFAULT_POSTS);
  showPostToModalWindow(DEFAULT_POSTS);
  addEventForSorting();
};

// Точка старта приложения
export const startApp = () => {
  renderingThumbnails();
};
