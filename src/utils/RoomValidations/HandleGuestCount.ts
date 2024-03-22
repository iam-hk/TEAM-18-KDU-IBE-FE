import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import { NEED_MORE_ROOMS } from "../../Constants/RoomPageErrorMessages";
export function handleGuestCount(guestCount:number,roomCount:number):string
{
    const maxGuests = useSelector(
        (state: RootState) => state.tenantInfo.maixmumGuests
      );
    if(guestCount>roomCount*maxGuests)
    {
        return NEED_MORE_ROOMS;
    }
    return "";
}