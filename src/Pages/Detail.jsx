import React from "react";
import axios from "axios";
import { API_URL } from "../Supports/helper";
import { connect } from "react-redux";
import { Toast, ToastHeader, ToastBody } from "reactstrap";
import { updateCart } from "../Redux/Actions/UserAction";
class DetailProduct extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    detail: {},
    mainImage: null,
    qty: 1,
    toastOpen: false,
  };

  componentDidMount() {
    this.getDetailProduct();
  }

  getDetailProduct = () => {
    console.log(window.location.search);
    axios
      .get(API_URL + `/products${window.location.search}`)
      .then((res) => {
        console.log(res.data[0].images);
        this.setState({ detail: res.data[0] });
        this.setState({ mainImage: res.data[0].images[0] });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleInc = () => {
    let temp = this.state.qty;
    temp += 1;
    this.setState({ qty: temp });
  };

  handleDec = () => {
    let temp = this.state.qty;
    temp -= 1;
    this.setState({ qty: temp });
  };

  handleBuy = () => {
    if (this.props.id) {
      // menduplikasi data dari cart reduser, untuk mendapatkan data keranjang sebelumnya
      let temp = [...this.props.cart];

      // kita cek, apakah product ada di dalam reducer?
      let idx = null;
      temp.forEach((value, index) => {
        if (this.state.detail.id === value.idProduct) {
          idx = index;
        }
      });

      if (idx !== null) {
        console.log("Masuk");
        // Apabila sudah ada, kita update qty
        temp[idx].qty = temp[idx].qty + this.state.qty;
      } else {
        // Apabila belum ada, menambahkan data cart baru kedalam temp data
        temp.push({
          idProduct: this.state.detail.id,
          name: this.state.detail.name,
          image: this.state.detail.images[0],
          qty: this.state.qty,
          price: this.state.detail.price,
        });
      }
      // memperbarui data cart pada db.json setelah data cart yg baru ditambahkan
      axios
        .patch(API_URL + `/users/${this.props.id}`, {
          cart: temp,
        })
        .then((res) => {
          console.log(res.data);
          // memperbarui data cart pada global store/redux
          this.props.updateCart(res.data.cart);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.setState({ toastOpen: !this.state.toastOpen });
    }
  };

  render() {
    let { detail, mainImage, qty, toastOpen } = this.state;
    return (
      <div className="container py-5">
        <Toast isOpen={toastOpen} style={{ position: "fixed", right: 5 }}>
          <ToastHeader
            icon="warning"
            toggle={() => this.setState({ toastOpen: !toastOpen })}
          >
            Attention ⚠️
          </ToastHeader>
          <ToastBody>Silahkan login dahulu</ToastBody>
        </Toast>
        <div className="row">
          <div className="col-md-6">
            {
              detail.images && (
                <img
                  src={mainImage}
                  alt={`sefruit-${detail.name}`}
                  width="100%"
                />
              ) // Image pertama > Image kedua
            }
          </div>
          <div className="col-md-6">
            <h2 className="fw-bold">{detail.name}</h2>
            <h5 className="fw-bold mt-4">Description</h5>
            <p>{detail.description}</p>
            <div className="d-flex">
              <div>
                <h5 className="fw-bold mt-4">Weight</h5>
                <h6 className="text-muted">{detail.weight} gram</h6>
              </div>
              <div className="mx-5">
                <h5 className="fw-bold mt-4">How many buy ?</h5>
                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-outline-warning"
                    onClick={this.handleDec}
                    disabled={this.state.qty == 1 ? true : false}
                  >
                    -
                  </button>
                  <h5 className="mx-3">{qty}</h5>
                  <button
                    className="btn btn-outline-primary"
                    onClick={this.handleInc}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <button
              className="mt-5 w-100 btn fw-bold"
              onClick={this.handleBuy}
              style={{ backgroundColor: "#54BAB9", color: "white" }}
            >
              Buy
            </button>
          </div>
          {detail.images
            ? detail.images.map((value, index) => {
                return (
                  <div className="col-md-3">
                    <img
                      src={value}
                      alt={`sefruit-${detail.name}`}
                      width="50%"
                      onClick={() => this.setState({ mainImage: value })}
                      className={
                        value === this.state.mainImage
                          ? "border border-warning"
                          : null
                      }
                    />
                  </div>
                );
              })
            : null}
        </div>
      </div>
    );
  }
}

const mapToProps = (state) => {
  return {
    id: state.userReducer.id,
    cart: state.userReducer.cart,
  };
};

export default connect(mapToProps, { updateCart })(DetailProduct);
