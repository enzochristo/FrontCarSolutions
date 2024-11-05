import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules'; // Removido Navigation
import 'swiper/css';
import 'swiper/css/pagination';
import './index.css';

export default function CatalogCarousel({ images }) {
    return (
        <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView="auto"
            pagination={{ clickable: true }}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
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
