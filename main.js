class Gallary{
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
        this.gallaryItems = this.createElement('div', {className: options.selectorItems});
        this.wrapper = this.createElement('div', {className: options.wrapper});
        this.buttonNext = this.createElement('button', {
            className: 'next',
           // text: 'next',
           // scr: '/images/next.png',
            attr: {
                ['data-btn']: 'next',
            }
        });
        this.buttonPrev = this.createElement('button', {
            className: 'prev',
           // text: 'prev',
            attr: {
                ['data-btn']: 'prev',
               
            }
        
        }); 
        // TODO: ! навесить на кнопки события
        this.items = options.gallaryItems.items.map(item => {
            return this.createElement('img', {
                src: item, 
                className: options.gallaryItems.className
            })
        })
      
    }

    setHtmlElements() {
        this.gallary.appendChild(this.gallaryItems);
        this.gallaryItems.appendChild(this.wrapper);
        this.wrapper.append(...this.items);
        this.gallary.append(this.buttonNext, this.buttonPrev);
        console.log(this);
    }

    createElement(tagName, options) {
        const tag = document.createElement(tagName);
        if(options.hasOwnProperty('className')) {
            tag.classList.add(options.className)
        }
        if(options.hasOwnProperty('attr')) {
            Object.entries(options.attr).map(([key, value]) => {
                tag.setAttribute(key, value)
            }); 
              
        }
        if(options.hasOwnProperty('text')) {
            tag.innerHTML = options.text
        }
        if (options.hasOwnProperty('src')) {
            tag.src = options.src
        }
        return tag;
        
    }

    initListeners() {
        debugger
        this.gallary.addEventListener('click', (event) => {
            console.log(event.target);
            if(event.target.dataset?.btn === 'next' ) this.next();
            if(event.target.dataset?.btn === 'prev' ) this.prev();
        })
    }
        
    next() {
       
        if(this.slideIndex < this.slideLength - 1) {
            this.slideIndex += 1
        } else {
            this.slideIndex = 0;
        }
        
        this.move();
    }

    prev() {
        if(this.slideIndex  !== 0) {
            this.slideIndex -= 1
        }else{
            this.slideIndex = this.slideLength - 1;
        }
        this.move();
        
    }
      
    move() {
        this.wrapper.style.transform = `translateX(${-this.stepPercent * this.slideIndex}%)`;

    }
  }
  
  new Gallary('.gallary', {
    root: 'gallary',
    wrapper:'gallary__items__wrapper',
    selectorItems:'gallary__item', 
    buttons: true, // swipe
    autoslide: false, // автоматический слайд
    gallaryItems: {
        className: 'gallary__item',
        items: [
            './img/1.png', 
            './img/2.png', 
            './img/3.png']

    }

  })