class Gallary {
  buttonNext = null;
  slideLength = 0;
  slideIndex = 0;
  stepPercent = 0;
  items = [];
  constructor(options) {
    this.slideLength = options.gallaryItems.items.length;
    this.stepPercent = Number((100 / this.slideLength).toFixed(3));
    this.init(options);
    this.setHtmlElements();
    this.initListeners();
  }

  init(options) {
    this.gallary = document.getElementById(options.root);
    this.gallaryItems = this.createElement('div', {
      className: options.selectorItems,
    });
    this.wrapper = this.createElement('div', { className: options.wrapper });

    this.buttonPrev = this.createElement('button', {
      className: 'prev',
        attr: {
        ['data-btn']: 'prev',
      },
    });

    this.buttonNext = this.createElement('button', {
      className: 'next',
        attr: {
        ['data-btn']: 'next',
      },
    });
   
    this.items = options.gallaryItems.items.map((item) => {
      return this.createElement('img', {
        src: item,
        className: options.gallaryItems.className,
      });
    });
  }

  setHtmlElements() {
    this.gallary.appendChild(this.gallaryItems);
    this.gallaryItems.appendChild(this.wrapper);
    this.wrapper.append(...this.items);
    this.gallaryItems.append(this.buttonPrev, this.buttonNext);
  }

  createElement(tagName, options) {
    const tag = document.createElement(tagName);
    if (options.hasOwnProperty('className')) {
      tag.classList.add(options.className);
    }
    if (options.hasOwnProperty('attr')) {
      Object.entries(options.attr).map(([key, value]) => {
        tag.setAttribute(key, value);
      });
    }
    if (options.hasOwnProperty('text')) {
      tag.innerHTML = options.text;
    }
    if (options.hasOwnProperty('src')) {
      tag.src = options.src;
    }
    return tag;
  }

  initListeners() {
    this.gallary.addEventListener('click', (event) => {
      if (event.target.dataset?.btn === 'prev') this.prev();
      if (event.target.dataset?.btn === 'next') this.next();
    });
  }
  prev() {
    if (this.slideIndex !== 0) {
      this.slideIndex -= 1;
    } else {
      this.slideIndex = this.slideLength - 1;
    }
    this.move();
  }

  next() {
    if (this.slideIndex < this.slideLength - 1) {
      this.slideIndex += 1;
    } else {
      this.slideIndex = 0;
    }

    this.move();
  }

  move() {
    this.wrapper.style.transform = `translateX(${
      -this.stepPercent * this.slideIndex
    }%)`;
  }
}



class Faq {
  activeElement = null;
  constructor(selector) {
    this.faq = document.querySelector(selector);
    this.listeners();
  }

  
  listeners() {
    this.faq.addEventListener('click', (event) => {
      const target = event.target;
      const dataTarget = target.getAttribute('data-item');
      if (dataTarget) {
        if (this.activeElement && event.target !== this.activeElement) {
          this.activeElement.classList.remove('active');
        }
        target.classList.add('active');
        this.activeElement = target;
      }
    });
  }
}
new Faq('.accordion');

new Gallary( {
  root: 'gallary',
  wrapper: 'gallary__items__wrapper',
  selectorItems: 'gallary__item',
  gallaryItems: {
    className: 'gallary__item',
    items: ['./img/1.png', './img/2.png', './img/3.png'],
  },
});

let cart ={
  p1:0,
  p2:0,
  p3:0,
}

const cardsProduct = document.querySelector('.cards');
const preloader = document.querySelector('.preloader');

const loading = (isLoad) => {
  preloader.classList[!isLoad ? 'add' : 'remove']('preloader--hide');
};

const getProducts = async function () {
  loading(true);
  return new Promise((result) => {
    const idT = setTimeout(() => {
      fetch('./products.json').then((data) => {
        result(data.json());
      });
      loading(false);
      clearTimeout(idT);
    }, 2000);
  });
};

getProducts()
  .then((products) => {
    if (!products?.length) {
      cardsProduct.innerHTML = `<div>Что то пошло не так</div>`;
      return;
    }
      cardsProduct.innerHTML = products.map(getTemplate).join('');
      
      cardsProduct.addEventListener('click', (event) => {
        event.preventDefault();
        if (event.target.classList.contains('card__button') ) {
          toastr.success('added to cart')
          addFunction(event.target.dataset.id);
          
        }
      } )
  });
  
  const addFunction = (id) => {
    cart[id]++
    console.log(cart);
  }

function getTemplate({ id, img, price, name }) {
  return `
    <div class="card__item">
      <div class="card__cover">
          <img  class="card__img" src=${img} alt="">
      </div>
      <div class="card__info">
          <p class="card__name">${name}</p>
          <div class="card__price">${price}</div>
      </div>
      <a href="#" class="card__button" data-id="${id}">Add to cart</a>
  </div>
  `;
}

let message ={}

let form = document.querySelector('.form')
let inputs = form.querySelectorAll('.input') 

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = e.target.name.value
  message['name'] = name;
  const email = e.target.email.value
  message['email'] = email;
  const question = e.target.question.value
  message['question'] = question;
  toastr.info('your message has been recived')
  console.log(message);
 } )



  


