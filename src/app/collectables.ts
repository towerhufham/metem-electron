import { ObjectType } from "./core";

//keys
export const YellowKey: ObjectType = {
    name: "Yellow Key",
    img: "yellow_key.png",
    collectable: true,
}

export const BlueKey: ObjectType = {
    name: "Blue Key",
    img: "blue_key.png",
    collectable: true,
}

export const RedKey: ObjectType = {
    name: "Red Key",
    img: "red_key.png",
    collectable: true,
}

//points
export const xpPickup: ObjectType = {
    name: "XP +1",
    img: "xp_bubble_small.png",
    collectable: true,
}

//basic pickups
export const strPickup: ObjectType = {
    name: "STR +1",
    img: "str.png",
    collectable: true,
}
export const dexPickup: ObjectType = {
    name: "DEX +1",
    img: "dex.png",
    collectable: true,
}
export const intPickup: ObjectType = {
    name: "INT +1",
    img: "int.png",
    collectable: true,
}
export const vitPickup: ObjectType = {
    name: "VIT +1",
    img: "vit.png",
    collectable: true,
}
export const spiPickup: ObjectType = {
    name: "SPI +1",
    img: "spi.png",
    collectable: true,
}


export const ALL_COLLECTABLES: ObjectType[] = [
    YellowKey,
    BlueKey,
    RedKey,
    xpPickup,
    strPickup,
    dexPickup,
    intPickup,
    vitPickup,
    spiPickup
];