window.addEventListener('DOMContentLoaded', OnDOMContentLoaded);

function OnDOMContentLoaded() {
    const headNav = document.getElementById('head-nav');
    headNav.classList.add('nav-close');
    document.getElementById('menu-button').addEventListener('click', () => toggleNav(headNav));

    const boxes = headNav.getElementsByClassName('nav-box');
    for (let i = 0; i < boxes.length; i++) {
        const subs = boxes[i].getElementsByClassName('nav-sub');
        if (subs.length > 0) {
            subs[0].classList.add('nav-close');
            boxes[i].addEventListener('click', () => toggleNav(subs[0]));
        }
    }
}
function toggleNav(target) {
    target.classList.toggle('nav-close');
}