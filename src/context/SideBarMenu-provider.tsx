
import { SideBarMenuContext } from "./SideBarMenu-context"
import { AppContextInterface } from '../interfaces/Context';
import { FcAdvertising } from 'react-icons/fc';
import profile from '../assets/Image/descarga.png'
import { useReducer } from 'react';
import { SideBarMenuReducer } from './SideBarMenu-Reducer';
/*interface AppContextInterface {
    items: SideBarMenuItem[] | SideBarMenuItem;
    card: SideBarMenuCard;
}*/

const INITIAL_STATE: AppContextInterface = {
    items: [
        {
            id: "1",
            label: "diel",
            icon: FcAdvertising,
            url: '/Config'
        },
        {
            id: "2",
            label: "Mc",
            icon: FcAdvertising,
            url: '/'
        },
        {
            id: "3",
            label: "obanm",
            icon: FcAdvertising,
            url: '/'
        }
    ],

    card: {
        id: "card01",
        displayName: 'Mcdiel',
        title: 'UCR',
        photoUrl: profile,
        url: '/'
    }
}
interface propsF {
    children: JSX.Element | JSX.Element[]
}
export const SideBarMenuProvider = ({ children }: propsF) => {

    const [SideBarMenuState, dispacth] = useReducer(SideBarMenuReducer, INITIAL_STATE);
    return (
        <SideBarMenuContext.Provider value={{SideBarMenuState}}>
            {children}
        </SideBarMenuContext.Provider>)
}