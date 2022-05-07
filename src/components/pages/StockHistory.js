import React, { useState, useEffect } from "react";
import "../../App.css";
import Footer from "../Footer";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { Line } from "react-chartjs-2";

const API_KEY = "4b7837496a08feacece4d2286c8077aa";
export default function StockHistory() {
  const [search, setSearch] = useState("");
  const ParseData = (search) => {
    const [loading, setLoading] = useState(true);
    const [rowData, setRowData] = useState([]);
    const [chartData, setChartData] = useState({});
    const [error, setError] = useState(null);
    const [name, setName] = useState("");
    const columns = [
      {
        headerName: "Date",
        field: "date",
        sortable: true,
        filter: true,
      },
      {
        headerName: "Open",
        field: "open",
        sortable: true,
      },
      {
        headerName: "High",
        field: "high",
        sortable: true,
      },
      {
        headerName: "Low",
        field: "low",
        sortable: true,
      },
      {
        headerName: "Volume",
        field: "volume",
        sortable: true,
      },
    ];

    useEffect(() => {
      (async () => {
        if (search === "") {
        } else {
          const url_stockprice = `https://financialmodelingprep.com/api/v3/historical-price-full/${search}?apikey=${API_KEY}`;
          const url_companyname = `https://financialmodelingprep.com/api/v3/profile/${search}?apikey=${API_KEY}`;
          try {
            let res_price = await fetch(url_stockprice);
            let res_name = await fetch(url_companyname);
            let data_price = await res_price.json();
            let data_name = await res_name.json();
            console.log(data_price);
            // console.log(data_name);
            let company_name = data_name[0].companyName;
            let historical = data_price.historical;
            console.log(historical.date);
            let objs = historical.map((obj) => {
              return {
                date: obj.date,
                open: obj.open,
                high: obj.high,
                low: obj.low,
                volume: obj.volume,
              };
            });
            let chartXValues = [];
            let chartYValues_open = [];
            let chartYValues_high = [];
            let chartYValues_low = [];

            for (var key in data_price["historical"]) {
              chartXValues.push(data_price["historical"][key]["date"]);
              chartYValues_open.push(data_price["historical"][key]["open"]);
              chartYValues_high.push(data_price["historical"][key]["high"]);
              chartYValues_low.push(data_price["historical"][key]["low"]);
            }
            setName(company_name);
            setRowData(objs);
            setLoading(false);
            setChartData({
              labels: chartXValues.reverse(),
              datasets: [
                {
                  label: "Open",
                  data: chartYValues_open.reverse(),
                  backgroundColor: "white",
                  tension: 0.2,
                  borderWidth: 1,
                  pointStyle: "circle",
                  pointRadius: 5,
                  pointBorderColor: "rgb(0, 0, 0)",
                },
                {
                  label: "High",
                  data: chartYValues_high.reverse(),
                  backgroundColor: ["red"],
                  tension: 0.2,
                  borderWidth: 1,
                  pointStyle: "triangle",
                  pointRadius: 5,
                  pointBorderColor: "rgb(0, 0, 0)",
                },
                {
                  label: "Low",
                  data: chartYValues_low.reverse(),
                  backgroundColor: ["green"],
                  tension: 0.2,
                  borderWidth: 1,
                  pointStyle: "rectRot",
                  pointRadius: 5,
                  pointBorderColor: "rgb(0, 0, 0)",
                },
              ],
            });
          } catch (err) {
            setError(err);
            setLoading(false);
          }
        }
      })();
    }, [search]);
    if (loading) {
      return (
        <p
          className="container"
          style={{ textAlign: "center", paddingBottom: "2rem" }}
        >
          Waiting for input...
        </p>
      );
    } else if (error) {
      return (
        <>
          <div
            className="container"
            style={{ textAlign: "center", paddingBottom: "2rem" }}
          >
            <p>Something went wrong: {error.message}</p>
            <p>Please press Refresh page.</p>
          </div>
        </>
      );
    } else
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
            <h1>Stock Price display for: {name}</h1>
          </div>
          <div className="stockhistory">
            <div
              className="ag-theme-balham"
              style={{
                height: "500px",
                width: "1200px",
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
          <div
            className="stockhistory"
            style={{
              paddingTop: "2rem",
              paddingBottom: "2rem",
            }}
          >
            <div style={{ height: "600px", width: "1200px" }}>
              <Line
                data={chartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      labels: {
                        usePointStyle: true,
                      },
                    },
                  },
                  interaction: {
                    mode: "index",
                    intersect: false,
                  },

                  layout: {
                    padding: {
                      top: 25,
                      right: 20,
                    },
                  },
                  scales: {
                    x: {
                      display: true,
                      title: {
                        display: true,
                        text: "Date (YY/MM/DD)",
                        color: "white",
                        font: {
                          family: "Comic Sans MS",
                          size: 20,
                          weight: "bold",
                          lineHeight: 1.2,
                        },
                      },
                      padding: { top: 0, left: 0, right: 0, bottom: 0 },
                    },
                    y: {
                      display: true,
                      type: "linear",
                      title: {
                        display: true,
                        text: "Value (USD)",
                        color: "white",
                        font: {
                          family: "Comic Sans MS",
                          size: 20,
                          style: "normal",
                          lineHeight: 1.2,
                        },
                        padding: { top: 0, left: 0, right: 0, bottom: 0 },
                        grid: {
                          drawOnChartArea: false,
                        },
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </>
      );
  };
  return (
    <>
      <div
        className="stockhistory"
        style={{
          textAlign: "left",
          paddingTop: "2rem",
          paddingBottom: "2rem",
        }}
      >
        <h2>
          Search for historical data of a company:
          <SearchBar onSubmit={setSearch} />
        </h2>
      </div>
      <div>{ParseData(search)}</div>
      <Footer />
    </>
  );
}
const SearchBar = (props) => {
  const [innerSearch, setInnerSearch] = useState("");
  return (
    <div>
      <input
        aria-labelledby="search-button"
        name="search"
        id="search"
        type="search"
        className="input"
        value={innerSearch}
        onChange={(e) => setInnerSearch(e.target.value)}
        placeholder="enter a stock symbol..."
      />
      <button
        id="search-button"
        type="button"
        style={{ fontSize: "12.5px", padding: "1px" }}
        onClick={() => props.onSubmit(innerSearch)}
      >
        Search
      </button>
    </div>
  );
};
