import React from "react";
import axios from "axios";
import { API_URL } from "../Supports/helper";

const ManageProducts = () => {
  // useState : untuk menyimpan data state pada functional component
  const [products, setProducts] = React.useState([]);
  const [activePage, setActivePage] = React.useState(1);

  const getProducts = () => {
    axios
      .get(API_URL + "/products")
      .then((response) => {
        setProducts(response.data); // menyimpan data kedalam state
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // useEffect : digunakan untuk menggantikan componentDidMount/componentDidUpdate
  React.useEffect(() => {
    getProducts();
  }, []);

  const printProducts = () => {
    console.log(products);
    return products
      .slice(
        activePage > 1 ? (activePage - 1) * 8 : activePage - 1,
        activePage * 8
      )
      .map((item, index) => {
        return (
          <tr>
            <td>
              <th>
                {activePage > 1 ? (activePage - 1) * 8 + index + 1 : index + 1}
              </th>
            </td>
            <td style={{ width: "25%", textAlign: "center" }}>
              <img src={item.images[0]} width="30%" alt={item.name + index} />
            </td>
            <td>{item.name}</td>
            <td>{item.weight} gram</td>
            <td>{item.category}</td>
            <td>Rp. {item.price.toLocaleString()}</td>
            <td>
              <button className="btn btn-warning">Edit</button>
              <button className="btn btn-danger">Delete</button>
            </td>
          </tr>
        );
      });
  };

  const printBtPagination = () => {
    // 1-8 data => 1 button
    // 9-16 data => 2 button
    // 17-24 data => 3 button
    let btn = [];
    for (let i = 0; i < Math.ceil(products.length / 8); i++) {
      btn.push(
        <button
          className={`btn ${
            activePage == i + 1 ? "btn-info" : "btn-outline-info"
          }`}
          disabled={activePage == i + 1 ? true : false}
          onClick={() => setActivePage(i + 1)}
        >
          {i + 1}
        </button>
      );
    }
    return btn;
  };
  return (
    <div className="container">
      <h2>Manage Products</h2>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Name</th>
            <th>Weight</th>
            <th>Category</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{printProducts()}</tbody>
      </table>
      <div className="text-center">{printBtPagination()}</div>
    </div>
  );
};
export default ManageProducts;
