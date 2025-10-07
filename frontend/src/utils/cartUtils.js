export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  // calcualte item price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, currentItem) => {
      return acc + currentItem.price * currentItem.qty;
    }, 0)
  );
  // calcualte shipping price - if order is over $100 is free, else $10 shipping

  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

  // calcualte tax price - 15%
  state.taxPrice = addDecimals(Number(0.15 * state.itemsPrice).toFixed(2));

  // calcualte total price
  state.totalPrice =
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice);

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
