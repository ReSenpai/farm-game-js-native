export enum ItemID {
  Wheat = "Wheat",
  Rice = "Rice",
  Mushroom = "Mushroom",
  Corn = "Corn",
  Grass = "Grass",
}

export interface IPlantsProps {
  id: ItemID;
  image: string;
  artImage: string;
  name: string;
  description: string;
  growthTime: number;
  resourceCost: number;
  itemCount: number;
  resourceMultiplier?: number;
  maxResources?: number;
}
