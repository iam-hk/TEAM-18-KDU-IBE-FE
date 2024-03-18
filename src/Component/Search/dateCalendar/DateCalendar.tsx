import { useEffect, useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useMediaQuery } from "usehooks-ts";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";
import { CurrencyExchangeRates } from "../../../types/CurrencyExchange";
import { CurrencySymbols } from "../../../Constants/CurrencySymbols";
import { useTranslation } from "react-i18next";
import calendar from "../../../assets/calendar.svg";
import "./DateCalendar.scss";

export function DateCalender() {
  const { t } = useTranslation();
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const maxDays = useSelector(
    (state: RootState) => state.tenantInfo.maximumDays
  );
  const currentSelectedCurrency: keyof CurrencyExchangeRates = useSelector(
    (state: RootState) =>
      state.currencyRate.currentSelectedCurrency as keyof CurrencyExchangeRates
  );
  const currentPrice: CurrencyExchangeRates = useSelector(
    (state: RootState) => state.currencyRate.currentPrice
  );
  const widthMonth = useMediaQuery("(max-width:750px)");
  const [prices, setPrices] = useState({});
  const maximumLengthOfStay = maxDays - 1;
  useEffect(() => {
    const url = import.meta.env.VITE_REACT_APP_MINIMUM_ROOM_RATES;
    fetch(url)
      .then((response) => response.json())
      .then((data: Record<string, number>) => { 
        const pricesWithDateOnly: Record<string, number> = {};
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            const dateOnly = key.split("T")[0];
            pricesWithDateOnly[dateOnly] = data[key];
          }
        }
        setPrices(pricesWithDateOnly);
      })
      .catch((error) => {
        console.error("Error fetching prices:", error);
      });
  }, []);

  const [dateInitial, setDateInitial] = useState(false);

  const [isVisible, setIsVisible] = useState(false);

  const handleDateChange = (ranges: { selection: { startDate: Date; endDate: Date; key: string; }; }) => {
    setDateInitial(true);
    setDateRange([ranges.selection]);
  };

  const getMaxEndDate = (startDate) => {
    const maxEndDate = new Date(startDate);
    maxEndDate.setDate(startDate.getDate() + maximumLengthOfStay);
    return maxEndDate;
  };

  const handleStartDateChange = (startDate) => {
    let maxDate = null;
    if (startDate.getTime() === dateRange[0].endDate.getTime()) {
      maxDate = getMaxEndDate(startDate);
    }
    setDateRange([
      { startDate, endDate: dateRange[0].endDate, key: "selection" },
    ]);
    return { minDate: startDate, maxDate };
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  function findMinimumPrice(prices: number) {
    const validPrices = Object.values(prices).filter(
      (price) => price !== "" && !isNaN(price)
    );
    if (validPrices.length === 0) {
      return null;
    } else {
      const minimumPrice = Math.min(...validPrices);
      const selectedCurrencyPrice = currentPrice[currentSelectedCurrency];
      if (selectedCurrencyPrice !== undefined) {
        return (
          minimumPrice * parseFloat(selectedCurrencyPrice.toFixed(1))
        ).toFixed(1);
      } else {
        return null;
      }
    }
  }
  function updatePrice(price: number) {
    return price * currentPrice[currentSelectedCurrency].toFixed(1);
  }
  return (
    <div className="date-container">
      <h4>{t("search.selectDates")}</h4>
      <div className="date-input-wrapper">
        <input
          type="text"
          value={
            dateInitial == false
              ? `    ${t("search.checkin")}     →    ${t("search.checkout")}`
              : `   ${dateRange[0].startDate.toLocaleDateString()}     →    ${dateRange[0].endDate.toLocaleDateString()}`
          }
          className="input-date-container"
          readOnly
        />
        <button onClick={toggleVisibility} className="date-calender-icon">
          <img src={calendar} alt="notfound" />
        </button>
      </div>
      {isVisible && (
        <div className="date-range-picker-wrapper">
          <DateRangePicker
            ranges={dateRange}
            className="dateRangePicker"
            onChange={handleDateChange}
            minDate={new Date()}
            maxDate={
              dateRange[0].startDate.getTime() ===
              dateRange[0].endDate.getTime()
                ? getMaxEndDate(dateRange[0].startDate)
                : new Date(new Date().getFullYear() + 100, 11, 31)
            }
            months={widthMonth ? 1 : 2}
            direction="horizontal"
            showSelectionPreview={false}
            editableDateInputs={true}
            onChangeStart={handleStartDateChange}
            dayContentRenderer={(day) => {
              const selectedDate = day.toISOString().split("T")[0];
              const price = prices[selectedDate] || "";

              return (
                <div
                  className="individual-date-container"
                  style={{
                    display: "block",
                    position: "relative",
                    left: "0.8rem",
                    fontSize: "0.8rem",
                  }}
                >
                  <p className="date-item">{day.getDate()}</p>
                  <p
                    className="price-item"
                    style={price ? {opacity : '1'} : {opacity : '0'} }
                  >
                    {(CurrencySymbols as any)[currentSelectedCurrency]}
                    {updatePrice(price)}{" "}
                  </p>
                </div>
              );
            }}
          />
          <div className="date-picker-footer-container">
            <div className="extraInformation-and-applyButton">
              {dateRange[0].startDate.getTime() !==
                dateRange[0].endDate.getTime() && (
                <p className="nightly-rate-summary">
                  {t("search.from")}{" "}
                  {(CurrencySymbols as any)[currentSelectedCurrency]}
                  {findMinimumPrice(prices)} {t("search.perNight")}
                </p>
              )}
              <button
                className={`apply-btn ${!dateInitial && "disabled"}`}
                onClick={toggleVisibility}
                disabled={!dateInitial}
              >
                {t("search.applyDates")}
              </button>
            </div>
            {dateRange[0].endDate.getTime() ===
            dateRange[0].startDate.getTime() ? (
              <>
                <p className="date-footer-limitStay">
                  {t("search.endDateMessage")}
                </p>
                <p className="date-footer-limitStay">
                  {t("search.maxLength")} {maxDays}
                </p>
              </>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
