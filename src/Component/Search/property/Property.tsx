import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/Store";
import { useEffect, useState } from "react";
import { getPropertyConfig } from "../../../redux/thunk/GetPropertyConfig";
import { getPropertyNames } from "../../../redux/thunk/GetPropertyNames";
import { useTranslation } from "react-i18next";
import "./Property.scss";
import { updateSelectedProperty } from "../../../redux/SearchRoomSlice";
export function Property() {

  const [property, setProperty] = useState("");
  const propertyList = useSelector(
    (state: RootState) => state.propertyNameInfo.propertyList
  );
  const reduxDispatch: AppDispatch = useDispatch();
  const handlePropertyChange = (event: SelectChangeEvent) => {
    const selectedPropertyValue :string = event.target.value;
    setProperty(selectedPropertyValue);
    reduxDispatch(updateSelectedProperty(selectedPropertyValue));
    reduxDispatch(getPropertyConfig());
  };
  useEffect(() => {
    reduxDispatch(getPropertyNames());
  }, []);
  const { t } = useTranslation();
  return (
    <div className="search-property-name">
      <h4>{t("search.propertyName")}</h4>
      <FormControl>
        <Select
          value={property}
          onChange={handlePropertyChange}
          inputProps={{ "aria-label": "Without label" }}
        >
          {propertyList.map((property, index) => (
            <MenuItem
              key={index + 1}
              value={property}
              disabled={index !== propertyList.length - 1}
            >
              {property}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
