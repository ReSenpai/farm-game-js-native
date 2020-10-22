export class BaseItem {
    constructor(name, readyTime) {
        this.name = name;
        this.readyTime = readyTime;
    }
    getCell(cellId) {
        return document.getElementById(cellId);
        
    }
    startTimer(element) {
        const timer = this.showTimer(element);
        element.classList.add('preparing');
        this.timerToReady().then(() => {
            clearInterval(timer);
            element.classList.remove('preparing');
            element.innerHTML = '✅';
            element.classList.add('done');
        });
    }
    showTimer(currentItem) {
        let counter = 0;
        return setInterval(() => {
            counter++
            currentItem.innerHTML = this.readyTime - counter;
        }, 1000);
    }
    timerToReady() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, this.readyTime * 1000)
        });
    }
}

export class Animal extends BaseItem {
    constructor(name, readyTime, satietyTimer) {
        super(name, readyTime);
        this.satietyTimer = satietyTimer;
    }
}