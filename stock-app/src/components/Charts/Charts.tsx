import React, { FC, useState } from "react";
import "./charts.css";
import LineChart from "../Chart/Chart";

interface ChartsProps {}

const Charts: FC<ChartsProps> = ({}) => {
  const theData = {
    "Meta Data": {
        "1. Information": "Monthly Prices (open, high, low, close) and Volumes",
        "2. Symbol": "IBM",
        "3. Last Refreshed": "2023-03-08",
        "4. Time Zone": "US/Eastern"
    },
    "Monthly Time Series": {
      "2023-03-08": {
        "1. open": "128.9000",
        "2. high": "130.8600",
        "3. low": "127.5450",
        "4. close": "128.0500",
        "5. volume": "19253435",
      },
      "2023-02-28": {
        "1. open": "134.4900",
        "2. high": "137.3900",
        "3. low": "128.8600",
        "4. close": "129.3000",
        "5. volume": "76080679",
      },
      "2023-01-31": {
        "1. open": "141.1000",
        "2. high": "147.1800",
        "3. low": "132.9800",
        "4. close": "134.7300",
        "5. volume": "105576019",
      },
      "2022-12-30": {
        "1. open": "149.9800",
        "2. high": "153.2100",
        "3. low": "137.1950",
        "4. close": "140.8900",
        "5. volume": "86426226",
      },
      "2022-11-30": {
        "1. open": "138.2500",
        "2. high": "150.4600",
        "3. low": "133.9700",
        "4. close": "148.9000",
        "5. volume": "93620235",
      },
      "2022-10-31": {
        "1. open": "120.1600",
        "2. high": "138.8615",
        "3. low": "115.5450",
        "4. close": "138.2900",
        "5. volume": "113480787",
      },
      "2022-09-30": {
        "1. open": "128.4000",
        "2. high": "130.9900",
        "3. low": "118.6100",
        "4. close": "118.8100",
        "5. volume": "87256958",
      },
      "2022-08-31": {
        "1. open": "130.7500",
        "2. high": "139.3400",
        "3. low": "128.4000",
        "4. close": "128.4500",
        "5. volume": "77392342",
      },
      "2022-07-29": {
        "1. open": "141.0000",
        "2. high": "141.8700",
        "3. low": "125.1300",
        "4. close": "130.7900",
        "5. volume": "129801061",
      },
    },
  };
  const lables = ['2023-03-08', '2023-02-28', '2023-01-31', '2022-12-30', '2022-11-30', '2022-10-31', '2022-09-30', '2022-08-31', '2022-07-29']
  const [chartData, setChartData] = useState({
    labels: Object.keys(theData["Monthly Time Series"]),
    datasets: [
      {
        label: theData["Meta Data"]["2. Symbol"],
        // data:  ['128.0500', '129.3000', '134.7300', '140.8900', '148.9000', '138.2900', '118.8100', '128.4500', '130.7900']
        data:  Object.values(theData["Monthly Time Series"]).map((data) => data["4. close"])
      },
    ],
  });
  return (
    <div className="chartsCont">
      <LineChart chartData={chartData} />
      <LineChart chartData={chartData} />
    </div>
  );
};

export default Charts;
