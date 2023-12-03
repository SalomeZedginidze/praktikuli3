import { useEffect, useState } from "react";

const useSetProducts = (id) => {
  const [data, setData] = useState({ data: id ? {} : [], loading: true });

  useEffect(() => {
    fetch(`http://localhost:3001/products/${id ? id : ""}`)
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error();
      })
      .then((res) => {
        setData({ data: res, loading: false });
      })
      .catch((_) => {
        setData({ data: id ? {} : [], loading: false });
      });
  }, [id]);

  return data;
};

export default useSetProducts;
