import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const refs = {
    form: document.querySelector('.feedback-form'),
    textarea: document.querySelector('.feedback-form textarea'),
    input: document.querySelector('input'),
};
const formData = {};



refs.form.addEventListener('input', throttle(onTextareaInput, 500));
populateTextarea();

refs.form.addEventListener('submit', event => {
    event.preventDefault();

    const objData = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const { elements: { email, message } } = event.currentTarget;
    if (email.value === '' || message.value === '') {
        return alert('Заполните все поля!')
    }
    event.currentTarget.reset();
    console.log(objData);
    localStorage.removeItem(STORAGE_KEY);
});

function onTextareaInput(event) {
    formData[event.target.name] = event.target.value;
    const stringifiedData = JSON.stringify(formData);
    localStorage.setItem(STORAGE_KEY, stringifiedData);
}

function populateTextarea() {
    const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (savedMessage === null) {
        return;
    }
    refs.textarea.value = savedMessage['message'] || '';
    refs.input.value = savedMessage['email'] || '';
}

