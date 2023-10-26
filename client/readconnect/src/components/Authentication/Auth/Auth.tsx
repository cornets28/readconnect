import React, { FC, useState } from "react";
import Avatar from "@mui/material/Avatar";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";

import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { Button } from "@/mui-components/Button/Button";
import { Typography } from "@/mui-components/Typography/Typography";
import { Grid } from "@/mui-components/Grid/Grid";
import { Container } from "@/mui-components/Container/Container";
import { TextField } from "@/mui-components/TextField/TextField";
import { useAuthenticationStyle } from "@/components/Authentication/styles/useAuthenticationStyle";
import colors from "@/utils/theme/base/colors";
import axios from "axios";
import Modal from "@mui/material/Modal";
import { SIGNUP_ROUTE, LOGIN_ROUTE} from "@/utils/constants";
import { reducerCases } from "@/context/constants";
import { useStateProvider } from "@/context/StateContext";

import { useCookies } from "react-cookie";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({
  // @ts-ignore
  open, handleClose, type,
}) {
  const [cookie, setCookie] = useCookies()
  const [{ showLoginModal, showRegisterModal }, dispatch] = useStateProvider();

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    
    try {
      const { username, email, password } = values;

      if (type === "login") {
        if (password && email) {
          const {
            data: { user, jwt }
          } = await axios.post(
            LOGIN_ROUTE,
            {email, password },
            { withCredentials: true }
          );
          setCookie("jwt", { jwt });
  
          dispatch({ type: reducerCases.CLOSE_AUTH_MODAL });
  
          if (user) {
            dispatch({ type: reducerCases.SET_USER, userInfo: user });
            window.location.reload();
          }
        }
      } else {
        if (username && password && email) {  
          const {
            data: { user, jwt }
          } = await axios.post(
             SIGNUP_ROUTE,
            { username, email, password },
            { withCredentials: true }
          );
          setCookie("jwt", { jwt });
  
          dispatch({ type: reducerCases.CLOSE_AUTH_MODAL });
  
          if (user) {
            dispatch({ type: reducerCases.SET_USER, userInfo: user });
            window.location.reload();
          }
        }
      }

  
      
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                {type === "login"
                  ? "Sign in to ReadConnect"
                  : "Register to ReadConnect"}
              </Typography>
              <Box component="form" sx={{ mt: 1 }}>
                {type === "register" && (
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    size="small"
                    onChange={handleChange}
                    value={values.username}
                  />
                )}

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  size="small"
                  onChange={handleChange}
                  value={values.email}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  size="small"
                  onChange={handleChange}
                  value={values.password}
                />

                <Grid item ml={-28}>
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: "secondary.main" }}
                  onClick={handleSubmit}
                >
                  {type === "login" ? "Sign In" : "Sign Up"}
                </Button>
                <Grid container>
                  {type === "login" && (
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                  )}

                  <Grid item>
                    {type === "login" ? (
                      <Typography
                        variant="body2"
                        onClick={() => {
                          dispatch({
                            type: reducerCases.TOGGLE_REGISTER_MODAL,
                            showRegisterModal: true,
                          });
                          dispatch({
                            type: reducerCases.TOGGLE_LOGIN_MODAL,
                            showLoginModal: false,
                          });
                        }}
                      >
                        {"Don't have an account? Sign Up"}
                      </Typography>
                    ) : (
                      <Typography
                        onClick={() => {
                          dispatch({
                            type: reducerCases.TOGGLE_LOGIN_MODAL,
                            showRegisterModal: false,
                          });
                          dispatch({
                            type: reducerCases.TOGGLE_LOGIN_MODAL,
                            showLoginModal: true,
                          });
                        }}
                      >
                        Already have an account? Sign in
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </Box>
      </Modal>
    </div>
  );
}
