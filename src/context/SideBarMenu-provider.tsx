
import { SideBarMenuContext } from "./SideBarMenu-context"
import { AppContextInterface } from '../interfaces/Context';
import { FcAdvertising,FcSettings,FcAddImage,FcHome,FcViewDetails } from 'react-icons/fc';
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
            label: "Home",
            icon: FcHome,
            url: '/home'
        },
        {
            id: "2",
            label: "Configuraciones",
            icon: FcSettings,
            url: '/Config'
        },
        {
            id: "3",
            label: "Añadir documento",
            icon: FcAddImage,
            url: '/Documents'
        },
        {
            id: "4",
            label: "Ver documentos",
            icon: FcViewDetails,
            url: '/ViewDocument'
        },
        {
            id: "5",
            label: "Ver bloques",
            icon: FcViewDetails,
            url: '/bloques'
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