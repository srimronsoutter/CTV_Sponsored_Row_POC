import React, { useContext, useEffect } from "react";
import "./styles.css";
import PositionContextProvider, { PositionContext } from "./context";
import { views } from "./data";
import { View } from "./View";
import { Grid } from "./Grid";

const Listener = () => {
  const { dispatch } = useContext(PositionContext);

  const direction = (e) => {
    switch (e.key) {
      case "ArrowRight":
        return "RIGHT";
      case "ArrowLeft":
        return "LEFT";
      case "ArrowUp":
        return "UP";
      case "ArrowDown":
        return "DOWN";
      default:
        return false;
    }
  };
  useEffect(() => {
    const handleKeyDown = (e) => {
      direction(e) &&
        dispatch({
          type: direction(e)
        });
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [dispatch]);

  // no render
  return null;
};

const Header = () => {
  const { dispatch, state } = useContext(PositionContext);
  const handleClick = (id) => {
    dispatch({ type: "ACTIVATE_VIEW", payload: { viewId: id } });
  };
  const { activeView } = state;
  const contentView = views.find((v) => v.id === activeView);
  return (
    <div className="header">
      <div className="buttons">
        {views.map((v) => {
          return (
            <button
              onClick={() => handleClick(v.id)}
              key={`header-button-${v.id}`}
              className={`btn ${activeView === v.id ? "btn-current" : ""}`}
            >
              {v.title}
            </button>
          );
        })}
      </div>
      <div className="header-content">
        <h1>{contentView?.title}</h1>
        <p>{contentView?.text}</p>
      </div>
    </div>
  );
};

const Router = () => {
  const { dispatch } = useContext(PositionContext);
  useEffect(() => {
    if (window?.location?.hash) {
      const viewId = parseInt(window.location.hash.substr(1), 10);
      const ids = views.map((v) => v.id);
      if (ids.includes(viewId)) {
        dispatch({ type: "ACTIVATE_VIEW", payload: { viewId } });
      }
    }
  }, [dispatch]);
  return null;
};
export default function App() {
  return (
    <PositionContextProvider>
      <Router />
      <Listener />
      <div className="App">
        <Header />
        {views.map((view) => (
          <View view={view} key={`viewport-${view.id}`}>
            <Grid view={view} />
          </View>
        ))}
      </div>
    </PositionContextProvider>
  );
}
