import "./dashboard.css";
import {useStockExchangesData} from "../../hooks/useStockExchangesData.tsx";
import {useState} from "react";
import Table from "../Table/Table.tsx";
import Header from "../Header/Header.tsx";
import {useNavigate} from "react-router-dom";
import Modal from "../Modal/Modal.tsx";
import {createStockExchange, StockExchange} from "../../services/apiService.ts";

function Dashboard() {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [openModal, setOpenModal] = useState<boolean>(false);
    const {stockExchanges, refreshStockExchangeData} = useStockExchangesData(query);

    const columns = [
        {
            title: "Name", field: "name", onClick: (id: number) => {
                navigate(`/stock-exchange/${id}`)
            }
        },
        {title: "Description", field: "description"},
        {title: "Live", field: "liveInMarket", type: "boolean"},
    ];

    const handleModalState = () => {
        setOpenModal(!openModal)
    };

    const addingNewStockExchange = (data: Partial<StockExchange>) => {
        createStockExchange(data).then(() => {
            refreshStockExchangeData();
        });
    }

    const queryHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    return (
        <div className={"dashboard"}>
            <Header
                queryHandler={queryHandler} modalStateHandler={handleModalState}
            />
            <Table columns={columns} rows={stockExchanges}/>
            {openModal && <Modal open={openModal} onClose={handleModalState} onApply={addingNewStockExchange}></Modal>}
        </div>
    );
}

export default Dashboard;
