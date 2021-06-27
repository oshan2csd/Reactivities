
/**
 * This store stores all other stores
 */

import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";

interface Store{
    activityStore: ActivityStore
}

export const store: Store = {
    activityStore: new ActivityStore()
}

export const StoreContext = createContext(store);



/* This hook allows to use store inside components */
export function useStore() {
    return useContext(StoreContext);
}
