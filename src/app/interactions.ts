import { CollectionService } from "./collection.service";
import { ObjectOnMap } from "./core";

export function interact(o: ObjectOnMap, cs: CollectionService) {
    const interaction = o.type.interaction;
    if (interaction) {
        if (interaction in ALL_INTERACTIONS) {
            ALL_INTERACTIONS[interaction](o, cs);
        } else {
            alert("Unknown interaction: " + interaction)
        }
    }
}

function d20(): number {
    return Math.floor(Math.random() * 20) + 1;
}

const ALL_INTERACTIONS: { [key: string]: (o:ObjectOnMap, cs:CollectionService) => void} = {

    //GATES
    YellowKeyGate(o: ObjectOnMap, cs: CollectionService) {
        if (cs.yellowKeys > 0) {
            alert("Opening gate!");
            cs.yellowKeys--;
            o.remove();
        } else {
            alert("Not enough yellow keys!");
        }
    },

    BlueKeyGate(o: ObjectOnMap, cs: CollectionService) {
        if (cs.blueKeys > 0) {
            alert("Opening gate!");
            cs.blueKeys--;
            o.remove();
        } else {
            alert("Not enough blue keys!");
        }
    },

    RedKeyGate(o: ObjectOnMap, cs: CollectionService) {
        if (cs.redKeys > 0) {
            alert("Opening gate!");
            cs.redKeys--;
            o.remove();
        } else {
            alert("Not enough red keys!");
        }
    },

    //HAZARDS
    Door15(o: ObjectOnMap, cs: CollectionService) {
        const roll = d20();
        alert(`${cs.str + roll} vs 15`);
        if (cs.str + roll >= 15) {
            o.remove();
        } else {
            cs.hp -= 5;
        }
    },

    Pit15(o: ObjectOnMap, cs: CollectionService) {
        const roll = d20();
        alert(`${cs.dex + roll} vs 15`);
        if (cs.dex + roll >= 15) {
            o.remove();
        } else {
            cs.hp -= 5;
        }
    },

    Riddle15(o: ObjectOnMap, cs: CollectionService) {
        const roll = d20();
        alert(`${cs.int + roll} vs 15`);
        if (cs.int + roll >= 15) {
            o.remove();
        } else {
            cs.hp -= 5;
        }
    },

    Spikes15(o: ObjectOnMap, cs: CollectionService) {
        const roll = d20();
        alert(`${cs.vit + roll} vs 15`);
        if (cs.vit + roll >= 15) {
            o.remove();
        } else {
            cs.hp -= 5;
        }
    },

    Magic15(o: ObjectOnMap, cs: CollectionService) {
        const roll = d20();
        alert(`${cs.spi + roll} vs 15`);
        if (cs.spi + roll >= 15) {
            o.remove();
        } else {
            cs.hp -= 5;
        }
    },
}