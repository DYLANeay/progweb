'use strict';

import user from './data.js';

//partie 1
console.log(
  `Cher ${user.firstName.trim()} ${user.lastName.replace(
    '$',
    'S'
  )}, bienvenue dans votre dashboard!`
);

console.log(`Vous aurez ${+user.age.slice(0, 3) + 1} ans l'année prochaine`);

//partie 2

(function () {
  const now = Date.now();

  const diff = new Date(user.nextTourDate - now);

  const days = diff / (1000 * 60 * 60 * 24);
  const hours = diff.getHours();
  const minutes = diff.getMinutes();
  const seconds = diff.getSeconds();
  console.log(
    `Prochain concert dans ${days} ${
      days === 1 ? ' jour' : 'jours'
    }, ${hours} heures, ${minutes} minutes et ${seconds} secondes`
  );
})();

//partie 3
const sortByYear = [...user.albums].sort((a, b) => b.year - a.year);
const sortByRym = [...user.albums].sort((a, b) => b.rymScore - a.rymScore);
const sortByTitle = [...user.albums].sort((a, b) =>
  a.title.localeCompare(b.title)
);

console.log(sortByYear);
console.log(sortByRym);
console.log(sortByTitle);

//ui for fun
const listEl = document.getElementById('albums-list');

function renderAlbums(albums) {
  if (!listEl) return;
  listEl.innerHTML = albums
    .map(
      (album) =>
        `<li>${album.title} — ${album.year} — RYM: ${album.rymScore}</li>`
    )
    .join('');
}

renderAlbums(user.albums);

const btnRym = document.getElementById('sortByRym');
const btnYear = document.getElementById('sortByYear');
const btnTitle = document.getElementById('sortByTitle');

btnRym.addEventListener('click', () => {
  renderAlbums(sortByRym);
});

btnYear.addEventListener('click', () => {
  renderAlbums(sortByYear);
});

btnTitle.addEventListener('click', () => {
  renderAlbums(sortByTitle);
});
