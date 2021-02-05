import React, { createContext, useReducer } from "react";
import { content, views } from "./data";

function createRow(row, index) {
  return {
    index,
    cards: row.cards || [],
    activeCard: 0,
    activateCard: function (index) {
      if (index < this.cards.length && index >= 0) {
        this.activeCard = index;
        return this;
      }
    }
  };
}

function createView(id) {
  return {
    id,
    isActive: false,
    activeRow: 0,
    rows: [],
    activateRow: function (rowIndex) {
      if (rowIndex < this.rows.length && rowIndex >= 0) {
        this.activeRow = rowIndex;
        return this;
      }
    }
  };
}

const reducer = (state, action) => {
  const { type, payload } = action;

  if (
    type === "LEFT" ||
    type === "RIGHT" ||
    type === "UP" ||
    type === "DOWN" ||
    type === "ACTIVATE_VIEW"
  ) {
    if (type === "ACTIVATE_VIEW") {
      const { viewId } = payload;
      return { ...state, activeView: viewId };
    }

    if (
      type === "LEFT" ||
      type === "RIGHT" ||
      type === "UP" ||
      type === "DOWN"
    ) {
      const { views, activeView } = state;
      const view = { ...views.find((v) => v.id === activeView) };
      const direction = type === "RIGHT" || type === "DOWN" ? 1 : -1;

      let _row, _rows, _view, _views;

      if (type === "LEFT" || type === "RIGHT") {
        _row = { ...view.rows[view.activeRow] };
        _row.activateCard(_row.activeCard + direction);
        _rows = view.rows.map((row, idx) => {
          return view.activeRow === idx ? _row : row;
        });
        _view = { ...view, rows: _rows };
        _views = state.views.map((v) => (v.id === activeView ? _view : v));
        return { ...state, views: _views };
      }

      if (type === "UP" || type === "DOWN") {
        _view = { ...view };
        _view.activateRow(view.activeRow + direction);
        _views = state.views.map((view) =>
          view.id === activeView ? _view : view
        );
        return { ...state, views: _views };
      }
    }
    return state;
  }
};

const { rows: contentRows } = content;

const rows = contentRows.map((row, index) => createRow(row, index));

const stateViews = views.map((v) => {
  const view = createView(v.id);
  return { ...view, rows };
});

const initialState = {
  views: stateViews,
  activeView: 0
};

export const PositionContext = createContext(initialState);

const PositionContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <PositionContext.Provider value={{ state, dispatch }}>
      {props.children}
    </PositionContext.Provider>
  );
};

export default PositionContextProvider;
