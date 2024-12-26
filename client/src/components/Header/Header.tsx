import "./header.css";
import {useLocation, useNavigate} from "react-router-dom";
import { logout } from '../../services/authService';

type HeaderType = {
    queryHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
    modalStateHandler: () => void;
    title?: string;
};

const Header = ({queryHandler, modalStateHandler, title}: HeaderType) => {
    const navigate = useNavigate();
    const location = useLocation();

    const isDashboard = location.pathname === '/dashboard';

    const handleKeyPress = (event: React.KeyboardEvent, action: () => void) => {
        if (event.key === 'Enter' || event.key === ' ') {
            action();
        }
    };

    const dashboardNavigateHandler = () => {
        navigate("/dashboard");
    }

    const allStocksNavigateHandler = () => {
        navigate("/stocks");
    }

    const logOutHandler = () => {
        logout().then(() => navigate("/"));
    }

    return (
        <header className={"header"}>
            <div className="filters header-item">
                <h3>Filter</h3>
                <input tabIndex={1}
                    type="text"
                    id="nameFilter"
                    placeholder="Filter by name"
                    onChange={queryHandler}
                ></input>
            </div>
            {title && <div className="page-title header-item">
                <h3>{title}</h3>
            </div>}
            <div className="menu header-item">
                <button className={'add-new'}
                        tabIndex={2}
                        onClick={modalStateHandler}>Add new {isDashboard ? 'Stock Exchange' : 'Stock'}
                </button>
                {!isDashboard && <button tabIndex={3}
                    onKeyDown={(e) => handleKeyPress(e, dashboardNavigateHandler)}
                    onClick={dashboardNavigateHandler}>Dashboard</button>}
                {isDashboard && <button tabIndex={4}
                    onKeyDown={(e) => handleKeyPress(e, allStocksNavigateHandler)}
                    onClick={allStocksNavigateHandler}>Stocks</button>}
                {isDashboard && <button tabIndex={5} className={'logout'} onClick={logOutHandler}>Log Out</button>}
            </div>
        </header>
    );
};

export default Header;
