const scroll = () => {
  const header = document.querySelector('.header__nav');
  const footer = document.querySelector('.footer__box');
  const burger = document.querySelector('.burger__menu');


  header.addEventListener('click', e => {
    const target = e.target;
    if (target.classList.contains('nav-link')) {
      e.preventDefault();
      const id = target.getAttribute('href');
      const elem = document.querySelector(id)
      window.scroll({
        top: elem.offsetTop,
        behavior: 'smooth'
      });
    }
  })

  footer.addEventListener('click', e => {
    const target = e.target;
    if (target.classList.contains('nav-link')) {
      e.preventDefault();
      const id = target.getAttribute('href');
      const elem = document.querySelector(id)
      window.scroll({
        top: elem.offsetTop,
        behavior: 'smooth'
      });
    }
  })

  burger.addEventListener('click', e => {
    const target = e.target;
    if (target.classList.contains('nav-link')) {
      e.preventDefault();
      burger.classList.remove('burger__active')
      const id = target.getAttribute('href');
      const elem = document.querySelector(id);
      window.scroll({
        top: elem.offsetTop,
        behavior: 'smooth'
      });
    }
  })
};

export default scroll;