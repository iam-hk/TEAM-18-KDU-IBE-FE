import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./Component/Header/Header";
import { Footer } from "./Component/Footer/Footer";
import * as Sentry from "@sentry/react";
import { Home } from "./Pages/Home/Home";
import { AppDispatch } from "./redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { addCurrencyExchangeRates } from "./redux/CurrencySlice";
import { RoomPage } from "./Pages/RoomPage/RoomPage";
import { getTenantConfig } from "../src/redux/thunk/GetTenantConfig";
function App() {
  const reduxDispatch: AppDispatch = useDispatch();
  // useEffect(() => {
  //   const fetchCurrencyExchangeRates = async () => {
  //     const url = import.meta.env.VITE_REACT_APP_CURRENCY_CONVERTER;
  //     try {
  //       const response = await axios.get(
  //         url
  //       );
  //       reduxDispatch(addCurrencyExchangeRates(response.data));
  //     } catch (error) {
  //       console.error("Error fetching currency exchange rates:", error);
  //     }
  //   };
  //   fetchCurrencyExchangeRates();
  // }, []);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const currencyUrl = import.meta.env.VITE_REACT_APP_CURRENCY_CONVERTER;
        const currencyResponse = await axios.get(currencyUrl);
        reduxDispatch(addCurrencyExchangeRates(currencyResponse.data));
        await reduxDispatch(getTenantConfig());
        setLoader(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home  loader={loader} />} />
        <Route path="/rooms" element={<RoomPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Sentry.withProfiler(App);
