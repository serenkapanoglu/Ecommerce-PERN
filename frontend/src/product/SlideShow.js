import React, { useState } from "react";
import { Carousel, Image } from "react-bootstrap";
import "./SlideShow.css";
const SlideShow = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      interval={null}
      fade
    >
    
      <Carousel.Item>
        <Image
          className='img carousel'
          src='https://sdcdn.io/mac/us/mac_sku_M2LP05_1x1_0.png?width=1080&height=1080'
          alt='First slide'
        />
      </Carousel.Item>
      <Carousel.Item>
        <Image
          className='img carousel'
          src='https://media.istockphoto.com/id/477663679/photo/every-woman-has-a-favourite-shade.jpg?s=612x612&w=is&k=20&c=Oc3lCJ01xBDPlYjQn8hXnUkHfNwI0Ly8TC0MQzrvjgU='
          alt='Second slide'
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default SlideShow;