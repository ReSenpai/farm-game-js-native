export class Menu {
    constructor(events) {
        this.modal = null;
        this.modalContainer = null;
        this.menuText = null;
        this.wheat = null;
        this.deletePlant = null;
        this.events = events;
        this._createMenu();
    }

    _createMenu() {
        const modal = document.createElement('div');
        const modalOverlay = document.createElement('div');
        const modalContainer = document.createElement('div');
        const modalText = document.createElement('p');
        const modalClose = document.createElement('button');
        const plant = document.createElement('button');
        const deletePlant = document.createElement('button');

        modal.classList.add('modal');
        modalOverlay.classList.add('modal-overlay');
        modalContainer.classList.add('modal-container');
        modalClose.classList.add('modal-close');
        modalClose.innerHTML = '&#10005;';
        modalOverlay.addEventListener('click', this.close.bind(this));
        modalClose.addEventListener('click', this.close.bind(this));
        plant.innerHTML = 'Пшеница';
        deletePlant.innerHTML = 'Удалить';
        plant.addEventListener('click', this.events.plantOnCell);
        deletePlant.addEventListener('click', this.events.cleanCell);

        this.menuText = modalText;

        modalContainer.append(modalText, modalClose, plant, deletePlant);
        modal.append(modalOverlay, modalContainer);

        this.modalContainer = modalContainer;
        this.modal = modal;
        this.wheat = plant;
        this.deletePlant = deletePlant;
    }

    getMenu = () => this.modal;

    show() {
        this.modal.classList.add('open');
    }

    close () {
        this.modal.classList.remove('open');
    }
    
}