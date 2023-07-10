import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './SplashScreen.scss';
import { Logotype } from '../../../assets/icons';

const SampleNextArrow = (props: { className: any; style: any; onClick: any; }) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-next-arrow`}
      style={{ ...style, background: "transparent" }}
      onClick={onClick}
    />
  );
};

const SamplePrevArrow = (props: { className: any; style: any; onClick: any; }) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-prev-arrow`}
      style={{ ...style, background: "transparent" }}
      onClick={onClick}
    />
  );
};

export const SplashScreen = () => {
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const image1 = require('./1slide.jpg');
  const image2 = require('./2slide.jpg');
  const image3 = require('./3slide.jpg');
  const image4 = require('./JJK.jpg');
  const image5 = require('./JJK.jpg');
  const hideSplashScreen = () => {
    setShowSplashScreen(false);
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: true,
    autoplaySpeed: 4000,
    nextArrow: <SampleNextArrow className="next-arrow" style={undefined} onClick={undefined} />,
    prevArrow: <SamplePrevArrow className="prev-arrow" style={undefined} onClick={undefined} />
  };

  return (
    <div className={`splash-screen ${showSplashScreen ? 'visible' : 'hidden'}`}>
      <div className='splash-screen__logotype'>
        <div className="splash-screen__logo">
          <Logotype />
          </div>
      
      <h1 className="splash-screen__title">MovieMania</h1>
      <p className="splash-screen__discription">Welcome! In this app you will have access to things like:</p>
      </div>
      <Slider {...sliderSettings}>
        <div>
          <img src={image1} alt="Slide 1"/>
        </div>
        <div>
          <img src={image2} alt="Slide 2" />
        </div>
        <div>
          <img src={image3} alt="Slide 3" />
        </div>
      </Slider>
      <button className="start-button" onClick={hideSplashScreen}>Begin the search</button>
    </div>
  );
};