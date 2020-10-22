import { EMPTY_CELL } from "./consts.js";

const createElement = (element) => document.createElement(element);
const createTextNode = (name) => document.createTextNode(name);

export const getMenuItemHTML = (name, event) => {
    const item = createElement('div');
    const itemName = createTextNode(name);
    item.appendChild(itemName);
    item.setAttribute("id", `menu-${name}`);
    item.addEventListener('click', event);
    return item;
}

export const getModal = () => {
    const modal = createElement('div');
    const modalContent = createElement('div');
    const close = createElement('span');

    modal.setAttribute('id', 'myModal');
    modal.classList.add('modal');

    modalContent.classList.add('modal-content');
    close.classList.add('close');

    close.innerHTML = '&times;';
    modalContent.appendChild(close);
    modal.appendChild(modalContent);

    close.onclick = function() {
        modal.style.display = "none";
    }
    return modal;
}