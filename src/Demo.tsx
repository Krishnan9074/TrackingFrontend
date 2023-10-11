import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    height: 22,
    alignItems: "center",
    justifyContent: "center"
  },
  active: {
    color: "#19C45F"
  },
  completed: {
    color: "#19C45F"
  },
  unfinished: {
    color: "#DEE2E6"
  }
}));

const CustomStepIcon = (props) => {
  const classes = useStyles();
  const { active, completed } = props;

  return (
    <div className={classes.root}>
      {completed ? (
        <CheckCircleIcon className={classes.completed} />
      ) : (
        <CheckCircleIcon
          className={active ? classes.active : classes.unfinished}
        />
      )}
    </div>
  );
};

export default function VerticalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [steps, setSteps] = React.useState([]);

  React.useEffect(() => {
    fetch("https://mocki.io/v1/858a84c2-797b-49c8-9d08-0f419dfe41c2")
      .then((response) => response.json())
      .then((data) => {
        setSteps(data.trackOrder.statusList);
      });
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      fetch("https://mocki.io/v1/72a903a9-6825-4758-9981-f14e8c327ca3")
        .then((response) => response.json())
        .then((data) => {
          if (data[0].success) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
          }
        });
    }, 5000); // Change this to the desired interval

    return () => clearInterval(interval);
  }, []);

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className="tracker">
      <Box sx={{ maxWidth: 400 }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.status}>
              <StepLabel StepIconComponent={CustomStepIcon}>
                {step.status}
              </StepLabel>
              <StepContent>
                <Typography>{step.subHeading}</Typography>
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      onClick={() => setActiveStep(index)}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Go to this step
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button>
          </Paper>
        )}
      </Box>
    </div>
  );
}
