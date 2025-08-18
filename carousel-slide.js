new Swiper('.slider-wrapper', {
  
  loop: false,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  // Responsive breakpoints
  breakpoints: {
  0: {
    slidesPerView:1
  },
  768: {
     slidesPerView:3
  },
  1024: {
     slidesPerView:3
  },
}
 
});