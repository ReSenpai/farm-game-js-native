export class BaseItem {
    /**
     * Item Behaviours
     * @param {string} name Item name
     * @param {number} readyTime Time to get resources
     * @param {HTMLElement} element 
     */
    constructor(name, readyTime, element) {
        this.name = name;
        this.readyTime = readyTime;
        this.element = element;
        this.resourceCount = 0;
        this.timeoutId = null;
        this.needTimer = true;
        this.resourceIcon = this._getSpan();
        this.hungerIcon = this._getSpan();
        this.readyTimeIcon = this._getSpan();
        this.foodTimeIcon = this._getSpan();
        this.setSpans();
    }

    _getSpan = () => document.createElement('span');

    getTimer(value) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, value * 1000)
        });
    }

    showTimerToReady() {
        let counter = 0;
        this.readyTimeIcon.innerHTML = `⏱️ ${this.readyTime}`;
        return setInterval(() => {
            console.log('timer')
            if (this.readyTime - counter < 1) clearInterval(this.showTimerToReady);
            counter++;
            this.readyTimeIcon.innerHTML = `⏱️ ${this.readyTime - counter}`;
        }, 1000);
    }

    setSpans() {
        const { resourceIcon, hungerIcon, readyTimeIcon, foodTimeIcon } = this;
        this.element.append(resourceIcon, hungerIcon, readyTimeIcon, foodTimeIcon);
    }
    /**
     * Remove ?
     */
    removeSpans() {
        this.element.querySelectorAll('span').forEach(span => span.remove());
    }

    clearTimers = () => {
        clearInterval(this.timeoutId);
        this.needTimer = false;
    }
}