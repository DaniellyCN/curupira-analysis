import React, { useState, useContext } from "react";
import {LoginContext} from '../context/LoginContext';
import {
  Grid,
  Stack,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Button,
} from "@mui/material";
import styles from "../styles/login/styles.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "next/router";


const FormLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useContext(LoginContext);

  async function handleLogin(event) {
    event.preventDefault();
    toast("Autenticação está sendo validada");
   

    try {
      const response = await fetch(
        "https://ijp791wom7.execute-api.us-east-1.amazonaws.com/login",
        {
          method: "POST",
          body: JSON.stringify({
            username: username,
            password: password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      const { token, message } = data;
        
      setToken(token);

     if(response.status === 200){
      toast.success("Login efetuado com sucesso :D", message, token);
      Router.push("/home");
    }else if(response.status === 401){
      toast.error("Senha ou Username incorreto :(", err);
      console.log(err);
    }


    } catch (err) {
      toast.error("Algo deu errado :(", err);
      console.log(err);
    }
  }

  return (
    <Grid item xs={5} lg={5}>
      <Stack spacing={3}>
        <h3>Bem vindo a Curupira</h3>
        <TextField
          id="email-basic"
          label="Username"
          variant="outlined"
          className={styles.textInput}
          onChange={(event) => setUsername(event.target.value)}
        />
        <TextField
          id="pass-basic"
          label="Senha"
          type="password"
          variant="outlined"
          className={styles.textInput}
          onChange={(event) => setPassword(event.target.value)}
        />

        <FormGroup>
          
        </FormGroup>
      </Stack>
      <br />

      <Button
        variant="contained"
        onClick={handleLogin}
        className={styles.button}
      >
        Entre
      </Button>

      <ToastContainer autoClose={5000}/>
    </Grid>
  );
};

export default FormLogin;
