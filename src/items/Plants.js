export class Plants {
    constructor ({
        image,
        name,
        growthTime,
        resourceMultiplier = 1,
        resourceCost,
        itemCount,
        maxResources = 10
    }) {
        // base parameters
        this.image = image;
        this.name = name;
        this.growthTime = growthTime;
        this.resourceMultiplier = resourceMultiplier;
        this.resourceCost = resourceCost;
        this.itemCount = itemCount;
        this.timeCounter = growthTime;
        this.resourceCounter = 0;
        this.maxResources = maxResources;

        // statuses
        this.waterSaturated = false;
    }

    applyWater = () => {
        if (this.waterSaturated) {
            return;
        }

        this.resourceMultiplier = this.resourceMultiplier * 1.20;
        this.waterSaturated = true;
    }

    makeGameTick = () => {
        if (this.resourceCounter === this.maxResources) {
            return;
        }

        if (!this.timeCounter) {
            this.timeCounter = this.growthTime;
            this.resourceCounter++;
            return;
        }

        this.timeCounter--;
    }
}