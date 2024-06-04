import FavoriteRest from '../data/favorite-rest-idb';
import { likeBtn, likedBtn } from '../views/template-favorite';

const likeInitiator = {
  async init({ likeBtnContainer, data }) {
    this.likeBtnContainer = likeBtnContainer;
    this.data = data;

    await this.renderBtn();
  },

  async renderBtn() {
    const { id } = this.data;
    if (await this.isDataExist(id)) {
      this.renderLiked();
    } else {
      this.renderLike();
    }
  },

  async isDataExist(id) {
    const data = await FavoriteRest.getFavorite(id);
    return !!data;
  },

  renderLike() {
    this.likeBtnContainer.innerHTML = likeBtn();

    const likeButton = document.querySelector('#likeBtn');
    likeButton.addEventListener('click', async () => {
      await FavoriteRest.createData(this.data);
      this.renderBtn();
    });
  },

  renderLiked() {
    this.likeBtnContainer.innerHTML = likedBtn();

    const likeButton = document.querySelector('#likedBtn');
    likeButton.addEventListener('click', async () => {
      await FavoriteRest.deleteData(this.data.id);
      this.renderBtn();
    });
  },
};

export default likeInitiator;
