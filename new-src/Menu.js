import { CHICKEN_RUS, COW_RUS, WHEAT_RUS } from "./consts.js";

export class Menu {
    constructor(events) {
        this.modal = this.getElement('div', 'modal');
        this.modalOverlay = this.getElement('div', 'modal-overlay');
        this.modalContainer = this.getElement('div', 'modal-container');
        this.menuText = this.getElement('p');
        this.modalClose = this.getElement('button', 'modal-close');
        this.menuButtonWrapper = this.getElement('div');
        this.wheat = this.getElement('button');
        this.chicken = this.getElement('button');
        this.cow = this.getElement('button');
        this.deletePlant = this.getElement('button');
        this.events = events;
        this._createMenu();
    }

    getElement(type, classname) {
        const element = document.createElement(type);
        classname && element.classList.add(classname);
        return element;
    }

    collectItemMenu(arr) {
        return arr.map(name => this.getElement(name, 'item-menu'));
    }

    _createMenu() {  
        this.modalClose.innerHTML = '&#10005;';
        this.modalOverlay.addEventListener('click', this.close.bind(this));
        this.modalClose.addEventListener('click', this.close.bind(this));
        this.wheat.innerHTML = WHEAT_RUS;
        this.chicken.innerHTML = CHICKEN_RUS;
        this.cow.innerHTML = COW_RUS;
        this.deletePlant.innerHTML = 'Удалить';
        this.wheat.addEventListener('click', this.events.plantWheat);
        this.chicken.addEventListener('click', this.events.placeAnimal(10, 30));
        this.cow.addEventListener('click', this.events.placeAnimal(20, 20));
        this.deletePlant.addEventListener('click', this.events.closeMenu);


        this.menuButtonWrapper.append(this.wheat, this.chicken, this.cow, this.deletePlant);
        this.modalContainer.append(this.menuText, this.modalClose, this.menuButtonWrapper);
        this.modal.append(this.modalOverlay, this.modalContainer);
    }

    setMenuText(value) {
        console.log(this.menuText);
        this.menuText.innerHTML = `Клетка номер ${value}`;
    }

    getMenu = () => this.modal;

    show() {
        this.modal.classList.add('open');
    }

    close () {
        this.modal.classList.remove('open');
    }
    
}