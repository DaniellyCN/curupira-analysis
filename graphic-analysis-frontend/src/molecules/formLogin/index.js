import React, { useState } from "react";
import {
  Grid,
  Stack,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Button,
} from "@mui/material";
import { useRouter } from 'next/router'
import api from "../../services/api";

const FormLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleLogin(event) {
    event.preventDefault();

    try {
      const response = await api.post("/login", {
        username: username,
        password: password,
      });

      const { token, message } = response.data;
      alert(message);
      alert(token);
     
      router.push("/")
      
      
    } catch (err) {
      console.log("Deu Ruim", err);
    }
  }

  return (
    <Grid item xs={5} lg={5}>
      <Stack spacing={3}>
        <h3>Bem-Vindo ao Curupira</h3>
        <TextField
          id="email-basic"
          label="Username"
          variant="outlined"
          onChange={(event) => setUsername(event.target.value)}
        />
        <TextField
          id="pass-basic"
          label="Senha"
          type="password"
          variant="outlined"
          onChange={(event) => setPassword(event.target.value)}
        />

        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Lembrar senha"
          />
        </FormGroup>
      </Stack>
      <br />
     
      <Button variant="contained" onClick={handleLogin}>
        Entre
      </Button>
    
    </Grid>
  );
};

export default FormLogin;
