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

// function d20(): number {
//     return Math.floor(Math.random() * 20) + 1;
// }


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

    XpGate1(o: ObjectOnMap, cs: CollectionService) {
        const value = 1;
        if (cs.xp >= value) {
            alert("Opening gate!");
            cs.xp -= value;
            o.remove();
        } else {
            alert("Not enough XP!");
        }
    },

    XpGate2(o: ObjectOnMap, cs: CollectionService) {
        const value = 2;
        if (cs.xp >= value) {
            alert("Opening gate!");
            cs.xp -= value;
            o.remove();
        } else {
            alert("Not enough XP!");
        }
    },

    XpGate5(o: ObjectOnMap, cs: CollectionService) {
        const value = 5;
        if (cs.xp >= value) {
            alert("Opening gate!");
            cs.xp -= value;
            o.remove();
        } else {
            alert("Not enough XP!");
        }
    },

    //HAZARDS
    Door15(o: ObjectOnMap, cs: CollectionService) {
        const value = 15;
        if (cs.str < value) {
            cs.takeDamage(value - cs.str)
        }
        o.remove()
    },

    Pit15(o: ObjectOnMap, cs: CollectionService) {
        const value = 15;
        if (cs.dex < value) {
            cs.takeDamage(value - cs.dex)
        }
        o.remove()
    },

    Riddle15(o: ObjectOnMap, cs: CollectionService) {
        const value = 15;
        if (cs.int < value) {
            cs.takeDamage(value - cs.int)
        }
        o.remove()
    },

    Spikes15(o: ObjectOnMap, cs: CollectionService) {
        const value = 15;
        if (cs.vit < value) {
            cs.takeDamage(value - cs.vit)
        }
        o.remove()
    },

    Magic15(o: ObjectOnMap, cs: CollectionService) {
        const value = 15;
        if (cs.spi < value) {
            cs.takeDamage(value - cs.spi)
        }
        o.remove()
    },
}