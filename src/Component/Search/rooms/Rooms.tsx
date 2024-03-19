import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import {
  updateAdultCount,
  resetGuests,
} from "../../../redux/PropertyConfigSlice";
import { updateRooms } from "../../../redux/SearchRoomSlice";
import { AppDispatch, RootState } from "../../../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import "./Rooms.scss";
export function Rooms() {
  const { t } = useTranslation();
  const selectedRooms = useSelector(
    (state: RootState) => state.searchRoomInfo.rooms
  );
  const maximumRooms = useSelector(
    (state: RootState) => state.tenantInfo.maximumRooms
  );
  const guestCounts = useSelector(
    (state: RootState) => state.propertyConfigInfo.guestCounts
  );
  const adultIndex = useSelector(
    (state: RootState) => state.propertyConfigInfo.adultIndex
  );
  const maxGuest = useSelector(
    (state: RootState) => state.tenantInfo.maixmumGuests
  );
  const reduxDispatch: AppDispatch = useDispatch();
  const handleRoomChange = (event: SelectChangeEvent) => {
    let totalGuests = 0;
    guestCounts.forEach((guest) => {
      totalGuests += guest;
    });
    if (parseInt(event.target.value) * maxGuest < totalGuests) {
      reduxDispatch(resetGuests());
    }
    if (parseInt(event.target.value) <= guestCounts[adultIndex]) {
      reduxDispatch(updateRooms(parseInt(event.target.value)));
    } else {
      reduxDispatch(updateRooms(parseInt(event.target.value)));
      reduxDispatch(updateAdultCount(parseInt(event.target.value)));
    }
  };
  return (
    <>
      {
        <div className="rooms">
          <h4>{t("search.rooms")}</h4>
          <FormControl>
            <Select
              value={selectedRooms.toString()}
              onChange={handleRoomChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              {[...Array(maximumRooms).keys()].map((index) => (
                <MenuItem key={index + 1} value={index + 1}>
                  {index + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      }
    </>
  );
}
