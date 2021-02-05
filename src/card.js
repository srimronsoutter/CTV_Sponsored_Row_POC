import React, { memo } from "react";
import { IMG_H, IMG_W, GUTTER } from "./constants";

export const Card = memo(({ activeClass, title }) => {
  console.log("card render");
  const classList = ["Card", activeClass].filter(Boolean).join(" ");
  return (
    <div className={classList} style={{ marginRight: `${GUTTER}rem` }}>
      <img
        src={`http://placehold.it/${IMG_W * 10}x${IMG_H * 10}`}
        alt=""
        style={{ width: `${IMG_W}rem`, height: `${IMG_H}rem` }}
      />
      <p>{title}</p>
    </div>
  );
});
