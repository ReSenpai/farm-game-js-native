import { IPlantsProps, ItemID } from "../models/items.js";

export const plants: IPlantsProps[] = [
  {
    id: ItemID.Wheat,
    image: "../../assets/wheat.jpg",
    name: "Пшеница",
    growthTime: 20,
    itemCount: 5,
    resourceCost: 1,
  },
  {
    id: ItemID.Rice,
    image: "../../assets/rice.jpg",
    name: "Рис",
    growthTime: 40,
    itemCount: 10,
    resourceCost: 3,
  },
  {
    id: ItemID.Mushroom,
    image: "../../assets/mashrooms.jpg",
    name: "Грибы",
    growthTime: 60,
    itemCount: 15,
    resourceCost: 7,
  },
  {
    id: ItemID.Corn,
    image: "../../assets/corn.jpg",
    name: "Кукуруза",
    growthTime: 30,
    itemCount: 20,
    resourceCost: 5,
  },
];
