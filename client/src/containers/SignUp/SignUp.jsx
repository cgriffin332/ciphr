// React
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
// Material UI
import { Avatar, CssBaseline, Container, makeStyles, Typography } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
// File Modules
import API from "../../utils/API";
import AuthContext from "../../context/AuthContext/AuthContext";
import CredentialsForm from "../../components/CredentialsForm/CredentialsForm";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(./img/magic-macbook.jpg)",
    // backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUpSide() {
  const classes = useStyles();

  // Using AuthContextAPI to get the setJwt function
  const { setJwt } = useContext(AuthContext);

  // hook configures username/password state
  // to find state in dev tools 'Components' look under 'SignUpSide'
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    // handles input of either username or password
    setUserInfo({ ...userInfo, [name]: value });
  };

  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    // username/password posted to back end
    // see API.js in utils for more info
    console.log(userInfo);
    API.postNewUserInfo(userInfo)
      .then((response) => {
        console.log(response);
        // Setting the AuthContextAPI jwt to the new jwt received from the backend
        setJwt(response.data.data);
        history.push("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <CredentialsForm
          {...userInfo}
          handleInput={handleInput}
          handleSubmit={handleSubmit}
          classes={classes}
          type={"Sign Up"}
          link={"/"}
          linkText={"Already have an account? Sign in here!"}
        />
      </div>
    </Container>
  );
}
