import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import store from './components/redux/store'
import './index.css'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    </React.StrictMode>
)
