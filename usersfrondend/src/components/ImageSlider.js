import React from 'react'
import SimpleImageSlider from "react-simple-image-slider";
import img1 from '../images/img1.jpg';
import img2 from '../images/img2.jpg';
import img3 from '../images/img3.jpg';

function ImageSlider() {

    const images = [
        { url: img1},
        { url: img2 },
        { url: img3 },
       
       
      ];
      const sliderSettings = {
        width: '100%', // Full width
        height: '100vh', // 100% of the viewport height
        images: images,
        showBullets: true,
        showNavs: true,
        autoPlay:true,
      };
  return (
    <div > 
         <SimpleImageSlider {...sliderSettings} />
    </div>
  )
}

export default ImageSlider