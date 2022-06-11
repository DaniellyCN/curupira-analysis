import React, { useState, useContext } from "react";
import { LoginContext } from "../context/LoginContext";
import { Stack, TextField, Button, Divider } from "@mui/material";
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

      if (response.status === 200) {
        toast.success("Login efetuado com sucesso :D", message, token);
        Router.push("/home");
      } else if (response.status === 401) {
        toast.error("Senha ou Username incorreto :(", err);
        console.log(err);
      }
    } catch (err) {
      toast.error("Algo deu errado :(", err);
      console.log(err);
    }
  }

  return (
    <>
      <Stack spacing={2}>
        <h4>Bem vindo ao Curupira</h4>
        <br />
        <TextField
          id="email-basic"
          label="Usuário"
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
        <br />
        <br />
        <Button variant="contained" onClick={handleLogin} className={styles.button}
        disabled={!username || !password || username.length < 3 || password.length < 3}>
          Entrar
        </Button>
      </Stack>

      <ToastContainer autoClose={5000} />
    </>
  );
};

export default FormLogin;
