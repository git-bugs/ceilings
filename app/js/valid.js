const valid = (name,phone) => {
  const formName = document.querySelector(name);
  const formPhone = document.querySelector(phone);

  const im = new Inputmask();
  im.mask(formPhone);


  formName.addEventListener('input', () => {
    formName.value = formName.value.replace(/[^а-яa-z|' ']/i, '');
    })

};

export default valid;