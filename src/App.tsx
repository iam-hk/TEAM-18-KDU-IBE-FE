import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./Component/Header/Header";
import { Footer } from "./Component/Footer/Footer";
import * as Sentry from "@sentry/react";
import { Home } from "./Pages/Home/Home";
import { AppDispatch } from "./redux/Store";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { addCurrencyExchangeRates } from "./redux/CurrencySlice";
import { RoomPage } from "./Pages/RoomPage/RoomPage";
import { getTenantConfig } from "../src/redux/thunk/GetTenantConfig";

import "./App.scss";
import CheckoutPage from "./Pages/CheckoutPage/CheckoutPage";

import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from './msalConfig';
import { MsalProvider } from "@azure/msal-react";

const msalInstance = new PublicClientApplication(msalConfig);


import { RoomReview } from "./Pages/ReviewPage/RoomReview";
import ConfirmPage from "./Pages/ConfirmationPage/ConfirmPage";
import ConfirmationPage from "./Pages/ConfirmationPage/ConfirmationPage";
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
    // <PersistGate loading={null}persistor={persistor}>
    <BrowserRouter>
        <MsalProvider instance={msalInstance}>

      <Header />
      <Routes>
        <Route path="/" element={<Home loader={loader} />} />
        <Route path="/rooms" element={<RoomPage />} />
        <Route path="/checkout" element={<CheckoutPage />}/>
        <Route path="/review" element={<RoomReview />}/>
        <Route path="/confirmation" element={<ConfirmationPage/>}/>
      </Routes>
      <Footer />
      </MsalProvider>
    </BrowserRouter>
    // </PersistGate>
  );
}

export default Sentry.withProfiler(App);
