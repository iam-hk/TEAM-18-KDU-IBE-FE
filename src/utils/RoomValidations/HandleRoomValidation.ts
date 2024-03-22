import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import {INVALID_ROOM_NAN,NEGATIVE_ROOM,GREATER_ROOMS} from "../../Constants/RoomPageErrorMessages";
export function validateRooms(roomCount:number):string{
    const maximumRooms=useSelector((state:RootState)=>state.tenantInfo.maximumRooms);
    let errorMessage = '';
    if (isNaN(roomCount)) {
       return INVALID_ROOM_NAN;
    }
    else if (roomCount <= 0) {
        return NEGATIVE_ROOM;
    }
    else if (roomCount > maximumRooms) {
        return GREATER_ROOMS;
    }
    return errorMessage;
}