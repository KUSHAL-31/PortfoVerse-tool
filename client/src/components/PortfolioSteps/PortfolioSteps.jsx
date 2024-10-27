import "./PortfolioSteps.scss";
import { AssetVaultData } from "../../data";
import { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SkillsImg from "../../assets/images/skills.png";
import ContactImg from "../../assets/images/contact.png";

const PortfolioSteps = () => {
  const { section3 } = AssetVaultData;
  const carouselData = [
    { img: SkillsImg },
    ...section3.carouselData,
    { img: ContactImg },
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
          <ArrowBackIosIcon className="arrow__icons" />
        </div>
      </div>
      <div
        className={`av_carousel__right-arrow ${
          selectedSlide === totalSlides - 2 ? "hidden" : ""
        }`}
      >
        <div onClick={handleNextSlide}>
          <ArrowForwardIosIcon className="arrow__icons" />
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
              <div className={`prev-img`}>
                {index === selectedSlide - 1 && (
                  <img
                    src={item.img}
                    className={index === 0 || index === 4 ? "blur-img" : ""}
                  />
                )}
              </div>
              {index === selectedSlide && (
                <img src={item.img} className="active-img" />
              )}
              <div className={`next-img`}>
                {index === selectedSlide + 1 && (
                  <img
                    src={item.img}
                    className={index === 0 || index === 4 ? "blur-img" : ""}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={`ew-carousel-data-${selectedSlide}`}>
        <div className="left">
          <div className="carousel_title">
            {carouselData[selectedSlide].title}
          </div>
        </div>
        <div className="right">
          <div className="carousel_description">
            {carouselData[selectedSlide].description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSteps;
