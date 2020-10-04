import React, { useEffect } from "react";
import { useStateValue } from "./StateProvider";
import {
  withStyles,
  makeStyles,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./ui/Theme";
import "./Order.css";

function Order() {
  const [{ basket }, dispatch] = useStateValue();
  basket.id = {
    id: "1234",
    image:
      "https://firebasestorage.googleapis.com/v0/b/craver-react-7590b.appspot.com/o/images%2Fchocolate-3.jpg?alt=media&token=ac5d2da1-5531-429b-ba44-56c9a5ef661a",
  };

  const useStyles = makeStyles((theme) => ({
    margin: {
      height: theme.spacing(3),
    },
    root: {
      width: "100%",
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }));
  const classes = useStyles();

  // Slider for tips, you can change slider color
  const PrettoSlider = withStyles({
    root: {
      // color: "#ffb74d",
      // color: '#52af77',
      // color: "#b28704",
      // color: "#fdd835",
      color: "#ffeb3b",
      // color: "#4051B5",
      height: 8,
    },
    thumb: {
      height: 24,
      width: 24,
      // backgroundColor: "#fdd835",
      // backgroundColor: "#4051B5",
      // backgroundColor: "#fddb3a",
      border: "2px solid currentColor",
      marginTop: -8,
      marginLeft: -12,
      "&:focus, &:hover, &$active": {
        boxShadow: "inherit",
      },
    },
    active: {},
    valueLabel: {
      left: "calc(-50% + 4px)",
    },
    track: {
      height: 6,
      borderRadius: 4,
    },
    rail: {
      height: 6,
      borderRadius: 4,
    },
  })(Slider);
  // End Slider for Tips

  // Start status bar part
  function getSteps() {
    return ["review order", "Delivery info", "Confirmation"];
  }
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Finish status bar part

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#f5f5f5",
        // main: "#ffb74d",
      },
    },
  });

  return (
    <div className="order">
      {/* Start Status Bar */}
      <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label} className="step__color">
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
      {/* Finish Status Bar */}

      {/* Body page for 3pages */}
      {(() => {
        switch (activeStep) {
          case 0:
            return (
              <div>
                <div className="order__container">
                  <img className="order__image" src={basket.id.image}></img>
                  <div className="order__item__detail__container">
                    <div className="order__item__detail"> ¥3,000</div>
                    <div className="order__item__detail"> 個数 □</div>
                  </div>
                </div>
                <div className="order__container">
                  <img className="order__image" src={basket.id.image}></img>
                  <div className="order__item__detail__container">
                    <div className="order__item__detail"> ¥5,000</div>
                    <div className="order__item__detail"> 個数 □</div>
                  </div>
                </div>

                <div className="order__caption">
                  〇〇さんに投げ銭でお礼を伝えませんか？投げ銭分は合計代金から割引されます！
                </div>
                <div className="order__tip__bar">
                  <div className={classes.margin} />
                  <PrettoSlider
                    valueLabelDisplay="auto"
                    aria-label="pretto slider"
                    defaultValue={30}
                  />
                </div>
                <div className="order__total">Total 5,000</div>
              </div>
            );
          case 1:
            return <div>Delivery Page</div>;
          case 2:
            return <div>Confirmation</div>;
          default:
            return <div></div>;
        }
      })()}

      {/* <div className="order__next">次へ</div> */}
      <div>
        <div>
          <div className="order__buttons">
            <div className="order__button__back">
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
            </div>
            <div className="order__button__next">
              <ThemeProvider theme={theme}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </ThemeProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
