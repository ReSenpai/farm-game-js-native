export class Resources {
    constructor(resources) {
        this.resources = resources;
    }
    _createResourceName(name) {
        return `${name} : ${this.resources[name]}`;
    }
    _createResourceItem(name) {
        const item = document.createElement('div');
        const itemName = document.createTextNode(this._createResourceName(name));
        item.appendChild(itemName);
        item.setAttribute("id", `resource-${name}`);
        return item;
    }
    renderResourceStats(element) {
        Object.keys(this.resources).forEach(name => {
            element.appendChild(this._createResourceItem(name));
        });
    }
    increase(name, value) {
        const resource = document.getElementById(`resource-${name}`);
        this.resources[name] += value;
        resource.innerHTML = this._createResourceName(name);
    }
}