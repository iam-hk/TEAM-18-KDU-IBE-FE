import React, { useState } from "react";
import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "./RoomBeds.scss";

const RoomBeds = () => {
  const beds = [0, 1, 2, 3, 4, 5];
  const [selectedBed, setSelectedBed] = useState("1"); 

  const BedMenuInput = () => {
    return (
      <Box>
        <Typography color={"#858685"}>
          <span className="beds-heading">{"Beds"}</span>
        </Typography>
        <Typography fontWeight={700}><span className="beds-selected">{selectedBed}</span></Typography> 
      </Box>
    );
  };

  const handleBedChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSelectedBed(event.target.value); 
  };

  return (
    <div className="room-page-selected-beds">
      <Select
        value={selectedBed}
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
