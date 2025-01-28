/* Properties */
const LoaderFadeinDuration = 400;
const NewsDisplayCount = 5;

const loader = document.getElementById('loader');
const header = document.getElementsByTagName('header')[0];
var isEnabledLoader = true;

document.addEventListener('DOMContentLoaded', OnDOMContentLoaded);
window.addEventListener('load', OnLoad);

function OnDOMContentLoaded() {
  	fetch('./data/news.json')
		.then(response => response.json())
		.then(data => {
			const dataLength = data.length;
			if ((dataLength === 0) || (dataLength === undefined)) return;

			const news = document.getElementById('news').getElementsByTagName('div')[0];
			news.innerHTML = '';

			const loop = dataLength > NewsDisplayCount ? NewsDisplayCount : dataLength;
			for (let i = 0; i < loop; i++) {
			const item = data[i];
			const container = document.createElement('div');
			container.classList.add('news-content');

			const dateElem = document.createElement('div');
			dateElem.classList.add('flex-initial');
			dateElem.innerText = item.date;
			container.appendChild(dateElem);

			const contentElem = document.createElement('div');
			contentElem.innerText = item.content;
			container.appendChild(contentElem);

			if (item.link) {
				const linkElem = document.createElement('a');
				linkElem.href = item.link;

				const linkContentElem = document.createElement('span');
				linkContentElem.innerText = '詳細はこちら';
				linkElem.appendChild(linkContentElem);

				contentElem.appendChild(linkElem);
			}

			news.appendChild(container);
			}
		});

	try {
		if (window.sessionStorage.getItem('loader')) {
			header.style.opacity = 1;
			loader.style.display = 'none';
			isEnabledLoader = false;
		} else {
			loader.style.opacity = 1;
			window.sessionStorage.setItem('loader', 'true');
		}
	} catch (e) { }
}

function OnLoad() {
	const targets = document.querySelectorAll('.fadein');
	const fadeinThreshold = window.innerHeight * 0.8;
	window.addEventListener('scroll', () => {
		targets.forEach(target => {
			const rect = target.getBoundingClientRect();

			if (rect.top < fadeinThreshold) {
				target.classList.add('is-active');
			}
		});
	});
	if (isEnabledLoader) InitLoader();
}
function InitLoader() {
	const animation = [
		{ opacity: 0 },
		{ opacity: 1 }
	];
	const animationOptions = {
		duration: LoaderFadeinDuration,
		fill: 'forwards',
		easing: 'ease-in-out'
	};

	var imgs = Array.from(loader.getElementsByTagName('img'));
	for (let i = 0; i < imgs.length; i++) {
		const j = Math.floor(Math.random() * (imgs.length - i)) + i;
		[imgs[i], imgs[j]] = [imgs[j], imgs[i]];
		imgs[i].animate(animation, { ...animationOptions, delay: LoaderFadeinDuration * (i + 0.5) });
	}

	const loaderHideMsec = LoaderFadeinDuration * imgs.length + 1600;
	loader.animate(
		animation,
		{ ...animationOptions, delay: loaderHideMsec, direction: 'reverse' }
	).onfinish = () => { loader.style.display = 'none'; };

	header.animate(animation, { ...animationOptions, delay: loaderHideMsec });
}