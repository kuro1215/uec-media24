import { SwitchHeaderWidth } from './constants.js';

const menuButton = document.getElementById('menu-button');
const headNav = document.getElementById('head-nav');
var headNavOpen = false;

window.addEventListener('load', OnLoad);
window.addEventListener('resize', OnResize);

function OnLoad() {
  headNavOpen = window.innerWidth > SwitchHeaderWidth;
  document.getElementById('menu-button').addEventListener('click', () => {
    headNav.style.display = headNavOpen ? 'none' : 'flex';
    headNavOpen = !headNavOpen;
  });
}

function OnResize() {
  if (window.innerWidth > SwitchHeaderWidth) {
    headNav.style.display = 'flex';
    headNavOpen = true;
  } else {
    headNav.style.display = 'none';
    headNavOpen = false;
  }
}