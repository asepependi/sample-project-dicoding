import RestAPI from '../data/api';
import urlParser from '../routes/url-parser';
import restoDetail from '../views/detail';

const Detail = {
  async render() {
    return `
      <div id="resto" class="resto"></div>
    `;
  },

  async afterRender() {
    const url = urlParser.parseUrl();
    const resto = await RestAPI.detail(url.id);
    const restoContainer = document.querySelector('#resto');

    restoContainer.innerHTML = restoDetail(resto);
  },
};

export default Detail;
