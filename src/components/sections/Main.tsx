import { Routes, Route } from 'react-router-dom'
import Home from '../Views/Home/Home'
import Login from '../Views/Login/Login'
import NotFound from '../Views/404/NotFound'

const Main = (): JSX.Element => (
    <main className="bg-gray-100">
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </main>
)

export default Main
