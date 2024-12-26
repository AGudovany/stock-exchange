import "./modal.css";
import {useEffect, useRef, useState} from "react";
import {useLocation} from "react-router-dom";
import {getStocks, Stock} from "../../services/apiService.ts";

type Data = Record<string, string | number>;

type ModalType = {
    open: boolean,
    onClose: () => void,
    onApply: (data: Data) => void,
}

const Modal = ({open, onClose, onApply}: ModalType) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [currentPrice, setCurrentPrice] = useState(0.01);
    const [availableStocks, setAvailableStocks] = useState<Stock[]>([]);
    const [selectedStock, setSelectedStock] = useState<number | undefined>(undefined);
    const modalRef = useRef<HTMLDivElement | null>(null);

    const location = useLocation();
    const isStock = location.pathname === "/stocks";
    const isAddingStock = new RegExp("/stock-exchange", "i").test(location.pathname);


    useEffect(() => {
        const modal = modalRef.current;
        const focusableElements = modal
            ? Array.from(
                modal.querySelectorAll<HTMLElement>(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                )
            )
            : [];
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        const handleTabKey = (event: KeyboardEvent) => {
            if (event.key === "Tab") {
                if (event.shiftKey) {
                    if (document.activeElement === firstElement) {
                        event.preventDefault();
                        lastElement?.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        event.preventDefault();
                        firstElement?.focus();
                    }
                }
            }
        };
        firstElement?.focus();

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            } else {
                handleTabKey(event);
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);

    useEffect(() => {
        if (isAddingStock) {
            getStocks().then((stocks) => setAvailableStocks(stocks))
        }
    }, [])

    const handleNameChanges = (name: string) => {
        setName(name);
    }

    const descriptionChangeHandler = (text: string) => {
        setDescription(text);
    }

    const priceChangeHandler = (price: number) => {
        setCurrentPrice(price);
    }

    const handleSubmit = () => {
        if (isAddingStock && selectedStock) {
            onApply({id: selectedStock});
        } else {
            const data: Data = {
                name,
                description,
            }
            if (isStock) {
                data['currentPrice'] = currentPrice;
            }
            onApply(data);
        }
        onClose();
    }

    if (!open) return null;

    return (
        open && <div>
            <div className={'darkBG'} onClick={onClose}></div>
            <div className={'centered'}>
                <div className={'modal'}>
                    <div className={'modalContent'} ref={modalRef}>
                        <form onSubmit={handleSubmit}>
                            {isAddingStock ?
                                <div className={'wrapper'}>
                                    <div className="mb-3">
                                        <label>Choose Stock to Add</label>
                                        <select
                                            onChange={(e) => {
                                            setSelectedStock(parseInt(e.target.value))
                                        }} value={selectedStock}>
                                            {availableStocks.map((stock) => (
                                                <option key={stock.id} value={stock.id}>{stock.name}</option>
                                            ))
                                            }
                                        </select>
                                    </div>
                                </div>
                                :
                                <div className={'wrapper'}>
                                    <div className="mb-3">
                                        <label>Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={name}
                                            onChange={(e) => handleNameChanges(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Description</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={description}
                                            onChange={(e) => descriptionChangeHandler(e.target.value)}
                                            required
                                        />
                                    </div>
                                    {isStock && <div className="mb-3">
                                        <label>Price</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={currentPrice}
                                            step={0.01}
                                            onChange={(e) => priceChangeHandler(parseFloat(e.target.value))}
                                            required
                                        />
                                    </div>}
                                </div>}
                            <button type="submit" className="btn btn-primary">
                                Save
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;