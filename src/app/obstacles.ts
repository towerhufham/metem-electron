import { ObjectType } from "./core"

//GATES
export const YellowKeyGate: ObjectType = {
    name: "Yellow Key Gate",
    img: "yellow_key_gate.png",
    collectable: false,
    interaction: "YellowKeyGate"
}

export const BlueKeyGate: ObjectType = {
    name: "Blue Key Gate",
    img: "blue_key_gate.png",
    collectable: false,
    interaction: "BlueKeyGate"
}

export const RedKeyGate: ObjectType = {
    name: "Red Key Gate",
    img: "red_key_gate.png",
    collectable: false,
    interaction: "RedKeyGate"
}

export const ALL_GATES = [YellowKeyGate, BlueKeyGate, RedKeyGate];


//HAZARDS
export const StuckDoor: ObjectType = {
    name: "Stuck Door",
    img: "door.png",
    collectable: false,
    interaction: "" //todo
}

export const ALL_HAZARDS = [StuckDoor];