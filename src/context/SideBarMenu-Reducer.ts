import { AppContextInterface } from "../interfaces/Context";


type SideBarMenuAction =
    | { type: 'addSideBarMenu', payload: AppContextInterface }

export const SideBarMenuReducer = (state: AppContextInterface, action: SideBarMenuAction) => {


    switch (action.type) {
        case 'addSideBarMenu':

           return{
               ...state,
               sideBars:[...state.items,action.payload]
           }

        default:
            return state;
    }

}