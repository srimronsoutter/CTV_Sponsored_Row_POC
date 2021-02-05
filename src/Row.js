import React from "react";
import { SPON_IMG_SRC } from "./constants";
import { Card } from "./card";
import { SponsoredImage } from "./SponsoredImage";

export const SponsoredRow = ({
  sImgH,
  sImgStyle,
  headerStyle,
  sliderStyle,
  cards,
  title,
  activeCard,
  isActive
}) => {
  const activeRowClass = isActive ? "active" : false;
  const className = ["row", "sponsored", activeRowClass]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={className}>
      <SponsoredImage sImgStyle={sImgStyle} sImgH={sImgH} />
      <div className="row__content">
        <h2 style={headerStyle}>{title}</h2>
        <div className="row__slider" style={sliderStyle}>
          {cards.map((card, index) => {
            const activeClass = index === activeCard ? "active" : null;

            return (
              <Card
                title={card.title}
                activeClass={activeClass}
                key={`card-${index}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const RowContent = ({
  cards,
  title,
  activeCard,
  sliderStyle,
  headerStyle
}) => (
  <div className="row__content">
    <h2 style={headerStyle}>{title}</h2>
    <div className="row__slider" style={sliderStyle}>
      {cards.map((card, index) => {
        const activeClass = index === activeCard ? "active" : null;

        return (
          <Card
            title={card.title}
            activeClass={activeClass}
            key={`card-${index}`}
          />
        );
      })}
    </div>
  </div>
);

export const Row = ({ cards, title, activeCard, isActive, sliderStyle }) => {
  const activeRowClass = isActive ? "active" : false;
  const className = ["row", activeRowClass].filter(Boolean).join(" ");
  return (
    <div className={className}>
      <RowContent
        cards={cards}
        title={title}
        activeCard={activeCard}
        sliderStyle={sliderStyle}
        headerStyle={{}}
      />
    </div>
  );
};
