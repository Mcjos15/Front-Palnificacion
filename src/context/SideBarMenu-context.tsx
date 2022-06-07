import React from 'react'

import { AppContextInterface } from '../interfaces/Context';

export type SideBarMenuContextProps = {
    SideBarMenuState: AppContextInterface
}
export const SideBarMenuContext = React.createContext<SideBarMenuContextProps>({} as SideBarMenuContextProps);
