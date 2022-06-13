import { IPlantsProps, ItemID } from "../models/items.js";

export const plants: IPlantsProps[] = [
  {
    id: ItemID.Wheat,
    image: "../../assets/wheat.jpg",
    artImage: "../../assets/wheat_art.jpg",
    name: "Пшеница",
    description:
      "Получаемая из зёрен пшеницы мука используется при выпекании хлеба, изготовлении макаронных и кондитерских изделий. Пшеница также используется как кормовая культура, входит в некоторые рецепты приготовления пива и водки, а также виски.",
    growthTime: 20,
    itemCount: 5,
    resourceCost: 1,
  },
  {
    id: ItemID.Rice,
    image: "../../assets/rice.jpg",
    artImage: "../../assets/rice_art.jpg",
    name: "Рис",
    description:
      "Очень требователен к условиям выращивания, может быть погублен заморозками. Рис очень любит влагу, и его побеги растут прямо из воды. Семена прорастают при 10—12 °C",
    growthTime: 40,
    itemCount: 10,
    resourceCost: 3,
  },
  {
    id: ItemID.Mushroom,
    image: "../../assets/mashrooms.jpg",
    artImage: "../../assets/fly_agaric_art.jpg",
    name: "Грибы",
    description:
      "Большинство мухоморов несъедобны или сильно ядовиты, есть опасные смертельно ядовитые виды (бледная поганка, мухомор вонючий), которые иногда путают со съедобными грибами. Общеизвестный мухомор красный в сыром виде и без должной обработки, кроме средней токсичности, обладает также галлюциногенным действием.",
    growthTime: 60,
    itemCount: 15,
    resourceCost: 7,
  },
  {
    id: ItemID.Corn,
    image: "../../assets/corn.jpg",
    artImage: "../../assets/corn_art.jpg",
    name: "Кукуруза",
    description:
      "Кукуруза – один из самых древних однолетних злаков, известных человечеству. Найдены упоминания о том, что кукуруза была одомашнена почти 9 тыс. лет назад в Мексике.",
    growthTime: 30,
    itemCount: 20,
    resourceCost: 5,
  },
];
