import "./table.css";
import {Stock, StockExchange} from "../../services/apiService.ts";

type TablePropsType = {
  columns: Array<{ field: string, title: string, type?: string, onClick?: (key: number) => void}>;
  rows: Stock[] | StockExchange[];
};

const Table = ({ columns, rows }: TablePropsType) => {
  return (
    <div className="table-container">
      <table className="responsive-table">
        <thead>
          <tr>
            {columns.map((column) => (
                <th key={column.field}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((item) => (
              <tr key={item.id}>
                {columns.map((column) => {
                  let fieldValue = item[column.field];
                  if (column.type === "boolean") {
                    fieldValue = fieldValue ? "Yes" : "No";
                  }
                  let tabIndex = column.onClick && item.id + 10;
                    let clickHandler = () => {
                        column.onClick && column.onClick(item.id);
                    }
                    let handleKeyDown = (event: React.KeyboardEvent) => {
                        if (event.key === "Enter" || event.key === " ") {
                            column.onClick && column.onClick(item.id);
                        }
                    }
                  return (
                      <td style={{ cursor: column.onClick ? 'pointer' : 'default', color: column.onClick && 'blue' }}
                          tabIndex={tabIndex}
                          id={tabIndex?.toString()}
                          onClick={clickHandler}
                          onKeyDown={handleKeyDown}
                          key={column.field}>{fieldValue}</td>
                  )
                })}
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
