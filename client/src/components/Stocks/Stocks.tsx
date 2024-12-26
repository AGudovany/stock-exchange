import './stocks.css';
import {useState} from "react";
import {useParams} from "react-router";
import Table from "../Table/Table.tsx";
import Header from "../Header/Header.tsx";
import {useStocksData} from "../../hooks/useStocksData.tsx";
import {addStockToExchange, createStock, StockExchange} from "../../services/apiService.ts";
import Modal from "../Modal/Modal.tsx";

function Stocks() {
    const {exchange} = useParams();
    const [query, setQuery] = useState("");
    const [openModal, setOpenModal] = useState<boolean>(false);
    const {stocks, refreshStockData, activeStockExchange} = useStocksData(query, exchange);

    const columns = [
        {title: "Name", field: "name"},
        {title: "Description", field: "description"},
        {title: "Price", field: "currentPrice"},
        {title: "Last Update", field: "lastUpdate", type: "date"},
    ];

    const queryHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleModalState = () => {
        setOpenModal(!openModal)
    };

    const addingNewStockToExchange = (data: Partial<StockExchange>) => {
        if (exchange) {
            addStockToExchange(exchange, data).then(() => {
                refreshStockData();
            });
        } else {
            createStock(data).then(() => {
                refreshStockData();
            });
        }
    }

    return (
        <div className={"stocks"}>
            <Header
                queryHandler={queryHandler} modalStateHandler={handleModalState} title={activeStockExchange?.name}
            />
            <Table columns={columns} rows={stocks}/>
            {openModal &&
                <Modal open={openModal} onClose={handleModalState} onApply={addingNewStockToExchange}></Modal>}
        </div>
    );
}

export default Stocks;
