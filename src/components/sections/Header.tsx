import { Link, useLocation } from 'react-router-dom'
import { useAppDispatch } from '../hooks/TypedStoreHooks'
import { resetUser } from '../redux/user'
import { resetProducts } from '../redux/products'
import aerolabLogo from '../../assets/img/aerolab-logo.svg'
import UserPoints from '../Views/Home/UserPoints'

const Header = (): JSX.Element => {
    const dispatch = useAppDispatch()
    const actualPath: string = useLocation().pathname
    return (
        <header
            className={`
                fixed 
                top-0 
                left-0 
                w-full 
                h-[var(--header-size)] 
                z-40 
                flex 
                items-center
                ${actualPath !== '/' && actualPath !== '/home' ? 'bg-gray-900' : 'bg-white shadow-md'}`}
        >
            <div className="page-container">
                <div className="flex justify-between items-center">
                    <Link
                        to="/"
                        onClick={() => {
                            dispatch(resetProducts())
                            dispatch(resetUser())
                        }}
                    >
                        <img src={aerolabLogo} alt="Logo de Aerolab" />
                    </Link>
                    { actualPath === '/home' && <UserPoints /> }
                </div>
            </div>
        </header>
    )
}

export default Header
