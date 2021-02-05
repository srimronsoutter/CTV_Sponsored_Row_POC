import React from "react";
import { SPON_IMG_RATIO, SPON_IMG_SRC } from "./constants";

export const SponsoredImage = ({ sImgH, sImgStyle }) => {
  return (
    <div className="SponsoredImage" style={sImgStyle}>
      <img src={SPON_IMG_SRC} alt="" />
    </div>
  );
};
