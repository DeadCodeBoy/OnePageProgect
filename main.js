class Gallary {
  buttonNext = null;
  slideLength = 0;
  slideIndex = 0;
  stepPercent = 0;
  items = [];
  constructor(selector, options) {
    this.gallary = document.querySelector(selector);
    // this.wrapper = this.gallary.querySelector(options.wrapper);
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
      // text: 'prev',
      attr: {
        ['data-btn']: 'prev',
      },
    });

    this.buttonNext = this.createElement('button', {
      className: 'next',
      // text: 'next',
      // scr: '/images/next.png',
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
    //debugger
    this.gallary.addEventListener('click', (event) => {
      // console.log(event.target);
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

new Gallary('.gallary', {
  root: 'gallary',
  wrapper: 'gallary__items__wrapper',
  selectorItems: 'gallary__item',
  buttons: true, // swipe
  autoslide: false, // автоматический слайд
  gallaryItems: {
    className: 'gallary__item',
    items: ['./img/1.png', './img/2.png', './img/3.png'],
  },
});

class Faq {
  activeElement = null;

  constructor(selector) {
    this.init(selector);
    this.listeners();
  }

  init(selector) {
    this.faq = document.querySelector(selector);
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


let menu = document.querySelector('.header__link');
menu.addEventListener('click', function(e){
  let elem = e.target.closest('a');
  
  if(elem !== null && menu.contains(elem)){
    e.preventDefault();
    console.log(this.hash);
    let target = document.querySelector(this.hash);
    let coords = target.getBoundingClientRect();
    let top = window.scrollY + coords.top;
    window.scrollTo({
      top,
      behavior:'smooth'
    });
  }
});

const products =[
  {
    name: 'https://willpower.su/image/cache/catalog/sajt08.02.2020/vitamind32000iu120caps1-1200x800.jpg', 
    price: 2000,
    discont: 10
},
{
  name: 'https://img.herbup.ru/images/products/1/782/696623886/8.jpg', 
  price: 2000,
  discont: 10
},
{
  name: 'https://www.fitbynet.com/wp-content/uploads/2019/06/51cY2CZlMkL._SY679_.jpg', 
  price: 2000,
  discont: 10
}
] 
  
const server = {
  cards(line = 1) {
    const finished = line >= 1
    const next = finished ? null : line + 1
    const cards = Array(2).fill(products)
    return new Promise((resolve) => {
      
      setTimeout(() => {
        resolve({ cards, next })
      }, 2000)
    })
  },
}

 async function checkPosition() {
  const height = document.body.offsetHeight
  const screenHeight = window.innerHeight
  const scrolled = window.scrollY
  const threshold = height - screenHeight/0.9
  const position = scrolled + screenHeight
  if (position >= threshold) {
    await fetchData()
  }
}

function throttle(callee, timeout) {
  let timer = null

  return function perform(...args) {
    if (timer) return

    timer = setTimeout(() => {
      callee(...args)

      clearTimeout(timer)
      timer = null
    }, timeout)
  }
}


;(() => {
  window.addEventListener('scroll', throttle(checkPosition, 250))
  window.addEventListener('resize', throttle(checkPosition, 250))
})()

let nextPage = 1;
let isLoading = false;
let shouldLoad = true;

async function fetchData() {
  if (isLoading || !shouldLoad) return;
  isLoading = true;
  const { cards, next } = await server.cards(nextPage);
  cards.forEach(appendData);
  nextPage = next;
  if (!next) shouldLoad = false;
  isLoading = false;

}

function appendData(loadData) {
  if (!loadData) return
  const main = document.querySelector('.cards')
  const cardNode = composeData(loadData)
  main.append(cardNode)
}

function composeData(loadData) {
  let block;
  let key;
  if (!loadData) return
  const template = document.querySelectorAll('.card__item')
  Array.from(template).forEach((file) => {
    file.classList.add ('active');
    preloader.classList.add('preloader--hide')
  })
  
  let list = document.querySelector('.cards');
  console.log(loadData);
  
  for (key in loadData) {
  list.innerHTML = JSON.stringify(loadData)
        `
          <div class="card__item">
              <div class="card__cover">
              <img class="card__img" src=${loadData[key].name } alt="">
              </div>
              <div class="card__info">
                  <p class="card__name">${loadData[key].price}</p>
              </div>
              <a href="#" class="card__button">Add to cart</a>
          </div>
        `
  
  }
  return list;
}




