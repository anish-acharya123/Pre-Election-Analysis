import React from "react";
import {  Triangle } from "react-loader-spinner";

function Loader() {
  return (
    <div className=" text-clip content-center h-[70vh] flex justify-center   items-center flex-col">
      <Triangle
        visible={true}
        height="100"
        width="100"
        radius="9"
        color="#12529C"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
      <br />
      <h3>Loading...</h3>
    </div>
  );
}

export default Loader;
