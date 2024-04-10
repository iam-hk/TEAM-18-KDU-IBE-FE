import { styled } from "@mui/system";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";

const TimerDisplay = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontSize: "1.8rem",
  color: "white",
  backgroundColor: "#f81414b5",
  padding: "8px",
  justifyContent: "center",
});

const TimerIcon = styled(AccessAlarmIcon)({
  fontSize: "2.0rem",
  color: "white",
});

const CountdownTimer = () => {
  const timeLeft = useSelector((state: RootState) => state.stepper.timeLeft);
  const minutes = Math.floor(timeLeft / 60);
  const seconds = Math.floor(timeLeft % 60);

  return (
    <TimerDisplay>
      <TimerIcon />
      {minutes} Minutes {seconds} Seconds left!
    </TimerDisplay>
  );
};

export default CountdownTimer;
