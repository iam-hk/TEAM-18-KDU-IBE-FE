import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import {
  NEED_MORE_ROOMS,
  NEED_MORE_ADULTS,
  INVALID_GUEST_COUNT,
  INVALID_ROOM_COUNT,
  GUEST_COUNT_MISMATCH,
} from "../../Constants/RoomPageErrorMessages";
export function validateGuestCount(
  guestCount: string | null,
  roomCount: string | null,
  countOfGuests: number[],
  adultIndex: number,
  maxGuests: number
): string {
  console.log(countOfGuests.length, "len");
  if (guestCount === null || isNaN(parseInt(guestCount))) {
    return INVALID_GUEST_COUNT;
  }
  if (roomCount === null || isNaN(parseInt(roomCount))) {
    return INVALID_ROOM_COUNT;
  }
  const parsedGuestCount = parseInt(guestCount);
  const parsedRoomCount = roomCount !== null ? parseInt(roomCount) : 0;

  if (parsedGuestCount > parsedRoomCount * maxGuests) {
    return NEED_MORE_ROOMS;
  }
  // const totalGuests = countOfGuests.reduce((total, count) => total + count, 0);
  const totalGuests = countOfGuests.reduce((total, count, index) => {
    console.log(`Guest count at index ${index}: ${count}`);
    return total + count;
  }, 0);
  console.log(totalGuests, "tot", parsedGuestCount, "parsed");
  if (totalGuests !== parsedGuestCount) {
    return GUEST_COUNT_MISMATCH;
  }
  if (countOfGuests[adultIndex] < parsedRoomCount) {
    return NEED_MORE_ADULTS;
  }

  return "";
}
