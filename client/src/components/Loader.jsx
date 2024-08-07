import React from "react";
import { Bars } from "react-loader-spinner";

function Loader() {
  return (
    <div>
      <Bars
        height="100"
        width="100"
        radius="9"
        color="rgb(0, 129, 133)"
        ariaLabel="three-dots-loading"
        wrapperStyle
        wrapperClass
      />
      <br />
      <h3>Loading...</h3>
    </div>
  );
}

export default Loader;
