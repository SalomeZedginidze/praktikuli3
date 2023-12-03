import { useEffect, useState } from "react";
import "./cartPage.css";
import CartRow from "../CartRow";

const CartPage = () => {
  const [addedProducts, setAddedProducts] = useState({
    data: [],
    loading: true,
  });
  const [total, setTotal] = useState(0);

  useEffect(() => {
    countTotalPrice(addedProducts.data);
  }, [addedProducts.data]);

  const countTotalPrice = (addedItems) => {
    let quantityArr = JSON.parse(localStorage.getItem("cart"));

    let contedValue = addedItems.reduce(
      (prev, acc) => prev + acc.price * quantityArr[acc.id],
      0
    );
    setTotal(contedValue);
  };

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((res) => {
        const cartAssoc = JSON.parse(localStorage.getItem("cart")) || {};
        const addedItems = res.filter((product) => cartAssoc[product.id]);
        setAddedProducts({ data: addedItems, loading: false });
        countTotalPrice(addedItems);
      });
  }, []);

  /* რეალურ პროექტში ყველა პროდუქტს არ მოვითხოვთ სერვერიდან,
  სერვერზე POST მეთოდით უნდა გაიგზავნოს პროდუქტების id - ბის მასივი და backend-სგან ვიღებთ ამ id - ბის შესაბამის პროდუქტების სიას.
  უბრალოდ json სერვერი არ გვაძლევს ამის შესაძლებლობას
  */

  if (addedProducts.loading) return "...loading";

  if (!addedProducts.data.length && !addedProducts.loading)
    return "No Items added";

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>name</th>
            <th>price</th>
            <th>quantity</th>
            <th>total price</th>
          </tr>
        </thead>
        <tbody>
          {addedProducts.data.map((product) => (
            <CartRow
              product={product}
              key={product.id}
              setAddedProducts={setAddedProducts}
            />
          ))}
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ fontSize: "20px", fontWeight: 700 }}>{total}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CartPage;
