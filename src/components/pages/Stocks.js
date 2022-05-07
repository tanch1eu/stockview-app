import React, { useState, useEffect } from "react";
import "../../App.css";
import Footer from "../Footer";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

const API_KEY = "4b7837496a08feacece4d2286c8077aa";

export default function Stocks() {
  const [rowData_NASDAQ, setRowData_NASDAQ] = useState([]);
  const [rowData, setRowData] = useState([]);

  const columns_NASDAQ = [
    {
      headerName: "Symbol",
      field: "symbol_NASDAQ",
      sortable: true,
      filter: true,
    },
    { headerName: "Name", field: "name_NASDAQ", sortable: true, filter: true },
    {
      headerName: "Industry",
      field: "industry_NASDAQ",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Date Founded",
      field: "datefounded_NASDAQ",
      sortable: true,
      filter: "agDateColumnFilter",
    },
    { headerName: "Head Quarter", field: "head_NASDAQ", sortable: true },
  ];
  const columns_ActiveSTickers = [
    {
      headerName: "Ticker",
      field: "ticker",
      sortable: true,
      filter: true,
    },
    { headerName: "Name", field: "name", sortable: true, filter: true },
    { headerName: "Changes", field: "changes", sortable: true },

    {
      headerName: "Changes Percentage",
      field: "changesPercentage",
    },
  ];

  useEffect(() => {
    (async () => {
      const url = `https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=${API_KEY}`;
      let res = await fetch(url);
      let data = await res.json();
      console.log(data);
      //   let works = data.works;

      let objs = data.map((obj) => {
        return {
          symbol_NASDAQ: obj.symbol,
          name_NASDAQ: obj.name,
          industry_NASDAQ: obj.sector,
          datefounded_NASDAQ: obj.founded,
          head_NASDAQ: obj.headQuarter,
        };
      });
      setRowData_NASDAQ(objs);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const url = `https://financialmodelingprep.com/api/v3/actives?apikey=${API_KEY}`;
      let res = await fetch(url);
      let data = await res.json();
      console.log(data);
      let objs = data.map((obj) => {
        return {
          ticker: obj.ticker,
          name: obj.companyName,
          changes: obj.changes,
          changesPercentage: obj.changesPercentage,
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
        <h1>List of NASDAQ 100 companies:</h1>
      </div>
      <div className="stocks">
        <div
          className="ag-theme-balham"
          style={{
            height: "600px",
            width: "1080px",
            textAlign: "left",
          }}
        >
          <AgGridReact
            columnDefs={columns_NASDAQ}
            rowData={rowData_NASDAQ}
            pagination={true}
            paginationPageSize={30}
          />
        </div>
      </div>
      <div
        className="container"
        style={{
          textAlign: "center",
          paddingTop: "2rem",
          paddingBottom: "2rem",
        }}
      >
        <h1>Most active tickers:</h1>
      </div>
      <div className="stocks">
        <div
          className="ag-theme-balham"
          style={{
            height: "600px",
            width: "800px",
            textAlign: "left",
          }}
        >
          <AgGridReact
            columnDefs={columns_ActiveSTickers}
            rowData={rowData}
            pagination={true}
            paginationPageSize={30}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
