import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

class Footer extends React.Component {
  render() {
    return (
      <div
        className="container-fluid"
        style={{ position: "absolute", bottom: "0px" }}
      >
        <div className="row" style={{ height: "75px" }}>
          <div className="col-6 align-self-center">
            <span className="ml-5">Betingelser og vilkår</span>
            <span className="ml-3">Cookies</span>
          </div>
          <div className="col-1">
            <div className="row justify-content-center align-items-center sefruit-bg-dark-grey h-100">
              <FontAwesomeIcon
                icon={faArrowUp}
                className="sefruit-font-size-20"
              />
            </div>
          </div>
          <div className="col-5 align-self-center text-right">
            <span className="mr-5">
              Vi modtager følgende betalingsmuligheder
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
