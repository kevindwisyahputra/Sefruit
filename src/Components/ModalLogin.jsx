import axios from "axios";
import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { API_URL } from "../Supports/helper";

// Import untuk penggunaan redux
import { useDispatch } from "react-redux";
import { loginAction } from "../Redux/Actions/UserAction";

const ModalLogin = (props) => {
  // dispatch hooks untuk menjalankan action dari redux
  const dispatch = useDispatch();

  // Penampung data login
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [inVisible, setInVisible] = React.useState({
    type: "password",
    title: "Show",
  });

  const handleLogin = () => {
    //     console.log("Input EMAIL login ->", email)
    //     console.log("Input PASSWORD login ->", password)
    // axios.get(API_URL + `/users?email=${email}&password=${password}`)
    //     .then((res) => {
    //         console.log(res.data);
    //         // menyimpan data ke localstorage browser
    //         localStorage.setItem("tokenId", res.data[0].id);

    //         dispatch(loginAction(res.data[0])); // mengarahkan data ke reducer
    //     }).catch((err) => {
    //         console.log(err)
    //     })
    dispatch(loginAction(email, password));
    props.handleModal(); // menutup modal
  };

  const handleVisible = () => {
    if (inVisible.type == "password") {
      setInVisible({
        type: "text",
        title: "Hide",
      });
    } else {
      setInVisible({
        type: "password",
        title: "Show",
      });
    }
  };

  return (
    <Modal isOpen={props.modalOpen}>
      <ModalHeader>Login Account</ModalHeader>
      <ModalBody>
        <div>
          <label className="form-label">Email</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="form-label">Password</label>
          <div className="input-group">
            <input
              type={inVisible.type}
              className="form-control"
              onChange={(element) => setPassword(element.target.value)}
            />
            <span className="input-group-text" onClick={handleVisible}>
              {inVisible.title}
            </span>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          type="button"
          color="danger"
          outline
          onClick={props.handleModal}
        >
          Cancel
        </Button>
        <button type="button" className="btn btn-info" onClick={handleLogin}>
          Login
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalLogin;
