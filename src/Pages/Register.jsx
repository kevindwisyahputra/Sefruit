import axios from "axios";
import React from "react";
import EmailValidator from "./../Supports/Functions/EmailValidator";
import PhoneValidator from "./../Supports/Functions/PhoneValidator";
import { API_URL } from "../Supports/helper";
import { loginAction } from "../Redux/Actions/UserAction";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
class Register extends React.Component {
  state = {
    error: null,
    phoneNumber: null,
    email: null,
    redirect: false,
    visible: {
      type: "password",
      title: "Show",
    },
  };

  // r
  onValidation = () => {
    let inputEmailOrPhone = this.refs.inputEmail.value; // r -> ryan.fandy@gmail.com

    if (inputEmailOrPhone) {
      if (!inputEmailOrPhone.includes("@")) {
        // Apabila Index Ke-0 Aalah Number
        // Validasi Phone Number
        let resultPhoneValidator = PhoneValidator(inputEmailOrPhone);

        if (resultPhoneValidator === true) {
          this.setState({ phoneNumber: inputEmailOrPhone, error: null });
        } else {
          this.setState({ error: resultPhoneValidator });
        }
      } else {
        // Validasi Email
        let resultEmailValidator = EmailValidator(inputEmailOrPhone); // r -> ryan.fandy@gmail.com

        if (resultEmailValidator === true) {
          this.setState({ email: inputEmailOrPhone, error: null });
        } else {
          this.setState({ error: "Email Tidak Sesuai!" });
        }
      }
    } else {
      this.setState({ error: "Isi Semua Data" });
    }
  };

  // cara 1 with promisify then catch in axios
  handleRegister = () => {
    axios
      .get(API_URL + `/users?email=${this.refs.inputEmail.value}`)
      .then((res) => {
        if (res.data.length == 0) {
          // axios post
          axios
            .post(API_URL + `/users`, {
              username: this.refs.inputUsername.value,
              email: this.refs.inputEmail.value,
              password: this.refs.inPassword.value,
              role: "User",
              status: "Active",
              cart: [],
            })
            .then((res) => {
              console.log("Response register", res.data);
              localStorage.setItem("tokenId", res.data.id);
              this.props.loginAction(res.data);
              this.setState({ redirect: true });
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          this.setState({ error: "Email exist ⚠️`" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // cara 2 with promisify try catch in axios with async await
  handleRegisterAsync = async () => {
    try {
      // 1. pengambilan data berdasarkan email
      let resGet = await axios.get(
        API_URL + `/users?email=${this.refs.inputEmail.value}`
      );
      // 2. jika data tidak ada, maka kita lanjut registrasi
      if (resGet.data.length == 0) {
        // axios post
        let resPost = await axios.post(API_URL + `/users`, {
          username: this.refs.inputUsername.value,
          email: this.refs.inputEmail.value,
          password: this.refs.inPassword.value,
          role: "User",
          status: "Active",
          cart: [],
        });

        console.log("Response register", resPost.data);
        if (resPost.data.id) {
          localStorage.setItem("tokenId", resPost.data.id);
          this.props.loginAction(resPost.data);
          this.setState({ redirect: true });
        }
      } else {
        // 2. jika data ada, maka muncukl alert
        this.setState({ error: "Email exist ⚠️" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleVisible = () => {
    if (this.state.visible.type == "password") {
      this.setState({
        visible: {
          type: "text",
          title: "Hide",
        },
      });
    } else {
      this.setState({
        visible: {
          type: "password",
          title: "Show",
        },
      });
    }
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to="/" />;
    }
    return (
      <div className="container">
        <div className="row align-items-center mx-5 my-5 border border-grey">
          <div className="col-6">
            <img
              src="https://image.winudf.com/v2/image/Y29tLmVsZW5zd2VldG1vb2QxMi5mcnVpdHNuY2hvY29sYXRlX3NjcmVlbl8xXzE1Mzc4NzU1NDJfMDU1/screen-1.jpg?fakeurl=1&type=.webp"
              alt="portal"
              width="80%"
            />
          </div>
          <div className="col-6">
            <div className="mt-3">
              <h2>Register</h2>
            </div>
            <div className="mt-3">
              <input
                type="text"
                ref="inputUsername"
                placeholder="Enter Username"
                className="form-control"
              />
            </div>
            <div className="mt-3">
              <input
                type="text"
                ref="inputEmail"
                placeholder="Enter Your Email or Phone Number"
                className="form-control"
                onChange={this.onValidation}
              />
            </div>
            <div className="mt-3">
              <div className="input-group">
                <input
                  type={this.state.visible.type}
                  ref="inPassword"
                  placeholder="Enter Your Password"
                  className="form-control"
                />
                <span className="input-group-text" onClick={this.handleVisible}>
                  {this.state.visible.title}
                </span>
              </div>
            </div>
            <div className="mt-3">
              <div className="input-group">
                <input
                  type="password"
                  ref="inConfPassword"
                  placeholder="Enter Confirmation Password"
                  className="form-control"
                />
                <span className="input-group-text">Show</span>
              </div>
            </div>
            <div className="mt-3">
              {/* <input type="button" value="Register" className='btn sefruit-bg-secondary-light sefruit-main-light mb-3' /> */}
              <button
                className="btn btn-light"
                onClick={this.handleRegisterAsync}
              >
                Register
              </button>
            </div>
            <div>
              <h6 className="sefruit-danger">{this.state.error}</h6>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { loginAction })(Register);
