import { useEffect, useState } from "react";
import calendar from "../../../assets/calendar.svg";
import "./RoomCalendar.scss";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "usehooks-ts";
import { updateEndDate, updateStartDate } from "../../../redux/SearchRoomSlice";
import { RootState } from "../../../redux/Store";
import { CurrencyExchangeRates } from "../../../types/CurrencyExchange";
import { DateRangePicker } from "react-date-range";
import { CurrencySymbols } from "../../../Constants/CurrencySymbols";

export function RoomCalendar() {
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
//   const guestCount: number[] = useSelector(
//     (state: RootState) => state.propertyConfigInfo.guestCounts
//   );
  const currentSelectedCurrency: keyof CurrencyExchangeRates = useSelector(
    (state: RootState) =>
      state.currencyRate.currentSelectedCurrency as keyof CurrencyExchangeRates
  );
  const currentPrice: CurrencyExchangeRates = useSelector(
    (state: RootState) => state.currencyRate.currentPrice
  );
  const widthMonth = useMediaQuery("(max-width:860px)");
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

  const dispatch = useDispatch();

  const handleDateChange = (ranges: {
    selection: { startDate: Date; endDate: Date; key: string };
  }) => {
    setDateInitial(true);
    setDateRange([ranges.selection]);

    const newEndDate: Date = new Date(ranges.selection.endDate);
    const newStartDate: Date = new Date(ranges.selection.startDate);

    newEndDate.setDate(newEndDate.getDate() + 1);
    newStartDate.setDate(newStartDate.getDate() + 1);

    const updatedEndDateString: string = newEndDate.toISOString().split("T")[0];
    const updatedStartDateString: string = newStartDate
      .toISOString()
      .split("T")[0];

    dispatch(updateEndDate(updatedEndDateString));
    dispatch(updateStartDate(updatedStartDateString));
  };

  const getMaxEndDate = () => {
    if (dateRange[0].startDate.getTime() === dateRange[0].endDate.getTime()) {
      const maxEndDate = new Date(dateRange[0].startDate);
      maxEndDate.setDate(
        dateRange[0].startDate.getDate() + maximumLengthOfStay
      );

      const maxEndDate1 = new Date();
      maxEndDate1.setDate(1);
      maxEndDate1.setMonth(6);
      maxEndDate1.setFullYear(2024);

      if (maxEndDate.getTime() < maxEndDate1.getTime()) {
        return maxEndDate;
      } else {
        return maxEndDate1;
      }
    } else {
      const maxEndDate = new Date();
      maxEndDate.setDate(1);
      maxEndDate.setMonth(6);
      maxEndDate.setFullYear(2024);

      return maxEndDate;
    }
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
  const generateMinDate = () => {
    return new Date();
  };

  function updatePrice(price: number) {
    return price * currentPrice[currentSelectedCurrency].toFixed(1);
  }

  return (
    <div className="date-component">
      <div className="date-checkin">
        <div className="checkin-heading">
          <div className="checkin_heading-information">Check in between</div>
        </div>
        <div className="checkin-date">
          <div className="checkin_date_information">Any Date</div>
        </div>
      </div>
      <div className="border-line"></div>
      <div className="date-checkout">
        <div className="checkout-details">
          <div className="checkout-heading">
            <div className="checkout_heading-information">Check out between</div>
          </div>
          <div className="checkout-date">
            <div className="checkout_date_information">Any Date</div>
          </div>
        </div>
        <div className="img">
          <button style={{border:"none",backgroundColor:"#fff"}}onClick={toggleVisibility} className="date-calender-icon">
            <img src={calendar} alt="notfound" />
          </button>
        </div>
        {isVisible && (
        <div className="date-range-picker-wrapper2">
          <DateRangePicker
            ranges={dateRange}
            className="dateRangePicker"
            onChange={handleDateChange}
            minDate={generateMinDate()}
            maxDate={getMaxEndDate()}
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
    </div>
  );
}
