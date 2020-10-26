import { BaseItem } from "./BaseItem.js";

export class Plant extends BaseItem {
    constructor(name, readyTime, element) {
        super(name, readyTime, element);
        this.setItem();
        this.plantToCell();
    }

    setItem() {
        this.element.classList.add('wheat');
    }
    
    plantToCell() {
        const timer = this.getTimer(this.readyTime);
        const showTimerToReady = this.showTimerToReady();
        
        timer.then(() => {
            clearInterval(showTimerToReady);
            this.readyTimeIcon.innerHTML = '';
        })
    }
}