import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useTranslation } from "react-i18next";
import { AppDispatch, RootState } from "../../../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import {
  updateGuestCounts,
  updateGuestDispInfo,
} from "../../../redux/PropertyConfigSlice";
import "./RoomGuests.scss";
import { useEffect } from "react";

const Guests = () => {
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
  const maximumGuests = useSelector(
    (state: RootState) => state.tenantInfo.maixmumGuests
  );
  const roomsSelected = useSelector(
    (state: RootState) => state.searchRoomInfo.rooms
  );
  useEffect(() => {
    reduxDispatch(updateGuestDispInfo());
  }, [guestCounts]);
  const reduxDispatch: AppDispatch = useDispatch();
  const updateGuestInfo = () => {
    reduxDispatch(updateGuestDispInfo());
  };

  const handleGuestCountChange = (index: number, increment: boolean) => {
    if (increment) {
      let totalGuests = 0;
      guestCounts.forEach((guest) => {
        totalGuests += guest;
      });
      if (totalGuests >= maximumGuests * roomsSelected) return;
    }
    if (index === adultIndex && increment === false) {
      if (guestCounts[index] > selectedRooms) {
        reduxDispatch(updateGuestCounts({ index, increment }));
      }
    } else {
      reduxDispatch(updateGuestCounts({ index, increment }));
    }
  };
  const GuestSelected = () => {
    return (
      <Box>
        <Typography color={"#858685"}>
          <span className="guest-heading-display">{t("search.guests")}</span>
          </Typography>
        <Typography>
          <span className="guest-display-information">{guestDispInfo}</span>
        </Typography>
      </Box>
    );
  };

  return (
    <div className="room-page-guest-display">
      <FormControl>
        <Select
          sx={{
            "& .MuiSelect-select": {
              padding: "0.7rem",
            },
          }}
          renderValue={() => <GuestSelected />}
          displayEmpty={true}
          defaultValue=""
          IconComponent={KeyboardArrowDownIcon}
          onChange={updateGuestInfo}
        >
          {guests.map((guest, index) => (
            <MenuItem key={index} value={guest.type}>
              <div className="guest-type-information">
                <div className="each-guest-type">
                  <h4 className="guest-type-name">
                    {t(`guestTypes.${guest.type}.type`)}
                  </h4>
                  <h5 className="guest-type-age">
                    {t(`guestTypes.${guest.type}.age`)}
                  </h5>
                </div>
                <div className="each-guest-count">
                  <button
                    className="decrement-each-guest-count"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleGuestCountChange(index, false);
                    }}
                  >
                    -
                  </button>
                  <h4 className="each-guest-count">{guestCounts[index]}</h4>
                  <button
                    className="increment-each-guest-count"
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
  );
};

export default Guests;
