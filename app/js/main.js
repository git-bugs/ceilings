import tabs from './tabs';
import sendFormData from './form';
import valid from './valid';
import scroll from './scroll';

window.addEventListener('DOMContentLoaded', () => {

  $('.gallery__items').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: '.gallery__thumbs',
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: false,
    pauseOnFocus: false,
    responsive: [
      {
        breakpoint: 1360,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        }
      },
    ]
  })
  $('.gallery__thumbs').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.gallery__items',
    focusOnSelect: true,
    prevArrow: '.thumbs-left',
    nextArrow: '.thumbs-right',
    responsive: [
      {
        breakpoint: 1360,
        settings: {
          arrows: false,
        }
      },
      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
        }
      },
    ]
  })

  $('.invoice__items').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.gallery__items',
    focusOnSelect: true,
    arrows:false,
    prevArrow: '<button type="button" class="slick-prev"><img src="images/left.svg" alt=""></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="images/right.svg" alt=""></button>',
    responsive: [
      {
        breakpoint: 1360,
        settings: {
          arrows:true,
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 1000,
        settings: {
          arrows:true,
          slidesToShow: 1,
        }
      },
      {
        breakpoint: 500,
        settings: {
          arrows:false,
          slidesToShow: 1,
        }
      },
    ]
  })

  $('.header__slider').slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    dots: true,
    autoplay: true,
    autoplaySpeed: 2000,
    prevArrow: '.header__slider-left',
    nextArrow: '.header__slider-right',
    responsive: [
      {
        breakpoint: 1160,
        settings: {
          arrows:true,
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 0,
        settings: {
          arrows:false,
          slidesToShow: 1,
        }
      },
    ]
  })

  $('.feedback__slider').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: '.feedback__left',
    nextArrow: '.feedback__right',
    responsive: [
      {
        breakpoint: 1420,
        settings: {
          arrows:true,
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 1000,
        settings: {
          arrows:true,
          slidesToShow: 1,
        }
      },
      {
        breakpoint: 500,
        settings: {
          arrows:false,
          slidesToShow: 1,
        }
      },
    ]
  })


  const burger = () => {
    const btn = document.querySelector('.header__burger-img');
    const close = document.querySelector('.burger__close');
    const menu = document.querySelector('.burger__menu')
    btn.addEventListener('click', () => {
      menu.classList.toggle('burger__active')
    })
    close.addEventListener('click', () => {
      menu.classList.remove('burger__active')
    })
  }
  burger();


  const sliderMask = () => {
    const mask = document.querySelector('.header__slider-info__mask');
    let active = document.querySelector('.header__slider .slick-current');
    mask.textContent = active.querySelector('.header__slider-info').textContent
    $('.header__slider').on('afterChange', function () {
      active = document.querySelector('.slick-current');
      mask.textContent = active.querySelector('.header__slider-info').textContent
    })
  };
  if (window.innerWidth > 1160) sliderMask();

  
  if(window.innerWidth < 1150){
    tabs('.catalog__type-buttons', '.catalog__type-btn', '.catalog__content', 'btn--active', 'block');
  }else  tabs('.catalog__type-buttons', '.catalog__type-btn', '.catalog__content', 'btn--active', 'flex');

  sendFormData('.contact__form', '.contact__name', '.contact__phone', '.contact__submit', '.contact__status');
  valid('.contact__name', '.contact__phone');
  scroll();

})

