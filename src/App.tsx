import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./Component/Header/Header";
import { Footer } from "./Component/Footer/Footer";
import * as Sentry from "@sentry/react";
import { Home } from "./Pages/Home/Home";
import { AppDispatch } from "./redux/Store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { addCurrencyExchangeRates } from "./redux/CurrencySlice";
function App() {
  const reduxDispatch: AppDispatch = useDispatch();
  useEffect(() => {
    const fetchCurrencyExchangeRates = async () => {
      const url = import.meta.env.VITE_REACT_APP_CURRENCY_CONVERTER;
      try {
        const response = await axios.get(
          url
        );
        reduxDispatch(addCurrencyExchangeRates(response.data));
      } catch (error) {
        console.error("Error fetching currency exchange rates:", error);
      }
    };
    fetchCurrencyExchangeRates();
  }, []);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Sentry.withProfiler(App);
