import {getPosts} from './data.js';
import {renderingThumbnails} from './thumbnail.js';
import {showPost} from './post-viewer.js';

// Массив постов
const posts = getPosts();

// Создает и выводит миниатюры
renderingThumbnails(posts);

// Показывает пост по клику в модальном окне
showPost(posts);
