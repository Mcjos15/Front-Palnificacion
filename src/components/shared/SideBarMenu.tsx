
import { useContext, useState } from 'react'
import { classNames } from '../../util/classes';
import { VscMenu } from 'react-icons/vsc'
import SideBarMenuCardView from './SideBarMenuCardView';
import SideBarMenuItemView from './SideBarMenuItemView';
import { SideBarMenuContext } from '../../context/SideBarMenu-context';


//{ items, card }: SideBarMenuProps

export function SideBarMenu() {

    // const {items,card} = useSideBarMenu(); 
    const { SideBarMenuState } = useContext(SideBarMenuContext);
    const { card, items } = SideBarMenuState;

    const [isOpen, setIsOpen] = useState<boolean>(false);

    function handleClick() {

        setIsOpen(!isOpen);

    }
    return <div
        className={classNames("SideBarMenu", isOpen ? "expanded" : "collapsed")}>

        <div className='menuButton'>
            <button className='hamburgerIcon' onClick={handleClick}>
                <VscMenu />
            </button>
        </div>
        <SideBarMenuCardView card={card} isOpen={isOpen} />
        {
            items.map(item => (
                <SideBarMenuItemView key={item.id} item={item} isOpen={isOpen} />
            ))
        }
    </div>
}