import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./Component/Header/Header";
import { Footer } from "./Component/Footer/Footer";
import * as Sentry from "@sentry/react";
import { Home } from "./Pages/Home/Home";
import { AppDispatch, persistor } from "./redux/Store";
import { useDispatch} from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { addCurrencyExchangeRates } from "./redux/CurrencySlice";
import { RoomPage } from "./Pages/RoomPage/RoomPage";
import { getTenantConfig } from "../src/redux/thunk/GetTenantConfig";
import { PersistGate } from 'redux-persist/es/integration/react';

function App() {
  const reduxDispatch: AppDispatch = useDispatch();
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
    <PersistGate loading={null}persistor={persistor}>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home loader={loader} />} />
        <Route path="/rooms" element={<RoomPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </PersistGate>
  );
}

export default Sentry.withProfiler(App);
