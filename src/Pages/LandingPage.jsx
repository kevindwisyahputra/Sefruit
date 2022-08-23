import React from "react";
import { Link } from "react-router-dom";

class LandingPage extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-12 col-md-6 px-0">
          <img
            src="https://images.unsplash.com/photo-1534531173927-aeb928d54385?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8ZnJ1aXRzfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            width="100%"
            alt="fruits-image"
          />
          <Link to="/products" className="sefruit-nav-page">
            <h4>To Orange Fruits</h4>
          </Link>
        </div>
        <div className="col-12 col-md-6 px-0">
          <img
            src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZnJ1aXRzfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            width="100%"
            alt="fruits-image"
          />
          <Link to="/products" className="sefruit-nav-page">
            <h4 style={{ fontWeight: "600", paddingLeft: "20px" }}>
              To Products List
            </h4>
          </Link>
        </div>
        <div className="col-12 px-5 mb-4 px-0 mx-0">
          <h3 className="text-center px-5">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi modi
            aspernatur, quis impedit neque, ea id obcaecati nemo nam adipisci
            quam quos sunt iusto.
          </h3>
        </div>
        <div className="col-12 col-md-6 px-0 mx-0">
          <img
            src="https://images.unsplash.com/photo-1577003811926-53b288a6e5d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            width="100%"
            alt="fruits-image"
          />
          <Link to="/products" className="sefruit-nav-page">
            <h4 style={{ fontWeight: "600", paddingLeft: "20px" }}>
              To Products List
            </h4>
          </Link>
        </div>
        <div className="col-12 col-md-6 px-0 mx-0">
          <img
            src="https://images.unsplash.com/photo-1562347810-18a0d370ba36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            width="100%"
            alt="fruits-image"
          />
          <Link to="/products" className="sefruit-nav-page">
            <h4 style={{ fontWeight: "600", paddingLeft: "20px" }}>
              To Products List
            </h4>
          </Link>
        </div>
      </div>
    );
  }
}

export default LandingPage;
