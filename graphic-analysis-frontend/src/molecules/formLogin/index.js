import {
  Grid,
  Stack,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
  FormControl,
  Button,
} from "@mui/material";

const FormLogin = () => {
  return (
    <Grid item xs={5} lg={5}>
      <Stack spacing={3}>
        <h3>Bem-Vindo ao Curupira</h3>
        <TextField id="email-basic" label="Email" variant="outlined" />
        <TextField
          id="pass-basic"
          label="Senha"
          type="password"
          variant="outlined"
        />

        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Lembrar senha"
          />
          <span> Esqueceu sua senha?</span>
        </FormGroup>
      </Stack>
      <br />
      <Button variant="contained">Entre</Button>
    </Grid>
  );
};

export default FormLogin;
