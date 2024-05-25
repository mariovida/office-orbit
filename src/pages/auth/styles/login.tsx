import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import styled from "@emotion/styled";
import customColors from "@src/theme/colors";

export const IllustrationBox = styled(Box)({
  maxWidth: "100vw",
  width: "100%",
  maxHeight: "100vh",
  height: "100%",
  overflow: "hidden",
  img: {
    objectFit: "cover",
    width: "100%",
    height: "100%",
  },
});

export const LoginStack = styled(Stack)({
  position: "absolute",
  top: "50%",
  //right: "0",
  //transform: "translate(-50%, -50%)",
  right: "64px",
  transform: "translate(0%, -50%)",
  maxWidth: "450px",
  width: "100%",
  height: "calc(100% - 128px)",
  justifyContent: "center",
  margin: "0 auto",
  padding: "32px",
  backgroundColor: customColors.neutral[100],
  borderRadius: "14px",
  //boxShadow:"rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px",

  background: "rgba(254, 254, 254, 0.59)",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(1px)",

  "& h3": {
    marginBottom: "40px",
    color: customColors.purple.main,
  },

  "@media screen and (max-width:900px)": {
    right: "unset",
    left: "50%",
  },
});

export const FormCard = styled(CardContent)({
  width: "100%",
  alignItems: "flex-start",
  justifyContent: "center",
  padding: "0 !important",
  color: customColors.primary.darkest,

  "& form": {
    width: "100%",

    "& button": {
      marginTop: "40px",
      fontSize: "16px",
      color: customColors.purple.main,
      backgroundColor: "transparent",
      border: "1px solid",
      borderColor: customColors.purple.main,
      borderRadius: "8px",

      "&:hover": {
        backgroundColor: customColors.purple.lightest,
      },
    },
  },
});

export const ErrorStack = styled(Stack)({
  marginBottom: "24px",
  textAlign: "center",
  padding: "16px",
  borderRadius: "8px",
  //border: "1px solid",
  //borderColor: customColors.error.main,
  backgroundColor: customColors.error.light,

  p: {
    fontSize: "15px",
    fontWeight: "600",
    color: customColors.error.darkest,
  },
});
