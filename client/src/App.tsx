import "./App.css";

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Dashboard from "./components/Dashboard/Dashboard.tsx";
import Stocks from "./components/Stocks/Stocks.tsx";
import Login from "./components/Login/Login.tsx";

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/stock-exchange/:exchange" element={<Stocks/>}/>
                <Route path="/stocks" element={<Stocks/>}/>
            </Routes>
        </Router>
    );
}

export default App;
