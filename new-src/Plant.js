import { BaseItem } from "./BaseItem.js";
import { WHEAT } from "./consts.js";

export class Plant extends BaseItem {
    constructor(name, readyTime, element) {
        super(name, readyTime, element);
        this.timeoutId = null;
        this.needTimer = true;
        this.setItem();
        this.plantToCell();
    }

    setItem() {
        this.element.classList.add(this.name);
    }

    getResourceIcon(item) {
        const сonverter = {
            [WHEAT]: '🌾'
        }
        return сonverter[item];
    }
    
    plantToCell() {
        const timer = this.getTimer(this.readyTime);
        this.timeoutId = this.showTimerToReady();
        const resourceIcon = this.getResourceIcon(this.name);
        
        timer.then(() => {
            clearInterval(this.timeoutId);
            this.readyTimeIcon.innerHTML = '';
            this.resourceCount++;
            this.resourceIcon.innerHTML = `${resourceIcon} ${this.resourceCount}`;
            this.needTimer && this.plantToCell();
        })
    }

    clearTimers = () => {
        clearInterval(this.timeoutId);
        this.needTimer = false;
    }
}