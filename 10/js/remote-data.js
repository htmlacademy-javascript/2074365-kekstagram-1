import {showAlert} from './util.js';

// Базовый URL
const BASE_URL = 'https://28.javascript.htmlacademy.pro/kekstagram';


// Маршруты
const Route = {
  GET_DATA: '/data',
  POST_DATA: '/'
};

// Методы эндпоинтов
const Method = {
  GET_METHOD: 'GET',
  POST_METHOD: 'POST'
};

// Сообщения об ошибках
const ErrorMessage = {
  GET_METHOD: 'При загрузке данных возникла проблема. Пожалуйста, попробуйте снова.',
  POST_METHOD: 'Во время отправки данных возникла проблема. Пожалуйста, попробуйте снова.'
};

// Загружает данные с указанного ресурса
const loadData = async (route, errorMessage, method = Method.GET_METHOD, body = null) =>
  await fetch(`${BASE_URL}${route}`, {method, body})
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error();
    })
    .catch((error) => {
      showAlert(errorMessage);
      throw error;
    });

// Получить данные
export const getData = () => loadData(Route.GET_DATA, ErrorMessage.GET_METHOD);

// Отправить данные
export const sendData = (body) => loadData(Route.POST_DATA, ErrorMessage.POST_METHOD, Method.POST_METHOD, new FormData(body));
