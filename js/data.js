import {generateNumber} from './util.js';
import {getData} from './remote-data.js';

//Количество объектов изображений
const PICTURES_COUNT = 25;

// Функция создания комментариев
const renderComments = (user) => user.comments
  .filter((item) => !!item)
  .map((item) => ({
    id: item.id,
    avatar: item.avatar,
    message: item.message,
    name: item.name,
  }));

//Получить id
const getId = generateNumber();

// Получить список юзеров
const getUsers = await getData();

// Получить юзера по id
const getUserById = () => getUsers[getId()];

//Функция создания поста
const renderPost = () => {
  const user = getUserById();
  return {
    id: user.id,
    url: user.url,
    description: user.description,
    likes: user.likes,
    comments: renderComments(user)
  };
};

//Получить объекты изображений
export const getPosts = () => Array.from({length: PICTURES_COUNT}, () => renderPost());
