import 'regenerator-runtime';
import '../styles/main.css';
import '../styles/responsive.css';
import App from './views/app';

const app = new App({
  content: document.querySelector('#main-content'),
  drawer: document.querySelector('.nav ul'),
  menu: document.querySelector('.menu-toggle'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
});

window.addEventListener('scroll', () => {
  const menu = document.querySelector('.menu');
  if (window.scrollY > 100) {
    menu.classList.add('fixed-menu');
  } else {
    menu.classList.remove('fixed-menu');
  }
});
