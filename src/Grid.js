import React, { useContext } from "react";
import { PositionContext } from "./context";
import { content } from "./data";
import {
  ROW_H,
  IMG_W,
  GUTTER,
  SPON_IMG_W,
  VIEW_PADDING,
  SPON_IMG_H,
  IMG_H,
  SPON_IMG_RATIO
} from "./constants";
import { Row, SponsoredRow } from "./Row";

const VRow = ({ component, props }) => {
  return component(props);
};

export const Grid = ({ view }) => {
  const { state } = useContext(PositionContext);

  const stateView = state.views.find((v) => v.id === view.id);
  const { activeRow, rows: stateRows } = stateView;
  const shiftValue = ROW_H * activeRow;
  const { rows } = content;

  const props = (row, index) => {
    const stateRow = stateRows[index];
    const { activeCard } = stateRow;
    const dynamicStyle = getDynamicStyle(activeCard, index);
    return {
      isActive: index === activeRow,
      title: row.title,
      cards: row.cards,
      activeCard,
      ...dynamicStyle
    };
  };

  const getDynamicStyle = (activeCard, index) => {
    let shiftValue, transitionCss;
    const factor = 0.75;
    const sImgW = SPON_IMG_W * factor;
    const sImgH = SPON_IMG_H * factor;

    if (view.id === 0) {
      shiftValue = (IMG_W + GUTTER) * activeCard;
      return {
        sliderStyle: { transform: `translateX(-${shiftValue}rem)` }
      };
    }
    if (view.id === 1) {
      shiftValue = () => {
        if (activeCard === 0) {
          return 0;
        }
        if (activeCard === 1) {
          return SPON_IMG_W - 10;
        }
        return SPON_IMG_W + (IMG_W + GUTTER) * (activeCard - 1);
      };
      transitionCss = {
        transform: `translateX(-${shiftValue()}rem)`,
        transition: "0.3s ease-in-out"
      };
      return {
        sImgH: SPON_IMG_H,
        sImgStyle: {
          ...transitionCss,
          marginRight: `${GUTTER}rem`,
          marginLeft: `-${VIEW_PADDING}rem`,
          width: `${SPON_IMG_W}rem`,
          height: `${SPON_IMG_H}rem`
        },
        headerStyle:
          activeCard <= 1
            ? { ...transitionCss }
            : {
                ...transitionCss,
                transform: `translateX(${SPON_IMG_W + (IMG_W + GUTTER)})`
              },
        sliderStyle: {
          transform: `translateX(-${shiftValue()}rem)`
        }
      };
    }
    if (view.id === 2) {
      shiftValue =
        activeCard > 0
          ? SPON_IMG_W - VIEW_PADDING + (IMG_W + GUTTER) * activeCard
          : 0;
      transitionCss = {
        transform: `translateX(-${shiftValue}rem)`,
        transition: "0.3s ease-in-out"
      };
      return {
        sImgH: SPON_IMG_H,
        sImgStyle: {
          ...transitionCss,
          marginRight: `${GUTTER}rem`,
          marginLeft: `-${VIEW_PADDING}rem`,
          width: `${SPON_IMG_W}rem`,
          height: `${SPON_IMG_H}rem`
        },
        headerStyle:
          activeCard === 0
            ? { ...transitionCss }
            : {
                ...transitionCss,
                transform: `translateX(-${SPON_IMG_W - VIEW_PADDING}rem)`
              },
        sliderStyle: {
          transform: `translateX(-${shiftValue}rem)`
        }
      };
    }
    if (view.id === 3) {
      shiftValue = (IMG_W + GUTTER) * activeCard;
      return {
        sImgH: SPON_IMG_H,
        sImgStyle: {
          marginRight: `${GUTTER}rem`,
          marginLeft: `-${VIEW_PADDING}rem`,
          width: `${SPON_IMG_W}rem`,
          height: `${SPON_IMG_H}rem`,
          zIndex: 3
        },
        sliderStyle: {
          transform: `translateX(-${shiftValue}rem)`
        },
        headerStyle: {}
      };
    }
    if (view.id === 4) {
      shiftValue = () => {
        if (activeCard === 0) {
          return 0;
        }
        if (activeCard === 1) {
          return sImgW - 10;
        }
        return sImgW + (IMG_W + GUTTER) * (activeCard - 1);
      };
      transitionCss = {
        transform: `translateX(-${shiftValue()}rem)`,
        transition: "0.3s ease-in-out"
      };
      return {
        sImgH,
        sImgStyle: {
          ...transitionCss,
          marginRight: `${GUTTER}rem`,
          marginLeft: `-${VIEW_PADDING}rem`,
          width: `${sImgW}rem`,
          height: `${sImgH}rem`
        },
        headerStyle:
          activeCard <= 1
            ? { ...transitionCss }
            : {
                ...transitionCss,
                transform: `translateX(${SPON_IMG_W + (IMG_W + GUTTER)})`
              },
        sliderStyle: {
          transform: `translateX(-${shiftValue()}rem)`
        }
      };
    }
    if (view.id === 5) {
      shiftValue =
        activeCard > 0
          ? index === 2
            ? // if not first card and is sponsor row
              sImgW - VIEW_PADDING + (IMG_W + GUTTER) * activeCard
            : // if not first card and is not sponsor row
              (IMG_W + GUTTER) * activeCard
          : // otherwise
            0;
      transitionCss = {
        transform: `translateX(-${shiftValue}rem)`,
        transition: "0.3s ease-in-out"
      };
      return {
        sImgH: sImgH,
        sImgStyle: {
          ...transitionCss,
          marginRight: `${GUTTER}rem`,
          marginLeft: `-${VIEW_PADDING}rem`,
          width: `${sImgW}rem`,
          height: `${sImgH}rem`
        },
        headerStyle:
          index === 2 && activeCard > 0
            ? {
                ...transitionCss,
                transform: `translateX(-${sImgW - VIEW_PADDING}rem)`
              }
            : { ...transitionCss },
        sliderStyle: {
          transform: `translateX(-${shiftValue}rem)`
        }
      };
    }
    if (view.id === 6) {
      shiftValue = (IMG_W + GUTTER) * activeCard;
      return {
        sImgH,
        sImgStyle: {
          marginRight: `${GUTTER}rem`,
          marginLeft: `-${VIEW_PADDING}rem`,
          width: `${sImgW}rem`,
          height: `${sImgH}rem`,
          zIndex: 3
        },
        sliderStyle: {
          transform: `translateX(-${shiftValue}rem)`
        },
        headerStyle: {}
      };
    }
    if (view.id === 7) {
      shiftValue = () => {
        if (activeCard === 0 && index === activeRow && activeRow === 2) {
          return sImgW - 11;
        }
        if (index === activeRow && activeRow === 2 && activeCard >= 1) {
          return sImgW - 10 + (IMG_W + GUTTER) * activeCard;
        }
        if (index === 2 && activeCard >= 1) {
          return sImgW - 10 + (IMG_W + GUTTER) * activeCard;
        }
        if (activeCard > 0) {
          return (IMG_W + GUTTER) * activeCard;
        }
        if (activeCard === 0) {
          return 0;
        } else {
          return 0;
        }
      };
      // delay only applies to first card (this would need to be more sophisticated in prod)
      const transition =
        activeCard === 0 && index === activeRow && activeRow === 2
          ? "0.3s ease-in-out 0.3s"
          : "0.3s ease-in-out";
      transitionCss = {
        transform: `translateX(-${shiftValue()}rem)`,
        transition
      };

      return {
        sImgH,
        sImgStyle: {
          ...transitionCss,
          marginRight: `${GUTTER}rem`,
          marginLeft: `-${VIEW_PADDING}rem`,
          width: `${sImgW}rem`,
          height: `${sImgH}rem`
        },
        headerStyle:
          activeCard < 1
            ? { ...transitionCss }
            : {
                ...transitionCss,
                transition,
                transform: `translateX(${SPON_IMG_W + (IMG_W + GUTTER)})`
              },
        sliderStyle: {
          transition,
          transform: `translateX(-${shiftValue()}rem)`
        }
      };
    }
    if (view.id === 8) {
      shiftValue = () => {
        if (activeCard > 2 && index === 2) {
          return (
            (IMG_W + GUTTER) * 3 * (parseInt(activeCard / 5, 10) + 1) +
            (VIEW_PADDING - 15)
          );
        }
        if (activeCard === 2 && index === 2) {
          return (
            (IMG_W + GUTTER) * 3 * parseInt(activeCard / 2, 10) +
            (VIEW_PADDING - 15)
          );
        }
        if (activeCard >= 3) {
          return (IMG_W + GUTTER) * 3 * parseInt(activeCard / 3, 10);
        }
        return 0;
      };

      transitionCss = {
        transform: `translateX(-${shiftValue()}rem)`,
        transition: "0.3s ease-in-out"
      };

      return {
        sImgH,
        sImgStyle: {
          ...transitionCss,
          marginRight: `${GUTTER}rem`,
          marginLeft: `-${VIEW_PADDING}rem`,
          width: `${sImgW}rem`,
          height: `${sImgH}rem`
        },
        headerStyle: transitionCss,
        sliderStyle: transitionCss
      };
    }
    if (view.id === 9) {
      // gonna regret this nested ternary later
      shiftValue =
        // if not first card
        activeCard > 0
          ? // and if is sponsored row
            index === 2
            ? IMG_W + (IMG_W + GUTTER) * activeCard
            : // all other rows
              (IMG_W + GUTTER) * activeCard
          : // if it is first card
            0;
      transitionCss = {
        transform: `translateX(-${shiftValue}rem)`,
        transition: "0.3s ease-in-out"
      };
      return {
        sImgH: IMG_W * IMG_H,
        sImgStyle: {
          ...transitionCss,
          marginRight: `${GUTTER}rem`,
          width: `${IMG_W}rem`,
          height: `${IMG_H * SPON_IMG_RATIO}rem`,
          marginTop: "2em"
        },
        headerStyle: { transform: `translateX(-${IMG_W}rem)` },
        sliderStyle: {
          transform: `translateX(-${shiftValue}rem)`
        }
      };
    }
  };

  const getSponsorComponent = () => {
    if (view.id === 0) {
      return Row;
    }
    if (view.id > 0) {
      return SponsoredRow;
    }

    return Row;
  };

  return (
    <div
      className="rows"
      style={{ transform: `translateY(-${shiftValue}rem)` }}
    >
      {rows.map((row, index) => {
        const component = index === 2 ? getSponsorComponent() : Row;
        const _props = props(row, index);
        return (
          <VRow component={component} props={_props} key={`rc-${index}`} />
        );
      })}
    </div>
  );
};
