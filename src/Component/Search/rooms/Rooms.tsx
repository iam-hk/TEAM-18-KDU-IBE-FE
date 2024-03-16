import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { updateAdultCount } from "../../../redux/PropertyConfigSlice";
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
  const showRoomsSearch = useSelector(
    (state: RootState) => state.propertyConfigInfo.showRoomSearch
  );
  const maximumRooms = useSelector(
    (state: RootState) => state.tenantInfo.maximumRooms
  );
  const guestCounts = useSelector(
    (state: RootState) => state.propertyConfigInfo.guestCounts
  );
  const adultIndex=useSelector((state:RootState)=>state.propertyConfigInfo.adultIndex);
  const reduxDispatch: AppDispatch = useDispatch();
  const handleRoomChange = (event: SelectChangeEvent) => {
    if (parseInt(event.target.value) <= guestCounts[adultIndex]) {
      reduxDispatch(updateRooms(parseInt(event.target.value)));
    } else {
      reduxDispatch(updateRooms(parseInt(event.target.value)));
      reduxDispatch(updateAdultCount(parseInt(event.target.value)));
    }
  };
  return (
    <>
      {showRoomsSearch && (
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
      )}
    </>
  );
}
