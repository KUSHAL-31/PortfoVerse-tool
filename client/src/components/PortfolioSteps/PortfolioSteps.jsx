import "./PortfolioSteps.scss";
import { AssetVaultData } from "./data";
import { useEffect, useState } from "react";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
const transparentImageUrl =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

const PortfolioSteps = () => {
  const { section3 } = AssetVaultData;
  const carouselData = [
    // { img: transparentImageUrl },
    ...section3.carouselData,
    // { img: transparentImageUrl },
  ];

  const [selectedSlide, setSelectedSlide] = useState(1);
  const [slideDirection, setSlideDirection] = useState("right");
  const totalSlides = carouselData.length;

  const handlePrevSlide = () => {
    const newIndex = (selectedSlide - 1 + totalSlides) % totalSlides;
    setSelectedSlide(newIndex);
    setSlideDirection("left");
  };

  const handleNextSlide = () => {
    const newIndex = (selectedSlide + 1) % totalSlides;
    setSelectedSlide(newIndex);
    setSlideDirection("right");
  };

  // this will handle the 10s interval animation of carousel
  useEffect(() => {
    const interval = setInterval(() => {
      const newIndex = (selectedSlide % (totalSlides - 2)) + 1;
      setSelectedSlide(newIndex);
      setSlideDirection("right");
    }, 10000);
    return () => clearInterval(interval);
  }, [selectedSlide, totalSlides]);

  return (
    <div className="av_carousel">
      {selectedSlide === 1 ? (
        <div className="money-img">{/* <img src={MoneyImg} /> */}</div>
      ) : null}
      <div
        className={`av_carousel__left-arrow ${
          selectedSlide === 1 ? "hidden" : ""
        }`}
      >
        <div onClick={handlePrevSlide}>
          <ArrowCircleLeftIcon className="arrow__icons" />
        </div>
      </div>
      <div
        className={`av_carousel__right-arrow ${
          selectedSlide === totalSlides - 2 ? "hidden" : ""
        }`}
      >
        <div onClick={handleNextSlide}>
          <ArrowCircleRightIcon className="arrow__icons" />
        </div>
      </div>
      <div className="av_carousel_content">
        <div className="av_carousel__slide-container">
          {carouselData.map((item, index) => (
            <div
              className={`av_carousel__slide ${
                index === selectedSlide
                  ? `active-${slideDirection}`
                  : `not-active-${slideDirection}`
              }`}
              key={index}
            >
              <div
                className={`prev-img ${
                  index === 0 || index === totalSlides - 1 ? "no-border" : ""
                } ${index === selectedSlide - 1 ? "active-prev" : ""}`}
              >
                {index === selectedSlide - 1 && item.img !== "" && (
                  <img src={item.img} />
                )}
              </div>
              {index === selectedSlide && (
                <img src={item.img} className="active-img" />
              )}
              <div
                className={`next-img ${
                  index === 0 || index === totalSlides - 1 ? "no-border" : ""
                } ${index === selectedSlide + 1 ? "active-next" : ""}`}
              >
                {index === selectedSlide + 1 && item.img !== "" && (
                  <img src={item.img} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={`ew-carousel-data-${selectedSlide}`}>
        <div className="left">
          {carouselData[selectedSlide].breakVal1 === 0 ? (
            <div className="ew-carousel-data__title Lg-display-01-medium">
              {carouselData[selectedSlide].title}
            </div>
          ) : (
            <div className="ew-carousel-data__title Lg-display-01-medium">
              <div className="ew-title-desk-content">
                {carouselData[selectedSlide].title.substring(
                  0,
                  carouselData[selectedSlide].breakVal1
                )}
                <br />
                {carouselData[selectedSlide].title.substring(
                  carouselData[selectedSlide].breakVal1
                )}
              </div>
              <div className="ew-title-mob-content">
                {carouselData[selectedSlide].title}
              </div>
            </div>
          )}
        </div>
        <div className="right">
          {carouselData[selectedSlide].breakVal === 0 ? (
            <div className="ew-carousel-data__desc Lg-body-02-regular">
              {carouselData[selectedSlide].description}
            </div>
          ) : (
            <div className="ew-carousel-data__desc Lg-body-02-regular">
              {carouselData[selectedSlide].description.substring(
                0,
                carouselData[selectedSlide].breakVal
              )}
              <br />
              <br />
              {carouselData[selectedSlide].description.substring(
                carouselData[selectedSlide].breakVal
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioSteps;
