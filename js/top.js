import { NewsDisplayCount } from './constants.js';

const loader = document.getElementById('loader');

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
}