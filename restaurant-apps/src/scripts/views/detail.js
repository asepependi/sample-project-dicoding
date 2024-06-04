import RestAPI from '../data/api';
import config from '../globals/config';
import urlParser from '../routes/url-parser';
import likeInitiator from '../utils/like-btn-initiator';
import { likeBtn } from './template-favorite';

const Detail = {
  async render() {
    return `
      <div class="restaurant-detail">
        
      </div>
      <div id="button-container">
        
      </div>
    `;
  },

  async afterRender() {
    const url = urlParser.parseUrl();
    let dataDetail = '';
    let listMakanan = [];
    let listMinuman = [];
    let listReview = [];

    const data = await RestAPI.detail(url.id);

    data.menus.foods.forEach((item) => {
      listMakanan += `
        <li>${item.name}</li>
      `;
    });

    data.menus.drinks.forEach((item) => {
      listMinuman += `
        <li>${item.name}</li>
      `;
    });

    data.customerReviews.forEach((item) => {
      listReview += `
        <div class="review-item">
          <h4>${item.name}</h4>
          <p>${item.review}</p>
        </div>
      `;
    });

    dataDetail += `
      <div class="container">
        <div class="img-container">
          <h2 class="title">${data.name}</h2>
          <img class="img" src="${config.BASE_IMG_URL + data.pictureId}" alt="${data.name}">
        </div>
        <div class="info-container">
          <div class="info">
            <h3>Information</h3>
            <h4>Kota</h4>
            <p>${data.city}</p>
            <h4>Alamat</h4>
            <p>${data.address}</p>
          </div>
          <div class="desc">
            <h3>Description</h3>
            <p>${data.description}</p>
          </div>
        </div>
        <div class="menu-container">
          <h3>Menu</h3>
          <div class="menu-list">
            <div class="food">
              <h4>Makanan</h4>
              <ul>
                ${listMakanan}
              </ul>
            </div>
            <div class="drink">
              <h4>Minuman</h4>
              <ul>
                ${listMinuman}
              </ul>
            </div>
          </div>
        </div>
        <div class="reviews-container">
          <h3>Customer Reviews</h3>
          <div class="review-list">
            ${listReview}
          </div>
        </div>
      </div>
    `;

    document.querySelector('.restaurant-detail').innerHTML = dataDetail;
    document.querySelector('#button-container').innerHTML = likeBtn();

    likeInitiator.init({
      likeBtnContainer: document.querySelector('#button-container'),
      data: {
        id: data.id,
        name: data.name,
        description: data.description,
        rating: data.rating,
        pictureId: data.pictureId,
        city: data.city,
      },
    });
  },
};

export default Detail;
