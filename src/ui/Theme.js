import { createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";

const appBlue = "#2196f3";
const appBlueDark = "#001970";
const appBlueLight = "#64b5f6";

const appYellow = "#ffeb3b";
const appYellowLight = "#ffff72";
const appYellowDark = "#c8b900";

const appGray = "#f5f5f5";
const appGrayLight = "#ffffff";
const appGrayDark = "#c2c2c2";

const defaultPrimary = "#3f51b5";
const defaultSecondary = "#f50057";

const primary = appGrayLight;
const secondary = appGray;
const yellow = appYellowLight

export default createMuiTheme({
  palette: {
    yellow: {
      main: `${yellow}`,
    },
    appYellowLight: {
      main: `${appYellowLight}`,
    },
    primary: {
      main: `${primary}`,
    },
    secondary: {
      main: `${secondary}`,
    },
  },
});
