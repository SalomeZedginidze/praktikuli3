const CartRow = ({ product, setAddedProducts }) => {
  const { id, name, price, imgUrl } = product;

  const removeItem = (id) => {
    let cartItems = JSON.parse(localStorage.getItem("cart") || {});
    setAddedProducts((prev) => {
      const newData = prev.data.filter((item) => item.id !== id);
      if (cartItems.hasOwnProperty(id)) {
        delete cartItems[id];
        localStorage.setItem("cart", JSON.stringify(cartItems));
      }

      return {
        data: newData,
        loading: false,
      };
    });
  };
  return (
    <>
      <tr key={`product-${id}`}>
        <td className="prod-img ">
          <img className="resp-img" src={imgUrl} alt={name} />
        </td>
        <td>{name}</td>
        <td>{price}</td>
        <td>{JSON.parse(localStorage.getItem("cart"))[product.id]}</td>
        <td>{price * JSON.parse(localStorage.getItem("cart"))[product.id]}</td>
        <td>
          <button onClick={() => removeItem(product.id)}>Remove</button>
        </td>
      </tr>
    </>
  );
};

export default CartRow;
