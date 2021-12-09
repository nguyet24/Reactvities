import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";

interface Store {
    activityStore: ActivityStore 
}

export const store: Store = {
    activityStore: new ActivityStore()
}

//This must be imported from React only
export const StoreContext = createContext(store);

//React Hook that will allow us to use the above stores from any components
//This must be set up in the Index.tsx file
export function useStore() {
    return useContext(StoreContext);
}