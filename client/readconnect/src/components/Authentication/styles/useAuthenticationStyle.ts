import { makeStyles } from "@mui/styles";
import colors from "../../../utils/theme/base/colors";

const { orange, green, grey } = colors;

export const useAuthenticationStyle = makeStyles(() => ({
  viewButton: {
    width: 30,
    "&:hover": {
      backgroundColor: `${green.main} !important`,
      color: `${grey["100"]}`,
    },
  },
  loginButton: {
    width: 40,
    marginLeft: "-.7rem !important",
    "&:hover": {
      backgroundColor: `${orange.focus} !important`,
      color: `${grey["100"]}`,
    },
  },
}));
