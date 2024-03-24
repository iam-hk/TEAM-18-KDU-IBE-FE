import React, { useState } from "react";
import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "./RoomBeds.scss";
import { AppDispatch, RootState } from "../../../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { updateBeds } from "../../../redux/SearchRoomSlice";
const RoomBeds = () => {
  const beds = [1, 2, 3, 4, 5];
  const bedsSelected = useSelector(
    (state: RootState) => state.searchRoomInfo.beds
  );
  const reduxDispatch: AppDispatch = useDispatch();
  const BedMenuInput = () => {
    return (
      <Box>
        <Typography color={"#858685"}>
          <span className="beds-heading">{"Beds"}</span>
        </Typography>
        <Typography>
          <span className="beds-selected">{bedsSelected}</span>
        </Typography>
      </Box>
    );
  };

  const handleBedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    reduxDispatch(updateBeds(parseInt(event.target.value)));
  };

  return (
    <div className="room-page-selected-beds">
      <Select
        value={bedsSelected}
        onChange={handleBedChange}
        sx={{
          "& .MuiSelect-select": {
            padding: "0.7rem",
          },
        }}
        renderValue={() => <BedMenuInput />}
        displayEmpty={true}
        IconComponent={KeyboardArrowDownIcon}
      >
        {beds.map((bed) => (
          <MenuItem key={bed} value={bed}>
            {bed}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default RoomBeds;
