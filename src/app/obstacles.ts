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

export const XpGate1: ObjectType = {
    name: "1 XP Gate",
    img: "xp_gate_1.png",
    collectable: false,
    interaction: "XpGate1"
}

export const XpGate2: ObjectType = {
    name: "2 XP Gate",
    img: "xp_gate_2.png",
    collectable: false,
    interaction: "XpGate2"
}

export const XpGate5: ObjectType = {
    name: "5 XP Gate",
    img: "xp_gate_5.png",
    collectable: false,
    interaction: "XpGate5"
}

export const ALL_GATES = [YellowKeyGate, BlueKeyGate, RedKeyGate, XpGate1, XpGate2, XpGate5];


//HAZARDS
export const Door15: ObjectType = {
    name: "Stuck Door",
    img: "door.png",
    collectable: false,
    interaction: "Door15" //todo
}

export const Pit15: ObjectType = {
    name: "Chasm",
    img: "chasm.png",
    collectable: false,
    interaction: "Pit15" //todo
}

export const Riddle15: ObjectType = {
    name: "Riddle",
    img: "riddle.png",
    collectable: false,
    interaction: "Riddle15" //todo
}

export const Spikes15: ObjectType = {
    name: "Spike Trap",
    img: "spikes.png",
    collectable: false,
    interaction: "Spikes15" //todo
}

export const Magic15: ObjectType = {
    name: "Magic Circle",
    img: "magic_circle.png",
    collectable: false,
    interaction: "Magic15" //todo
}

export const ALL_HAZARDS = [Door15, Pit15, Riddle15, Spikes15, Magic15];