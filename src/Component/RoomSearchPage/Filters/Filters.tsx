// import { useDispatch, useSelector } from "react-redux";
// import {
//   toggleBedTypeVisibility,
//   toggleRoomTypeVisibility,
//   toggleBedType,
//   toggleRoomType,
//   setBedTypeVisibility,
//   setRoomTypeVisibility,
// } from "../../../redux/FilterRoomSlice";
// import downArrow from "../../../assets/down-arrow.png";
// import upArrow from "../../../assets/up-arrow.png";
// import "./Filters.scss";
// import { roomTypeNames } from "../../../Constants/RoomTypeNames";
// import { RootState } from "../../../redux/Store";
// import { useState } from "react";

// export default function Filters() {
//   const dispatch = useDispatch();
//   const [toggleFilters, setToggleFilters] = useState(false);
//   const bedTypeVisible = useSelector(
//     (state: RootState) => state.filterRoom.bedType
//   );
//   const roomTypeVisible = useSelector(
//     (state: RootState) => state.filterRoom.roomType
//   );
//   const handleToggleBedTypeVisibility = () => {
//     dispatch(toggleBedTypeVisibility());
//   };

//   const handleToggleRoomTypeVisibility = () => {
//     dispatch(toggleRoomTypeVisibility());
//   };

//   const handleToggleBedType = (bedType: string) => {
//     dispatch(toggleBedType(bedType));
//   };

//   const handleToggleRoomType = (roomType: string) => {
//     dispatch(toggleRoomType(roomType));
//   };
  // function handleToggleFilter() {
  //   if (toggleFilters === true) {
  //     dispatch(setBedTypeVisibility(false));
  //     dispatch(setRoomTypeVisibility(false));
  //   }
  //   setToggleFilters(!toggleFilters);
  // }
//   return (
//     <div className="filter-wrapper">
//       <div className="filter-container">
//         <div className="filter-heading">
//           <h2 className="filter-heading-text">Narrow your results</h2>
//           <div className="arrow toggleDisplay" onClick={handleToggleFilter}>
//             <img
//               src={downArrow}
//               alt=""
//               style={{ display: toggleFilters ? "none" : "block" }}
//             />
//             <img
//               src={upArrow}
//               alt=""
//               style={{ display: toggleFilters ? "block" : "none" }}
//             />
//           </div>
//         </div>
//         <div className="each-filter">
//           <div className="filter-name" onClick={handleToggleBedTypeVisibility}>
//             <h3 className="filter-content">Bed type</h3>
//             <div className="arrow">
//               <img
//                 src={downArrow}
//                 alt=""
//                 style={{ display: bedTypeVisible ? "none" : "block" }}
//               />
//               <img
//                 src={upArrow}
//                 alt=""
//                 style={{ display: bedTypeVisible ? "block" : "none" }}
//               />
//             </div>
//           </div>
//           {bedTypeVisible && (
//             <div className="filter-type">
//               <div className="filter-options">
//                 <input
//                   type="checkbox"
//                   onChange={() => handleToggleBedType("Single bed")}
//                 />
//                 <p className="filter-text">Single bed</p>
//               </div>
//               <div className="filter-options">
//                 <input
//                   type="checkbox"
//                   onChange={() => handleToggleBedType("Double bed")}
//                 />
//                 <p className="filter-text">Double bed</p>
//               </div>
//             </div>
//           )}
//         </div>
//         <div className="each-filter">
//           <div className="filter-name" onClick={handleToggleRoomTypeVisibility}>
//             <h3 className="filter-content">Room type</h3>
//             <div className="arrow">
//               <img
//                 src={downArrow}
//                 alt=""
//                 style={{ display: roomTypeVisible ? "none" : "block" }}
//               />
//               <img
//                 src={upArrow}
//                 alt=""
//                 style={{ display: roomTypeVisible ? "block" : "none" }}
//               />
//             </div>
//           </div>
//           {roomTypeVisible && (
//             <div className="filter-type">
//               {roomTypeNames.map((roomType, index) => (
//                 <div
//                   className="filter-options"
//                   key={index}
//                   onClick={() => handleToggleRoomType(roomType)}
//                 >
//                   <input type="checkbox" />
//                   <p className="filter-text">{roomType}</p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {toggleFilters && (
//           <>
//             <div className="each-filter-copy">
//               <div
//                 className="filter-name"
//                 onClick={handleToggleBedTypeVisibility}
//               >
//                 <h3 className="filter-content">Bed type</h3>
//                 <div className="arrow">
//                   <img
//                     src={downArrow}
//                     alt=""
//                     style={{ display: bedTypeVisible ? "none" : "block" }}
//                   />
//                   <img
//                     src={upArrow}
//                     alt=""
//                     style={{ display: bedTypeVisible ? "block" : "none" }}
//                   />
//                 </div>
//               </div>
//               {bedTypeVisible && (
//                 <div className="filter-type">
//                   <div className="filter-options">
//                     <input
//                       type="checkbox"
//                       onChange={() => handleToggleBedType("Single bed")}
//                     />
//                     <p className="filter-text">Single bed</p>
//                   </div>
//                   <div className="filter-options">
//                     <input
//                       type="checkbox"
//                       onChange={() => handleToggleBedType("Double bed")}
//                     />
//                     <p className="filter-text">Double bed</p>
//                   </div>
//                 </div>
//               )}
//             </div>
//             <div className="each-filter-copy">
//               <div
//                 className="filter-name"
//                 onClick={handleToggleRoomTypeVisibility}
//               >
//                 <h3 className="filter-content">Room type</h3>
//                 <div className="arrow">
//                   <img
//                     src={downArrow}
//                     alt=""
//                     style={{ display: roomTypeVisible ? "none" : "block" }}
//                   />
//                   <img
//                     src={upArrow}
//                     alt=""
//                     style={{ display: roomTypeVisible ? "block" : "none" }}
//                   />
//                 </div>
//               </div>
//               {roomTypeVisible && (
//                 <div className="filter-type">
//                   {roomTypeNames.map((roomType, index) => (
//                     <div
//                       className="filter-options"
//                       key={index}
//                       onClick={() => handleToggleRoomType(roomType)}
//                     >
//                       <input type="checkbox" />
//                       <p className="filter-text">{roomType}</p>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

import { useDispatch, useSelector } from "react-redux";
import { addFilters, removeFilters, toggleFilterOption,toggleFilterVisibility } from "../../../redux/PropertyConfigSlice";
import downArrow from "../../../assets/down-arrow.png";
import upArrow from "../../../assets/up-arrow.png";
import "./Filters.scss";
import { roomTypeNames } from "../../../Constants/RoomTypeNames";
import { AppDispatch, RootState } from "../../../redux/Store";
import { useState } from "react";

export default function Filters() {
  const reduxDispatch:AppDispatch = useDispatch();
  const isFilterVisible = useSelector((state: RootState) => state.propertyConfigInfo.isFilterVisible);
  const appliedFilters = useSelector((state: RootState) => state.propertyConfigInfo.appliedFilters);
  const filters=useSelector((state:RootState)=>state.propertyConfigInfo.filters);
  const [toggleFilters, setToggleFilters] = useState(false);
  const handleToggleFilterVisibility = (index: number) => {
    reduxDispatch(toggleFilterVisibility(index));
  };

  const handleToggleFilterOption = (filterIndex: number, option: string) => {
    if(appliedFilters.includes(option)){
      reduxDispatch(removeFilters(option));
    }else{
      reduxDispatch(addFilters(option));
    }
  };

  function handleToggleFilter() 
  {
    if (toggleFilters === true) 
    {
      setToggleFilters(!toggleFilters);
    }
  }

  return (
    <div className="filter-wrapper">
      <div className="filter-container">
        <div className="filter-heading">
          <h2 className="filter-heading-text">Narrow your results</h2>
          <div className="arrow toggleDisplay" onClick={handleToggleFilter}>
            <img
              src={downArrow}
              alt=""
              style={{ display: toggleFilters ? "none" : "block" }}
            />
            <img
              src={upArrow}
              alt=""
              style={{ display: toggleFilters ? "block" : "none" }}
            />
          </div>
        </div>
        {filters.map((filter, index) => (
        <div className="each-filter" key={index}>
          <div className="filter-name" onClick={() => handleToggleFilterVisibility(index)}>
            <h3 className="filter-content">{filter.filterTitle}</h3>
            <div className="arrow">
              <img
                src={downArrow}
                alt=""
                style={{ display: isFilterVisible[index] ? "none" : "block" }}
              />
              <img
                src={upArrow}
                alt=""
                style={{ display: isFilterVisible[index] ? "block" : "none" }}
              />
            </div>
          </div>
          {isFilterVisible[index] && (
            <div className="filter-type">
              {filter.options.map((option, optionIndex) => (
                <div className="filter-options" key={optionIndex}>
                  <input
                    type="checkbox"
                    onChange={() => handleToggleFilterOption(index, option)}
                    checked={appliedFilters.includes(option)}
                  />
                  <p className="filter-text">{option}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      </div>
    </div>
  );
}
