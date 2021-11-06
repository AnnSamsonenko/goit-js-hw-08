import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
initForm();

form.addEventListener('submit', onFormSubmit);
form.addEventListener('change', throttle(onInputChange, 500));
form.addEventListener('reset', () => {
  localStorage.removeItem(STORAGE_KEY);
});

function onFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(this);
  formData.forEach((value, name) => console.log(value, name));
  this.reset();
}

function onInputChange(event) {
  let savedFormData = localStorage.getItem(STORAGE_KEY);
  savedFormData = savedFormData ? JSON.parse(savedFormData) : {};
  savedFormData[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(savedFormData));
}

function initForm() {
  let savedFormData = localStorage.getItem(STORAGE_KEY);
  if (savedFormData) {
    savedFormData = JSON.parse(savedFormData);
    Object.entries(savedFormData).forEach(([name, value]) => {
      form.elements[name].value = value;
    });
  }
}
