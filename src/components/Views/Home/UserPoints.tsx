import { useState, useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/TypedStoreHooks'
import { getUser } from '../../redux/user'
import PointsAdder from './PointsAdder'
import coinImage from '../../../assets/img/coin.svg'

const UserPoints = (): JSX.Element | null => {
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.user.user)
    const pointsRef = useRef<HTMLDivElement>(null)
    const [ loadingUser, setLoadingUser ] = useState<boolean>(true)
    const [ errorOnLoading, setErrorOnLoading ] = useState<boolean>(false)
    const setPoints = (): void => {
        if (pointsRef.current) {
            pointsRef.current.classList.toggle('open')
            if (!(pointsRef.current.classList.contains('open'))) {
                const pointsItems:
                NodeListOf<HTMLButtonElement> = pointsRef.current.querySelectorAll('.points-item button')
                for (let i = 0; i < pointsItems.length; i++) {
                    if (pointsItems[i].classList.contains('selected')) {
                        pointsItems[i].classList.remove('selected')
                        break
                    }
                }
            }
        }
    }
    useEffect(() => {
        dispatch(getUser())
            .then(() => setLoadingUser(false))
            .catch(() => {
                setLoadingUser(false)
                setErrorOnLoading(true)
            })
    }, [])
    if (loadingUser) return <p>Loading user...</p>
    if (!loadingUser && !errorOnLoading) {
        return (
            <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-400">{user?.name}</span>
                <div className="relative">
                    <button
                        type="button"
                        className="flex items-center gap-1 rounded-xl py-1 px-3 font-semibold border shadow-sm"
                        onClick={setPoints}
                    >
                        <span
                            className="bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent"
                        >
                            {user?.points}
                        </span>
                        <img src={coinImage} alt="Moneda" className="w-[1.5em]" />
                    </button>
                    <PointsAdder ref={pointsRef} />
                </div>
            </div>
        )
    }
    return null
}

export default UserPoints
