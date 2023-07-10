declare module 'react-slick' {
    import React from 'react';
  
    export interface SliderSettings {
      dots?: boolean;
      infinite?: boolean;
      speed?: number;
      slidesToShow?: number;
      slidesToScroll?: number;
      autoplay?: boolean;
      pauseOnHover?: boolean;
      autoplaySpeed?: number,
    }
  
    export default class Slider extends React.Component<SliderSettings> {}
  }