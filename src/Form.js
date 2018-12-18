import axios from 'axios';

const API_URL = 'https://api.github.com/search/users?q=location';

class Form {
  constructor(addCard) {
    this.addCard = addCard;
    this.searchInput = document.querySelector('input[name="search"]');
    this.searchInput.addEventListener('keyup', (e) => {
      this.handleKeyUp(e);
    });

    this.API_URL = '';
    this.searchTerm = '';

    this.submitButton = document.querySelector('button[type="submit"]');
    this.submitButton.disabled = !this.searchTerm;

    this.form = document.querySelector('form');

    this.form.addEventListener('submit', (e) => {
      this.handleSubmit(e);
    });
  }

  handleKeyUp(e) {
    this.searchTerm = e.target.value.trim();
    console.log(this.searchTerm);
    this.API_URL = `${API_URL}:${this.searchTerm}`;
    console.log(this.API_URL);
    this.submitButton.disabled = !this.searchTerm;
  }

  handleSubmit(e) {
    e.preventDefault();
    axios
      .get(this.API_URL)
      .then((res) => {
        const { data } = res;
        this.addCard(data);
      })
      .catch((err) => console.error('promise rejected', err));
    this.form.reset();
  }
}

export default Form;
