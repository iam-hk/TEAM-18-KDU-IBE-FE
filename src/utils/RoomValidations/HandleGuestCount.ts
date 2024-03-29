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
  const totalGuests = countOfGuests.reduce((total, count) => {
    return total + count;
  }, 0);
  if (totalGuests !== parsedGuestCount) {
    return GUEST_COUNT_MISMATCH;
  }
  if (countOfGuests[adultIndex] < parsedRoomCount) {
    return NEED_MORE_ADULTS;
  }

  return "";
}
