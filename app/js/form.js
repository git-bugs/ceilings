const sendFormData = (formId, name, phone, submitId, statusId) => {

  const form = document.querySelector(formId);
  const status = document.querySelector(statusId);
  const submit = document.querySelector(submitId);
  const formName = document.querySelector(name);
  const formPhone = document.querySelector(phone);


  const message = {
    loading: 'Загрузка...',
    succes: 'Мы перезвоним вам в течени часа',
    failure: 'Ошибка'
  };


  const postData = async (data) => {
    status.style.display = 'block';
    status.textContent = message.loading;
    let res = await fetch('mail.php', {
      method: 'POST',
      body: data
    });
    return await res.text();
  };

  const send = () => {
    let formData = new FormData(form);
    postData(formData)
      .then(res => {
        let txt = res.split('%')[res.split('%').length - 1];
        if (txt.trim() === 'Error') {
          showStatus(message.failure);
        } else {
          showStatus(message.succes);
          form.reset();
        }
      })
      .catch(() => { showStatus(message.failure) })
  };

  const showStatus = text => {
    submit.setAttribute('disabled', 'disabled');
    status.style.display = 'block';
    status.textContent = text;
    setTimeout(() => {
      submit.removeAttribute('disabled');
      status.textContent = '';
    }, 2000);
  };

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!formName.value.trim()) {
      showStatus('Введите имя');
    } else if (!formPhone.value.trim()) {
      showStatus('Введите телефон');
    } else send();
  });

};

export default sendFormData;

