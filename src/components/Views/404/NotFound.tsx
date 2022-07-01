import { useNavigate } from 'react-router-dom'
import { useRef, useEffect } from 'react'

const NotFound = () => {
    const navigate = useNavigate()
    const ErrorRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const setBackgroundPosition = (e: MouseEvent): void => {
            if (ErrorRef.current) {
                const yCoordinate: number = e.clientY / 5
                const xCoordinate: number = e.clientX / 5
                ErrorRef.current.style.backgroundPositionY = `${yCoordinate}px`
                ErrorRef.current.style.backgroundPositionX = `${xCoordinate}px`
            }
        }
        window.addEventListener('mousemove', setBackgroundPosition)
        return () => {
            window.removeEventListener('mousemove', setBackgroundPosition)
        }
    }, [])
    return (
        <div className="bg-gray-900 h-full bg-[url('./assets/img/p404.png')]" ref={ErrorRef}>
            <div className="page-container h-full flex justify-center items-center">
                <div className="text-white text-center">
                    <h2 className="font-black text-[10em] md:text-[12em] tracking-widest leading-[1em]">404</h2>
                    <h4
                        className="py-2 px-6 bg-white text-gray-900 w-fit mx-auto text-lg mb-6"
                    >
                        Oops! Page not found
                    </h4>
                    <p className="max-w-[400px] mx-auto mb-6">
                        This page you were looking for doesn&lsquo;t exist. To go back to the
                        challenge please enter the button.
                    </p>
                    <button
                        type="button"
                        className="py-2 px-5 bg-pink-700 rounded-full"
                        onClick={() => navigate('/')}
                    >
                        Back To Challenge
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NotFound
