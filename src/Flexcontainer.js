import React from "react";
import "./Flexcontainer.css";

function Flexcontainer() {
  return (
    <div class="card text-center">
      <div class="card-header">Like us</div>
      <div class="card-body">
        <h5 class="card-title">Find us on facebook</h5>
        <p class="card-text">Subscribe our restaurant to know more</p>
        <a href="https://pl-pl.facebook.com/" class="btn btn-primary">
          Like !
        </a>
      </div>
    </div>
  );
}

export default Flexcontainer;
