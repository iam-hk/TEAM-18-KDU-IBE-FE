import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/Store";
import { updateProperty } from "../../redux/SearchSlice";
export function Property() {
  const selectedProperty = useSelector(
    (state: RootState) => state.searchInfo.property
  );
  const reduxDispatch: AppDispatch = useDispatch();
  const handlePropertyChange = (event: SelectChangeEvent) => {
    reduxDispatch(updateProperty(event.target.value));
  };

  return (
    <div className="search-property-name">
      <h4>Property name*</h4>
      <FormControl>
        <Select
          value={selectedProperty}
          onChange={handlePropertyChange}
          inputProps={{ "aria-label": "Without label" }}
        >
          {[...Array(18)].map((_, index) => (
            <MenuItem
              key={index + 1}
              value={`Property ${index + 1}`}
              disabled={index + 1 !== 18}
            >
              Property {index + 1}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
