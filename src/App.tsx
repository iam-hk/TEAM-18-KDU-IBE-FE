import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./Component/Header/Header";
import { Footer } from "./Component/Footer/Footer";
import * as Sentry from "@sentry/react";
import { Home } from "./Component/Home/Home";
function App() {
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
