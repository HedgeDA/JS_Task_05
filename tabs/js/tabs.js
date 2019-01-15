var content;
var preloader;

var xhr = new XMLHttpRequest();
xhr.addEventListener("loadstart", onLoadStart);
xhr.addEventListener("loadend", onLoadEnd);

function tabClick(event) {
  event.preventDefault();
  if (event.target.tagName !== 'A') {
    return
  }

  for (let tab of event.target.parentElement.getElementsByTagName('a')) {
    tab.classList.remove('active');
  };

  event.target.classList.add('active');

  xhr.abort();
  xhr.open("GET", event.target.href, true);
  xhr.send();
}

function onLoadStart() {
  preloader.classList.remove('hidden')
}

function onLoadEnd() {
  preloader.classList.add('hidden')
  if (xhr.status === 200) {
    content.innerHTML = xhr.responseText;
  } else {
    content.innerHTML = '';
  }
}

function init() {
  content = document.getElementById('content');
  preloader = document.getElementById('preloader');

  for (let tab of document.querySelector('.tabs').getElementsByTagName('a')) {
    tab.addEventListener('click', tabClick)

    if (tab.classList.contains('active')) {
      xhr.open("GET", tab.href, true);
      xhr.send();
    }
  };
}

document.addEventListener('DOMContentLoaded', init);