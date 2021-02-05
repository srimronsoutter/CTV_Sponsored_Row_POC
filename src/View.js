import React, { useContext } from "react";
import { PositionContext } from "./context";

export const View = ({ view, children }) => {
  const { state } = useContext(PositionContext);
  const isActive = view.id === state.activeView;

  return (
    <div
      className="Viewport"
      id={view.id}
      style={{ display: isActive ? "block" : "none" }}
    >
      {children}
    </div>
  );
};
