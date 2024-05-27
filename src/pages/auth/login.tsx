import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { LoginStack, FormCard, ErrorStack, IllustrationBox } from "@src/pages/auth/styles/login";
import { Seo } from "@src/components/seo";
import { useAuth } from "@src/contexts/auth/AuthProvider";
import { useAppDispatch } from "@src/hooks/use-dispatch";
import { loginUser } from "@src/store/slices/usersSlice";
import Grid from "@mui/system/Unstable_Grid";
import { useNavigate } from "react-router-dom";
import { UserCredentials } from "@src/types/users";
import customColors from "@src/theme/colors";

interface FormValues {
  email: string;
  password: string;
}

interface LoginResponse {
  error: string;
  accessToken: string;
}

const validationSchema = Yup.object({
  email: Yup.string().email("Must be a valid email.").max(255).required("Email is required."),
  password: Yup.string().max(255).required("Password is required."),
});

const Page: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = React.useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [passwordForgotLink, setPasswordForgotLink] = useState(false);

  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setShowLoading(true);
      try {
        const response = await dispatch(loginUser(values)).unwrap();
        console.log(response);
        if (response && response.accessToken) {
          login({
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
          });
          setShowLoading(false);
          navigate("/");
        } else {
          setShowLoading(false);
          setErrorMessage("Incorrect email or password. Please try again.");
        }
        if (response && response.error && response.error === "Your account is not active") {
          setShowLoading(false);
          setErrorMessage("Your account is not active.");
        } else if (response && response.error && response.error === "Set password") {
          setShowLoading(false);
          setErrorMessage("You have to set up your password.");
        } else {
          setShowLoading(false);
          setErrorMessage("Incorrect email or password. Please try again.");
        }
      } catch (error) {
        if (error === "HTTP status 401: Unauthorized") {
          setShowLoading(false);
          setErrorMessage("Incorrect email or password. Please try again.");
        } else {
          setShowLoading(false);
          setErrorMessage("An error occurred. Please try again.");
        }
      }
      setShowLoading(false);
    },
  });

  const forgotPasswordLink = () => {
    if (!passwordForgotLink) {
      setPasswordForgotLink(true);
    } else {
      setPasswordForgotLink(false);
    }
  };

  return (
    <>
      <Seo title="Login" />
      <Box component="main">
        <Grid container sx={{ height: "100vh" }}>
          <Grid xs={12} sx={{ position: "relative" }}>
            <IllustrationBox>
              <img src="./illu1.svg" />
            </IllustrationBox>
            <LoginStack>
              <FormCard>
                {!passwordForgotLink ? (
                  <>
                    <Typography variant="h3">Log in</Typography>
                    <Typography variant="subtitle1">
                      Welcome back! Please log in to continue.
                    </Typography>
                    {errorMessage && (
                      <ErrorStack>
                        <Typography>{errorMessage}</Typography>
                      </ErrorStack>
                    )}
                    <form noValidate onSubmit={formik.handleSubmit}>
                      <Stack spacing={2}>
                        <TextField
                          fullWidth
                          label="Email address"
                          name="email"
                          type="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          error={formik.touched.email && Boolean(formik.errors.email)}
                          helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField
                          fullWidth
                          label="Password"
                          name="password"
                          type="password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          error={formik.touched.password && Boolean(formik.errors.password)}
                          helperText={formik.touched.password && formik.errors.password}
                        />
                      </Stack>
                      <Typography
                        sx={{
                          display: "inline-block",
                          fontSize: "14px",
                          color: customColors.purple.main,
                          marginTop: "16px",
                          cursor: "pointer",
                        }}
                        onClick={forgotPasswordLink}
                      >
                        Forgot password?
                      </Typography>
                      <Button fullWidth size="large" type="submit" disabled={showLoading}>
                        Login
                      </Button>
                    </form>
                  </>
                ) : (
                  <>
                    <Typography
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        fontSize: "14px",
                        color: customColors.purple.main,
                        marginBottom: "40px",
                        cursor: "pointer",
                      }}
                      onClick={forgotPasswordLink}
                    >
                      Go back
                    </Typography>
                    <Typography variant="h3">Reset password</Typography>
                    <Typography variant="subtitle1">
                      Enter your email address and we'll send you instructions for reseting your
                      password.
                    </Typography>
                    <form>
                      <TextField
                        fullWidth
                        label="Email address"
                        name="email"
                        type="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                      />
                      <Button fullWidth size="large" type="submit" disabled={showLoading}>
                        Confirm
                      </Button>
                    </form>
                  </>
                )}
              </FormCard>
            </LoginStack>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Page;
