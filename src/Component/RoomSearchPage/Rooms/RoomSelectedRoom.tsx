import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { updateRooms } from "../../../redux/SearchRoomSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { RootState } from "../../../redux/Store";
import {
  resetGuests,
  updateAdultCount,
} from "../../../redux/PropertyConfigSlice";
import "./RoomSelectedRoom.scss";
const RoomSelectedRoom = () => {
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
  const reduxDispatch = useDispatch();

  const RoomsName = () => {
    return (
      <Box>
        <Typography color={"#858685"}>
          <span className="rooms-heading">{t("search.rooms")}</span>
        </Typography>
        <Typography>
          <span className="selected-room">{selectedRooms.toString()}</span>
        </Typography>
      </Box>
    );
  };

  const handleRoomChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    let totalGuests = 0;
    guestCounts.forEach((guest) => {
      totalGuests += guest;
    });

    const selectedRoomCount = parseInt(event.target.value as string);

    if (selectedRoomCount * maxGuest < totalGuests) {
      reduxDispatch(resetGuests(selectedRoomCount));
    }

    if (selectedRoomCount <= guestCounts[adultIndex]) {
      reduxDispatch(updateRooms(selectedRoomCount));
    } else {
      reduxDispatch(updateRooms(selectedRoomCount));
      reduxDispatch(updateAdultCount(selectedRoomCount));
    }
  };
  return (
    <div className="room-page-selected-rooms">
      {/* <FormControl> */}
      <Select
        value={selectedRooms.toString()}
        onChange={handleRoomChange}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        IconComponent={KeyboardArrowDownIcon}
        renderValue={() => <RoomsName />}
      >
        {Array.from({ length: maximumRooms }, (_, index) => (
          <MenuItem key={index + 1} value={index + 1}>
            {index + 1}
          </MenuItem>
        ))}
      </Select>
      {/* </FormControl> */}
    </div>
  );
};

export default RoomSelectedRoom;
