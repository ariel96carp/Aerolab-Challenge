import {
    forwardRef,
    MouseEvent,
    useRef,
    useState,
    useEffect
} from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks/TypedStoreHooks'
import { addPoints } from '../../redux/user'
import aerolabImage from '../../../assets/img/aeropay-2.svg'
import AlertModal from '../../common/AlertModal'
import Loader from '../../common/Loader'

type RefProp = HTMLDivElement
const PointsAdder = forwardRef<RefProp>((props, ref) => {
    const buttonsListRef = useRef<HTMLUListElement>(null)
    const dispatch = useAppDispatch()
    const [ loadingPoints, setLoadingPoints ] = useState<boolean>(false)
    const [ pointsAdded, setPointsAdded ] = useState<boolean>(false)
    const [ pointsError, setPointsError ] = useState<boolean>(false)
    const [ closePoints, setClosePoints ] = useState<boolean>(false)
    useEffect(() => {
        const closeCard = (): Promise<void> => new Promise((resolve) => {
            if (ref && typeof (ref) !== 'function') {
                if (closePoints) ref.current?.classList.remove('open')
                resolve()
            }
        })
        const asyncClosed = async () => {
            await closeCard()
            setClosePoints(false)
        }
        if (closePoints) void asyncClosed()
    }, [ closePoints ])
    const getSelected = () => {
        if (buttonsListRef.current) {
            const buttons: NodeListOf<HTMLButtonElement> = buttonsListRef.current.querySelectorAll('.points-item button')
            for (let i = 0; i < buttons.length; i++) {
                if (buttons[i].classList.contains('selected')) {
                    const pointsToAdd = parseInt(buttons[i].textContent as string, 10)
                    setLoadingPoints(true)
                    dispatch(addPoints(pointsToAdd))
                        .then(() => {
                            setLoadingPoints(false)
                            setPointsAdded(true)
                            buttons[i].classList.remove('selected')
                        })
                        .catch(() => {
                            setLoadingPoints(false)
                            setPointsError(true)
                            buttons[i].classList.remove('selected')
                        })
                    break
                }
            }
        }
    }
    const deleteSelected = (
        pointsButtons: NodeListOf<HTMLButtonElement>
    ): Promise<void> => new Promise(
        (resolve) => {
            for (let i = 0; i < pointsButtons.length; i++) {
                if (pointsButtons[i].classList.contains('selected')) {
                    pointsButtons[i].classList.remove('selected')
                    break
                }
            }
            resolve()
        }
    )
    const setAsyncSelected = async (
        pointsButtons: NodeListOf<HTMLButtonElement>,
        e: MouseEvent<HTMLButtonElement>
    ): Promise<void> => {
        if (!(e.currentTarget.classList.contains('selected'))) {
            await deleteSelected(pointsButtons)
            const elementSelected: HTMLElement = e.target as HTMLElement
            let listenerAttachedButton: HTMLButtonElement
            if (elementSelected.tagName !== 'BUTTON') {
                listenerAttachedButton = elementSelected.closest('button') as HTMLButtonElement
            } else listenerAttachedButton = elementSelected as HTMLButtonElement
            listenerAttachedButton.classList.add('selected')
        } else e.currentTarget.classList.remove('selected')
    }
    const setSelected = (e: MouseEvent<HTMLButtonElement>): void => {
        if (ref && typeof (ref) !== 'function') {
            if (ref.current) {
                const pointsButtons: NodeListOf<HTMLButtonElement> = ref.current.querySelectorAll('.points-item button')
                void setAsyncSelected(pointsButtons, e)
            }
        }
    }
    const user = useAppSelector((state) => state.user.user)
    return (
        <div ref={ref} className="user-points shadow-md">
            { loadingPoints && <Loader /> }
            {
                pointsAdded
                    && (
                        <AlertModal
                            closeModal={() => setPointsAdded(false)}
                            closePoints={() => setClosePoints(true)}
                            type="points"
                        />
                    )
            }
            {
                pointsError
                    && (
                        <AlertModal
                            isChecked={false}
                            closeModal={() => setPointsError(false)}
                            closePoints={() => setClosePoints(true)}
                            type="points"
                        />
                    )
            }
            <div className="border-b pb-4">
                <p>Add balance</p>
            </div>
            <div className="pt-4">
                <div className="w-full h-[10rem] bg-card rounded-md p-4 text-white flex flex-col tracking-wide">
                    <div className="flex items-center justify-between">
                        <p>Aerocard</p>
                        <img src={aerolabImage} alt="Aerolab" />
                    </div>
                    <div className="flex justify-between items-center mt-auto">
                        <p>{user?.name}</p>
                        <p>8/24</p>
                    </div>
                </div>
                <ul className="grid grid-cols-[repeat(3,1fr)] gap-1 mt-8" ref={buttonsListRef}>
                    <li className="points-item">
                        <button
                            type="button"
                            className="points-button"
                            onClick={setSelected}
                        >
                            <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text">1000</span>
                        </button>
                    </li>
                    <li className="points-item">
                        <button
                            type="button"
                            className="points-button"
                            onClick={setSelected}
                        >
                            <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text">5000</span>
                        </button>
                    </li>
                    <li className="points-item">
                        <button
                            type="button"
                            className="points-button"
                            onClick={setSelected}
                        >
                            <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text">7500</span>
                        </button>
                    </li>
                </ul>
                <button type="button" className="add-button" onClick={getSelected}>
                    <img src={aerolabImage} alt="Aerolab" />
                    Add Points
                </button>
            </div>
        </div>
    )
})

export default PointsAdder
