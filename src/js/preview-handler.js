import { thumbnails } from './previews';

const DUMMY_IMG = 'https://fakeimg.pl/350x200/?text=N/A&font=lobster';

// creating preview panel
const thumbnailsPanel = document.querySelector('.thumbnails-panel');
const imgTemplate = document.querySelector('#imgPreview').content;
const vidTemplate = document.querySelector('#vidPreview').content;
const bigPicWrapper = document.querySelector('.album__fullsize-img-wrapper');
const bigVidWrapper = document.querySelector('.album__fullsize-vid-wrapper');

Object.keys(thumbnails).forEach((key) => {
	if (thumbnails[key].type === 'img') {
		createThumb(imgTemplate.cloneNode(true), thumbnails[key].url, key);
	} else if (thumbnails[key].type === 'vid') {
		createThumb(vidTemplate.cloneNode(true), thumbnails[key].url, key);
	} else {
		console.log(`>>> ${thumbnails[key].type} : Wrong type for id '${key}'. Must be either 'img' or 'vid'`);
		createThumb(imgTemplate.cloneNode(true), DUMMY_IMG, key);
	}
});

/**/
// Вешаем события по клику на превьюшки
// Ищем все созданные выше преывьюшки
const allThumbs = document.querySelectorAll('.thumbnails-panel__thumbnail-wrapper');

allThumbs.forEach(function (thumb) {
	const id = thumb.querySelector('.thumbnails-panel__thumbnail').id;
	const src = thumbnails[id].url;
	const type = thumbnails[id].type;
	const desc = thumbnails[id].desc;

	let bigPicSrc = document.querySelector('.album__big-pic-source');
	let bigVidSrc = document.querySelector('.album__big-vid-source');
	let bigPicDesc = document.querySelector('.album__fullsize-description');

	thumb.addEventListener('click', function () {
		if (type === 'img') {
			attachSrcTo(bigPicSrc, src);
			blockShow(bigPicWrapper);
			blockHide(bigVidWrapper);
		} else if (type === 'vid') {
			attachSrcTo(bigVidSrc, src);
			blockShow(bigVidWrapper);
			blockHide(bigPicWrapper);
		}
		attachDescription(bigPicDesc, desc);
	});
});

/**/
function blockHide(block) {
	block.classList.add('album--hidden');
}

function blockShow(block) {
	block.classList.remove('album--hidden');
}

function attachSrcTo(block, source) {
	block.src = source;
}

function attachIDTo(block, id) {
	block.id = id;
}

function attachDescription(block, desc) {
	block.textContent = desc;
}

function createThumb(thumb, src, id) {
	let thumbSrc = thumb.querySelector('.album__thumbnail-source');
	let thumbId = thumb.querySelector('.thumbnails-panel__thumbnail');
	attachSrcTo(thumbSrc, src);
	attachIDTo(thumbId, id);
	thumbnailsPanel.appendChild(thumb);
}
