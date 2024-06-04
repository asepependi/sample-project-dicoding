import FavoriteRest from '../data/favorite-rest-idb';
import config from '../globals/config';

const Favorite = {
  async render() {
    return `
      <div class="text-center" tabindex="0">
        <h2>List Daftar Restoran Favorit</h2>
      </div>
      <div class="list-resto-favorite">
      
      </div>
    `;
  },

  async afterRender() {
    this.setActiveMenu('favorite');

    const resto = await FavoriteRest.getData();
    let list = '';
    if (resto.length === 0) {
      document.querySelector('.list-resto-favorite').innerHTML = 'Data Restoran Favorite tidak tersedia !';
    } else {
      resto.forEach((item) => {
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

      document.querySelector('.list-resto-favorite').innerHTML = list;
    }
  },

  setActiveMenu(menu) {
    document.querySelectorAll('#menu li a').forEach((link) => {
      link.classList.remove('active');
    });

    const activeMenu = document.querySelector(`#menu li a[data-menu="${menu}"]`);
    if (activeMenu) {
      activeMenu.classList.add('active');
    }
  },
};

export default Favorite;
