import { FormControl, MenuItem, Select } from "@mui/material";
import { AppDispatch, RootState } from "../../../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import {
  updateGuestCounts,
  updateGuestDispInfo,
} from "../../../redux/PropertyConfigSlice";
import { useTranslation } from "react-i18next";
import "./Guests.scss";
import { useEffect, useState } from "react";
import CustomizedSnackbars from "../../snackbar/CustomizedSnackbars";
export function Guests() {
  const { t } = useTranslation();
  const guestCounts = useSelector(
    (state: RootState) => state.propertyConfigInfo.guestCounts
  );
  const selectedRooms = useSelector(
    (state: RootState) => state.searchRoomInfo.rooms
  );
  const guestDispInfo = useSelector(
    (state: RootState) => state.propertyConfigInfo.guestDisplayInfo
  );
  const guests = useSelector(
    (state: RootState) => state.propertyConfigInfo.guests
  );
  const adultIndex = useSelector(
    (state: RootState) => state.propertyConfigInfo.adultIndex
  );
  const maximumGuests=useSelector((state:RootState)=>state.tenantInfo.maixmumGuests);
  const roomsSelected=useSelector((state:RootState)=>state.searchRoomInfo.rooms);
  useEffect(() => {
    reduxDispatch(updateGuestDispInfo());
  }, [guestCounts]);
  const reduxDispatch: AppDispatch = useDispatch();
  const updateGuestInfo = () => {
    reduxDispatch(updateGuestDispInfo());
  };

  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

  const handleGuestCountChange = (index: number, increment: boolean) => {
    if (increment) {
      let totalGuests = 0;
      guestCounts.forEach((guest) => {
        totalGuests += guest;
      });
      if(totalGuests>=maximumGuests*roomsSelected)
      return;
    }
    if (index === adultIndex && increment === false) {
      if (guestCounts[index] > selectedRooms) {
        reduxDispatch(updateGuestCounts({ index, increment }));
      } else if (guestCounts[index] == selectedRooms) {
        setShowSnackbar(true);
      }
    } else {
      reduxDispatch(updateGuestCounts({ index, increment }));
    }
  };
  return (
    <>
      {
        <div className="guests">
          <h4>{t("search.guests")}</h4>
          <FormControl>
            <Select
              renderValue={() => <span>{guestDispInfo}</span>}
              onChange={updateGuestInfo}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              {guests.map((guest, index) => (
                <MenuItem key={index} value={guest.type}>
                  <div className="guest-type-info">
                    <div className="guest-type">
                      <h4>{t(`guestTypes.${guest.type}.type`)}</h4>
                      <h5>{t(`guestTypes.${guest.type}.age`)}</h5>
                    </div>
                    <div className="guest-count">
                      <button
                        className="decrement-guest-count"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleGuestCountChange(index, false);
                        }}
                      >
                        -
                      </button>
                      <h4 className="guest-count">{guestCounts[index]}</h4>
                      <button
                        className="increment-guest-count"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleGuestCountChange(index, true);
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      }
      {showSnackbar && (
        <CustomizedSnackbars
          status="error"
          message="Adults cannot be less than number of rooms."
          setShowSnackbar={setShowSnackbar}
        />
      )}
    </>
  );
}
