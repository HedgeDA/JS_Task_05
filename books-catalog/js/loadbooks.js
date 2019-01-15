let content;

var xhr = new XMLHttpRequest();
xhr.addEventListener("load", onLoad);

function onLoad() {
  if (xhr.status !== 200) {
    return;
  }

  try {
    var books = JSON.parse(xhr.responseText);
  } catch (error) {
    return;
  }

  content.innerHTML = books.reduce((innerHTML, item) => {
    return innerHTML +
      `<li\ 
        data-title='${item.title}'\
        data-author=${item.author.name}\
        data-info='${item.info}'\
        data-price=${item.price}>=
        <img src=${item.cover.small}>\
      </li>`
  }, '')
}

function init() {
  content = document.getElementById('content');
  content.innerHTML = '<p>Загрузка...</p>';

  xhr.open("GET", 'https://neto-api.herokuapp.com/book/', true);
  xhr.send();
}

document.addEventListener('DOMContentLoaded', init);