import { useNavigate } from 'react-router-dom'

const Login = (): JSX.Element => {
    const navigate = useNavigate()
    return (
        <div className="h-full bg-login bg-no-repeat bg-center bg-cover bg-sky-200">
            <div className="page-container h-full flex justify-center items-center">
                <div>
                    <h1 className="text-center uppercase tracking-wider mb-4">
                        <span className="tracking-widest font-semibold bg-text">Welcome to</span>
                        <br />
                        <span className="font-black text-6xl md:text-7xl">
                            <span className="bg-text">Aerolab</span>
                            <br />
                            Challenge
                        </span>
                    </h1>
                    <p className="text-gray-600 mb-7 text-md max-w-[350px] mx-auto text-center font-semibold">
                        In this section you will be able to exchange your aeropoints
                        for our highly exclusive products.
                    </p>
                    <button
                        type="button"
                        className="
                            btn-primary
                            bg-gradient-to-r from-cyan-500 to-blue-500
                            text-white
                            uppercase
                            w-full
                            py-5
                            tracking-wider font-semibold"
                        onClick={() => navigate('/home')}
                    >
                        View All Products
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login
