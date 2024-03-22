import { useSelector } from "react-redux";
import { INVALID_DATE_FORMAT,INVALID_YEAR,INVALID_MONTH,INVALID_TIME_PERIOD } from "../../Constants/RoomPageErrorMessages";
import { RootState } from "../../redux/Store";

export function validateDates(startDateString: string, endDateString: string): string {
  const maxDays=useSelector((state:RootState)=>state.tenantInfo.maximumDays);
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);
  const currentYear = new Date().getFullYear();
  if (isNaN(startDate.getTime())||isNaN(endDate.getTime())) {
      return INVALID_DATE_FORMAT;
  }
  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();
  if (startYear !== currentYear||endYear!==currentYear) {
      return INVALID_YEAR;
  }
 
  const startMonth = startDate.getMonth() + 1;
  const endMonth = endDate.getMonth() + 1;
  if (startMonth < 1 || startMonth > 12||endMonth < 1 || endMonth > 12) 
  {
    return INVALID_MONTH;
  }
  const diffInDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  if (diffInDays > maxDays) {
     return INVALID_TIME_PERIOD;
  }
  return "";
}