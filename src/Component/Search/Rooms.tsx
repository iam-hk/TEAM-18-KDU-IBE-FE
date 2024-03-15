import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { updateRooms,updateAdultCount } from "../../redux/SearchSlice";
import { AppDispatch, RootState } from "../../redux/Store";
import { useDispatch, useSelector } from "react-redux";
export function Rooms() {
  const selectedRooms = useSelector(
    (state: RootState) => state.searchInfo.rooms
  );
  const maximumRooms = useSelector(
    (state: RootState) => state.tenantInfo.maximumRooms
  );
  const guestCounts=useSelector((state:RootState)=>state.searchInfo.guestCounts);
  // console.log(maximumRooms,"max rooms");
  const reduxDispatch: AppDispatch = useDispatch();
  const handleRoomChange = (event: SelectChangeEvent) => {
    if(parseInt(event.target.value)<=guestCounts[0])
    {
      reduxDispatch(updateRooms(parseInt(event.target.value)));
    }
    else 
    {
      reduxDispatch(updateRooms(parseInt(event.target.value)));
      reduxDispatch(updateAdultCount(parseInt(event.target.value)));
    }
  };
  return (
    <div className="rooms">
      <h4>Rooms</h4>
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
  );
}