import RestAPI from '../data/api';
import config from '../globals/config';

const Home = {
  async render() {
    return `
      <section class="jumbotron" tabindex="0">
        <div class="content">
          <h2 tabindex="0">Selamat Datang di Katalog Restoran</h2>
          <a href="#list-resto" tabindex="0" class="explore-rest">Explore Restoran</a>
        </div>
      </section>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="jumbotron-svg">
        <path fill="#000000" fill-opacity="1" d="M0,224L120,186.7C240,149,480,75,720,74.7C960,75,1200,149,1320,186.7L1440,224L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path>
      </svg>
      <div class="text-center" tabindex="0">
        <h2>List Daftar Restoran</h2>
      </div>
      <div class="list-resto">
      
      </div>
    `;
  },

  async afterRender() {
    const restoList = await RestAPI.getData();
    let list = '';
    restoList.forEach((item) => {
      list += `
        <a href="/#/resto-detail/${item.id}">
          <div class="menu-item" tabindex="0">
            <img src="${config.BASE_IMG_URL + item.pictureId}" alt="${item.name}">
            <div class="info">
              <h3>${item.name}</h3>
              <p>${item.city}</p>
              <p>Rating: ${item.rating}</p>
            </div>
          </div>
        </a>
      `;
    });

    document.querySelector('.list-resto').innerHTML = list;
  },
};

export default Home;
