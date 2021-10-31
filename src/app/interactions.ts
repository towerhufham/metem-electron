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

const ALL_INTERACTIONS: { [key: string]: (o:ObjectOnMap, cs:CollectionService) => void} = {

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
    }
}