const likeBtn = () => `
  <button aria-label="like resto" id="likeBtn" class="btn-favorite">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const likedBtn = () => `
  <button aria-label="unlike resto" id="likedBtn" class="btn-favorite">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  likeBtn,
  likedBtn,
};
