import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Check from "@mui/icons-material/Check";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";
import "./Stepper.scss";
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#26266d",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#26266d",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#c1c2c2", // Default line color
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: ownerState.completed
    ? "#26266d"
    : ownerState.active
    ? "red"
    : "#c1c2c2",
  zIndex: 1,
  color: ownerState.active ? "#26266d" : "#5d5d5d",
  width: 40,
  height: 40,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  "@media (max-width: 768px)": {
    width: 35,
    height: 35,
  },
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {completed || active ? <Check style={{ color: "#fff" }} /> : null}
    </ColorlibStepIconRoot>
  );
}

const steps = ["1:Choose Room", "2:Choose Add on", "3.Checkout"];

export function StepperUI() {
  const stepperState = useSelector(
    (state: RootState) => state.stepper.currentState
  );
  return (
    <div className="stepper-container">
      <div className="stepper">
        <Stack sx={{ width: "100%" }} spacing={6}>
          <Stepper
            alternativeLabel
            activeStep={stepperState}
            connector={<ColorlibConnector />}
          >
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel
                  StepIconComponent={ColorlibStepIcon}
                  completed={index < stepperState ? "true" : undefined}
                >
                  <span
                    className={index === stepperState ? "active-label" : ""}
                  >
                    {label}
                  </span>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Stack>
      </div>
    </div>
  );
}
