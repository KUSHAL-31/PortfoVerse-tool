import "./PortfolioSteps.scss";
import { SliderData } from "../../data";
import { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SliderImage0 from "../../assets/images/slider_image_0.png";
import SliderImage4 from "../../assets/images/slider_image_4.png";
import { motion, AnimatePresence } from "framer-motion";

const PortfolioSteps = () => {
  const { section3 } = SliderData;
  const carouselData = [
    { img: SliderImage0 },
    ...section3.carouselData,
    { img: SliderImage4 },
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
    <div className="portfolio-carousel">
      <div className="portfolio-carousel__container">
        <div
          className={`portfolio-carousel__arrow portfolio-carousel__arrow--left ${
            selectedSlide === 1 ? "hidden" : ""
          }`}
          onClick={handlePrevSlide}
        >
          <ArrowBackIosIcon />
        </div>

        <div className="portfolio-carousel__content">
          <div className="portfolio-carousel__slides">
            {carouselData.map((item, index) => (
              <div
                className={`portfolio-carousel__slide ${
                  index === selectedSlide ? "active" : ""
                } ${slideDirection === "right" ? "slide-right" : "slide-left"}`}
                key={index}
              >
                {index === selectedSlide - 1 && (
                  <div className="portfolio-carousel__preview portfolio-carousel__preview--prev">
                    <img
                      src={item.img}
                      alt="Previous slide"
                      className={index === 0 || index === 4 ? "blur" : ""}
                    />
                  </div>
                )}

                {index === selectedSlide && (
                  <div className="portfolio-carousel__current">
                    <img
                      src={item.img}
                      alt="Current slide"
                      className="active-img"
                    />
                  </div>
                )}

                {index === selectedSlide + 1 && (
                  <div className="portfolio-carousel__preview portfolio-carousel__preview--next">
                    <img
                      src={item.img}
                      alt="Next slide"
                      className={index === 0 || index === 4 ? "blur" : ""}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="portfolio-carousel__info"
            >
              <div className="portfolio-carousel__info-container">
                <div className="portfolio-carousel__title">
                  {carouselData[selectedSlide].title}
                </div>
                <div className="portfolio-carousel__description">
                  {carouselData[selectedSlide].description}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div
          className={`portfolio-carousel__arrow portfolio-carousel__arrow--right ${
            selectedSlide === totalSlides - 2 ? "hidden" : ""
          }`}
          onClick={handleNextSlide}
        >
          <ArrowForwardIosIcon />
        </div>
      </div>

      <div className="portfolio-carousel__indicators">
        {Array.from({ length: totalSlides - 2 }).map((_, index) => (
          <div
            key={index}
            className={`portfolio-carousel__indicator ${
              selectedSlide === index + 1 ? "active" : ""
            }`}
            onClick={() => {
              setSelectedSlide(index + 1);
              setSlideDirection(index + 1 > selectedSlide ? "right" : "left");
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default PortfolioSteps;
