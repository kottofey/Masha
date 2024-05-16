import { thumbnails } from './previes';

// creating preview panel
const thumbnailsPanel = document.querySelector('.album__thumbnails-panel');
const imgTemplate = document.querySelector('#imgPreview').content;
const vidTemplate = document.querySelector('#vidPreview').content;
let thumbSrc;

Object.keys(thumbnails).forEach(function (key) {
	let newThumb;

	if (thumbnails[key].type === 'img') {
		newThumb = imgTemplate.cloneNode(true);
	} else if (thumbnails[key].type === 'vid') {
		newThumb = vidTemplate.cloneNode(true);
	} else {
		console.log(
			'>>> ' +
				thumbnails[key].type +
				': Wrong type for id \'' +
				thumbnails[key].id +
				'\'. Must be either \'img\' or \'vid\''
		);
		newThumb = imgTemplate.cloneNode(true);
		newThumb.querySelector('.album__thumbnail-source').src =
			'https://fakeimg.pl/350x200/?text=N/A&font=lobster';
		thumbnailsPanel.appendChild(newThumb);

		return;
	}

	thumbSrc = newThumb.querySelector('.album__thumbnail-source');
	thumbSrc.src = thumbnails[key].url;
	newThumb.querySelector('.album__thumbnail').id = key;
	thumbnailsPanel.appendChild(newThumb);
});

// Looking for all thumbs
const allThumbs = document.querySelectorAll('.album__thumbnail-wrapper');

allThumbs.forEach(function (thumb) {
	const id = thumb.querySelector('.album__thumbnail').id;
	const src = thumbnails[id].url;
	const type = thumbnails[id].type;
	const desc = thumbnails[id].desc;
	const bigPicWrapper = document.querySelector('.album__fullsize-img-wrapper');
	const bigVidWrapper = document.querySelector('.album__fullsize-vid-wrapper');
	let bigPicSrc = document.querySelector('.album__big-pic-source');
	let bigVidSrc = document.querySelector('.album__big-vid-source');
	let bigPicDesc = document.querySelector('.album__fullsize-description');

	thumb.addEventListener('click', function () {
		if (type === 'img') {
			bigPicSrc.src = src;
			bigPicWrapper.classList.remove('album__fullsize-wrapper--hidden');
			bigVidWrapper.classList.add('album__fullsize-wrapper--hidden');
		} else if (type === 'vid') {
			bigVidSrc.src = src;
			bigVidWrapper.classList.remove('album__fullsize-wrapper--hidden');
			bigPicWrapper.classList.add('album__fullsize-wrapper--hidden');
		}
		bigPicDesc.textContent = desc;
	});
});
