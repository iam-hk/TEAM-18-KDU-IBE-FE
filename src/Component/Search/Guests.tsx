import { FormControl, MenuItem, Select } from "@mui/material";
import guestArray from "../../Constants/GuestType";
import { AppDispatch, RootState } from "../../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import {
  updateGuestCounts,
  updateGuestDispInfo,
} from "../../redux/SearchSlice";
export function Guests() {
  const guestCounts = useSelector(
    (state: RootState) => state.searchInfo.guestCounts
  );
  const selectedRooms = useSelector(
    (state: RootState) => state.searchInfo.rooms
  );
  const guestDispInfo = useSelector(
    (state: RootState) => state.searchInfo.guestDispInfo
  );
  const reduxDispatch: AppDispatch = useDispatch();
  const updateGuestInfo = () => {
    reduxDispatch(updateGuestDispInfo());
  };
  const handleGuestCountChange = (index: number, increment: boolean) => {
    if(index===0&&increment===false)
    {
      if(guestCounts[index]>selectedRooms)
      {
        reduxDispatch(updateGuestCounts({ index, increment }));
      }
    }
    else
    {
    reduxDispatch(updateGuestCounts({ index, increment }));
    }
  };
  return (
    <div className="guests">
      <h4>Guests</h4>
      <FormControl>
        <Select
          renderValue={() => <span>{guestDispInfo}</span>}
          onChange={updateGuestInfo}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          {guestArray.map((guest, index) => (
            <MenuItem key={index} value={guest.type}>
              <div className="guest-type-info">
                <div className="guest-type">
                  <h4>{guest.type}</h4>
                  <h5>{guest.age}</h5>
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
  );
}
