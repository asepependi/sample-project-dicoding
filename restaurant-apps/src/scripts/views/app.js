import routes from '../routes/routes';
import urlParser from '../routes/url-parser';

class App {
  constructor({ content, drawer, menu }) {
    this.content = content;
    this.drawer = drawer;
    this.menu = menu;

    this.init();
  }

  init() {
    this.menu.addEventListener('click', (e) => {
      e.stopPropagation();
      this.drawer.classList.toggle('active');
    });
    this.content.addEventListener('click', () => {
      this.drawer.classList.remove('active');
    });
  }

  async renderPage() {
    const url = urlParser.parseUrlWithCombiner();
    const page = routes[url];
    this.content.innerHTML = await page.render();
    await page.afterRender();
  }
}

export default App;
