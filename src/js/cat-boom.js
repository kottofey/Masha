const cat = document.querySelector('.menu__cat');
const title = document.querySelector('.page-title');
const album = document.querySelector('.album');
const wrapper = document.querySelector('.page-wrapper');
let catWidth = 80;

title.onclick = function () {
	catWidth += 40;
	cat.style.width = catWidth + 'px';
	cat.style.backgroundSize = catWidth + 'px 110px';

	if (cat.offsetWidth > 300) {
		wrapper.classList.add('boom');
		cat.style.display = 'none';
		album.style.zIndex = -1;
	}
};
