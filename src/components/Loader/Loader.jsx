import React from "react";
import Lottie from "lottie-react";
import loaderAnimation from "../../assets/mainLoading.json";
import "./loader.css"

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <Lottie animationData={loaderAnimation} loop={true} />
    </div>
  );
};

export default Loader;
