import React, { useState, useEffect } from "react";
import "../../App.css";
import Footer from "../Footer";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

const API_KEY = "4b7837496a08feacece4d2286c8077aa";

export default function Quotes() {
  const [rowData, setRowData] = useState([]);
  const columns = [
    {
      headerName: "Symbol",
      field: "symbol",
      sortable: true,
      filter: true,
      resizable: true,
    },
    {
      headerName: "Name",
      field: "name",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Price",
      field: "price",
      sortable: true,
      resizable: true,
    },
    {
      headerName: "Exchange",
      field: "exchange",
      sortable: true,
      filter: true,
    },
  ];

  useEffect(() => {
    (async () => {
      const url = `https://financialmodelingprep.com/api/v3/stock/list?apikey=${API_KEY}`;
      let res = await fetch(url);
      let data = await res.json();
      //   console.log(data);
      let objs = data.map((obj) => {
        return {
          symbol: obj.symbol,
          name: obj.name,
          price: obj.price,
          exchange: obj.exchange,
        };
      });
      setRowData(objs);
    })();
  }, []);

  return (
    <>
      <div
        className="container"
        style={{
          textAlign: "center",
          paddingTop: "2rem",
          paddingBottom: "2rem",
        }}
      >
        <h1>Ticker symbols available on the market</h1>
      </div>

      <div className="quotes">
        {/* <p>
            <Badge color="success">{rowData.length}</Badge> data.
          </p> */}
        <div
          className="ag-theme-balham container"
          style={{
            height: "800px",
            width: "860px",
            textAlign: "left",
          }}
        >
          <AgGridReact
            columnDefs={columns}
            rowData={rowData}
            pagination={true}
            paginationPageSize={50}
          />
        </div>
      </div>

      <Footer />
    </>
  );
}
