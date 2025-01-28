const roomSelect = document.getElementById('exhibits-list-select');
const exhibitsList = document.getElementById('exhibits-list');
const imageDescription = document.getElementById('image-description');

var exhibitsData = [];
var listedData = [];
var currentIndex = 0;

document.addEventListener('DOMContentLoaded', OnDOMContentLoaded);
window.addEventListener('load', OnLoad);

function OnDOMContentLoaded() {
    const params = new URLSearchParams(window.location.search);
    var roomParam = params.get('room');

    fetch('./data/exhibits_info.json')
        .then(response => response.json())
        .then(data => {
            exhibitsData = data;
            if (!roomParam || !(roomParam in data)) roomParam = null;

            for (let key in data) {
                const option = document.createElement('option');
                option.value = key;
                option.innerText = `第${key}展示室`;
                roomSelect.appendChild(option);

                const len = data[key].length;
                for (let i = 0; i < len; i++) {
                    const li = document.createElement('li');
                    const img = document.createElement('img');
                    img.src = data[key][i].image_url;
                    img.alt = data[key][i].name;
                    li.appendChild(img);
                    exhibitsList.appendChild(li);

                    if (!roomParam || roomParam === key)
                        listedData.push(data[key][i]);
                }
            }

            if (roomParam) roomSelect.value = roomParam;
            imageDescription.appendChild(CreateDescription(0));
        });
}

function OnLoad() {
    const prev = document.getElementById('prev-btn');
    const next = document.getElementById('next-btn');

    prev.addEventListener('click', () => exhibitsList.scrollTo({ left: exhibitsList.scrollLeft - 200, behavior: 'smooth' }));
    next.addEventListener('click', () => exhibitsList.scrollTo({ left: exhibitsList.scrollLeft + 200, behavior: 'smooth' }));
    exhibitsList.addEventListener('scroll', () => UpdateDescription());
    roomSelect.addEventListener('change', () => ChangedExhibitsRoom());
}

function ChangedExhibitsRoom() {
    const selected = document.getElementById('exhibits-list-select').value;
    if (selected === '0') {
        listedData = [];
        for (let key in exhibitsData)
            listedData = listedData.concat(exhibitsData[key]);
    } else {
        listedData = exhibitsData[selected];
    }

    exhibitsList.innerHTML = '';
    for (let i = 0; i < listedData.length; i++) {
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.src = listedData[i].image_url;
        img.alt = listedData[i].name;
        li.appendChild(img);
        exhibitsList.appendChild(li);
    }
    exhibitsList.scrollTo({ left: 0, behavior: 'smooth' });
}

function UpdateDescription() {
    const size = window.getComputedStyle(document.body).getPropertyValue('--image-size');
    const idx = Math.floor(exhibitsList.scrollLeft / Number.parseInt(size));
    if (idx < 0 || idx >= listedData.length || idx == currentIndex) return;
    imageDescription.innerHTML = '';
    imageDescription.appendChild(CreateDescription(idx));
    currentIndex = idx;
}
function CreateDescription(index) {
    const container = document.createElement('div');

    const title = document.createElement('h2');
    title.innerText = listedData[index].name;
    imageDescription.appendChild(title);

    const supplement = document.createElement('div');
    supplement.classList.add('supplement');
    const manufacturer = document.createElement('span');
    manufacturer.innerText = listedData[index].manufacturer;
    supplement.appendChild(manufacturer);
    const year = document.createElement('span');
    year.innerText = listedData[index].manufacture_year;
    supplement.appendChild(year);
    imageDescription.appendChild(supplement);

    const description = document.createElement('div');
    description.classList.add('description');
    description.innerText = listedData[index].description;
    imageDescription.appendChild(description);

    const link_div = document.createElement('div');
    link_div.classList.add('link');
    const link = document.createElement('a');
    link.href = listedData[index].detail_url;
    link.innerText = '詳細を見る';
    link_div.appendChild(link);
    imageDescription.appendChild(link_div);

    return container;
}