import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './index.css';


export default function CatalogCarousel({ images }) {
    return (
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}  // Adicione os módulos aqui
        spaceBetween={20}
        slidesPerView="auto"
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}  // Configuração de autoplay
        className="catalog-carousel"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} alt={`Imagem ${index + 1}`} className="carousel-img" />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }
  
