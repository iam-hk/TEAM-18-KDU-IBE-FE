import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./Component/Header/Header";
import { Footer } from "./Component/Footer/Footer";
import * as Sentry from "@sentry/react";
import { Home } from "./Component/Home/Home";
import { AppDispatch } from "./redux/Store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { addCurrencyExchangeRates } from "./redux/CurrencySlice";
function App() {
  const reduxDispatch: AppDispatch = useDispatch();
  useEffect(() => {
    const fetchCurrencyExchangeRates = async () => {
      try {
        const response = await axios.get(
          "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_xxvHHr6U8Mi2L46U8A46RClOsi95LZjL4NcTVWRr"
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
