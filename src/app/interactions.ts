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
        if (cs.collects.yellowKeys > 0) {
            alert("Opening gate!");
            cs.collects.yellowKeys--;
            o.remove();
        } else {
            alert("Not enough yellow keys!");
        }
    },

    BlueKeyGate(o: ObjectOnMap, cs: CollectionService) {
        if (cs.collects.blueKeys > 0) {
            alert("Opening gate!");
            cs.collects.blueKeys--;
            o.remove();
        } else {
            alert("Not enough blue keys!");
        }
    },

    RedKeyGate(o: ObjectOnMap, cs: CollectionService) {
        if (cs.collects.redKeys > 0) {
            alert("Opening gate!");
            cs.collects.redKeys--;
            o.remove();
        } else {
            alert("Not enough red keys!");
        }
    },

    XpGate1(o: ObjectOnMap, cs: CollectionService) {
        const value = 1;
        if (cs.collects.xp >= value) {
            alert("Opening gate!");
            cs.collects.xp -= value;
            o.remove();
        } else {
            alert("Not enough XP!");
        }
    },

    XpGate2(o: ObjectOnMap, cs: CollectionService) {
        const value = 2;
        if (cs.collects.xp >= value) {
            alert("Opening gate!");
            cs.collects.xp -= value;
            o.remove();
        } else {
            alert("Not enough XP!");
        }
    },

    XpGate5(o: ObjectOnMap, cs: CollectionService) {
        const value = 5;
        if (cs.collects.xp >= value) {
            alert("Opening gate!");
            cs.collects.xp -= value;
            o.remove();
        } else {
            alert("Not enough XP!");
        }
    },

    //HAZARDS
    Door15(o: ObjectOnMap, cs: CollectionService) {
        const value = 15;
        if (cs.collects.str < value) {
            cs.takeDamage(value - cs.collects.str)
        }
        o.remove()
    },

    Pit15(o: ObjectOnMap, cs: CollectionService) {
        const value = 15;
        if (cs.collects.dex < value) {
            cs.takeDamage(value - cs.collects.dex)
        }
        o.remove()
    },

    Riddle15(o: ObjectOnMap, cs: CollectionService) {
        const value = 15;
        if (cs.collects.int < value) {
            cs.takeDamage(value - cs.collects.int)
        }
        o.remove()
    },

    Spikes15(o: ObjectOnMap, cs: CollectionService) {
        const value = 15;
        if (cs.collects.vit < value) {
            cs.takeDamage(value - cs.collects.vit)
        }
        o.remove()
    },

    Magic15(o: ObjectOnMap, cs: CollectionService) {
        const value = 15;
        if (cs.collects.spi < value) {
            cs.takeDamage(value - cs.collects.spi)
        }
        o.remove()
    },
}