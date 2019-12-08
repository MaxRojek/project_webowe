import React from "react";

import "./Pizzas.css";

function Pizzas() {
  return (
    <div>
      <div class="flex-container">
        <div>
          <p>
            <a
              class="btn btn-primary"
              data-toggle="collapse"
              href="#collapseExample"
              role="button"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              Link with href
            </a>
          </p>
        </div>
        <div>2</div>
        <div>3</div>
      </div>
      <div class="collapse" id="collapseExample">
        <div class="card card-body">
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim
          keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
        </div>
      </div>
    </div>
  );
}

export default Pizzas;
