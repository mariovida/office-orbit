import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import styled from "@emotion/styled";
import customColors from "@src/theme/colors";

export const ProgressCircleBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "24px",
});

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

export const ImageBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "80px",
  "& img": {
    width: "90%",
  },
  "@media screen and (max-width:900px)": {
    display: "none",
  },
});

export const LoginStack = styled(Stack)({
  position: "absolute",
  top: "50%",
  //right: "0",
  //transform: "translate(-50%, -50%)",
  right: "32px",
  transform: "translate(0%, -50%)",
  maxWidth: "450px",
  width: "100%",
  height: "calc(100% - 64px)",
  justifyContent: "center",
  margin: "0 auto",
  padding: "32px 48px",
  backgroundColor: customColors.neutral[100],
  borderRadius: "14px",
  boxShadow:
    "rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px",

  //background: "rgba(254, 254, 254, 0.59)",
  //boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  //backdropFilter: "blur(1px)",

  "& h3, & h6": {
    marginBottom: "8px",
    color: customColors.purple.main,
    textAlign: "center",
  },

  "& h6": {
    marginBottom: "48px",
  },

  "@media screen and (max-width:900px)": {
    width: "calc(100% - 32px)",
    padding: "24px",
    right: "unset",
    left: "50%",
    transform: "translate(-50%, -50%)",
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
