import {getPosts} from './data.js';
import {renderingThumbnails} from './thumbnail.js';
import {showPost} from './post-viewer.js';
import {photoHandler} from './form-handler.js';
import {validateFields} from './form-validator.js';


// Массив постов
const posts = getPosts();

// Создает и выводит миниатюры
renderingThumbnails(posts);

// Показывает пост по клику в модальном окне
showPost(posts);

// Отвечает за обработчик фотографий
photoHandler();

// Отвечает за валидацию полей в форме
validateFields();
