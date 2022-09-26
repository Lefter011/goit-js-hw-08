import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const refs = {
    form: document.querySelector('.feedback-form'),
    textarea: document.querySelector('.feedback-form textarea'),
    input: document.querySelector('input'),
};
let formData = {};

refs.form.addEventListener('input', throttle(onTextareaInput, 500));

refs.form.addEventListener('submit', event => {
    event.preventDefault();

    localStorage.removeItem(STORAGE_KEY);
    formData = {};
    const { elements: { email, message } } = event.currentTarget;
    if (email.value === '' || message.value === '') {
        return alert('Заполните все поля!')
    }

    console.log({email: email.value, message: message.value});
    refs.form.reset();
});

function onTextareaInput(event) {
    formData[event.target.name] = event.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateTextarea() {
    const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (savedMessage === null) {
        return;
    }
    refs.input.value = savedMessage.email || '';
    refs.textarea.value = savedMessage.message || '';
}

populateTextarea();