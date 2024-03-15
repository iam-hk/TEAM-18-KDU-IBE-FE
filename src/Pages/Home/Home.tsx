import { useEffect} from "react";
import "./Home.scss";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Property } from "../../Component/Search/Property";
import { Rooms } from "../../Component/Search/Rooms";
import { Guests } from "../../Component/Search/Guests";
import { AppDispatch, RootState } from "../../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { updateGuestDispInfo } from "../../redux/SearchSlice";
import { getTenantConfig } from "../../redux/thunk/GetTenantConfig";

export function Home() {
  const bannerImage=useSelector((state:RootState)=>state.tenantInfo.bannerImage);
  // const maximumGuests=useSelector((state:RootState)=>state.tenantInfo.maixmumGuests);
  const guestCounts = useSelector((state: RootState) => state.searchInfo.guestCounts);  
  const reduxDispatch: AppDispatch = useDispatch();
  useEffect(() => {
    reduxDispatch(getTenantConfig());
  }, []);
  useEffect(() => {
    reduxDispatch(updateGuestDispInfo());
  }, [guestCounts]);
  return (
    <div className="home"  style={{ '--banner-image': `url(${bannerImage})` }}>
    <div className="home-wrapper">
      <div className="search-form">
        <div className="all-search-fields">
          <Property />
          <div className="search-property-calendar">
            <h4>Select dates</h4>
            <FormControl>
              <Select
                // value={property}

                // onChange={handlePropertyChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="">
                  <em>Search all properties</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="guests-and-rooms">
            <Guests />
            <Rooms />
          </div>
          <div className="disabled-checkbox">
            <input type="checkbox" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/0c/Wheelchair_symbol.svg" alt="" />
            <h5>I need an accessible room</h5>
          </div>
        </div>
        <div className="submit-button">
          <button>SEARCH</button>
        </div>
      </div>
    </div>
    </div>
  );
}
