const initialValue = {
  wishlist: [],
};
const wishlistStore = (state = initialValue, action) => {
  if (action.type == "ADDWISHLIST") {
    return { ...state, wishlist: state.wishlist.concat(action.payload) };
  } else if (action.type == "REMOVEWISHLIST") {
    return {
      ...state,
      wishlist: state.wishlist.filter((item) => {
        return item.id != action.payload.id;
      }),
    };
  } else {
    return state;
  }
};
export default wishlistStore;
