import FormLogin from "../molecules/formLogin/index";
import login from "../../assets/images/login-image.png";
import Image from "next/image";
import styles from '../pages/login/styles.module.css';


const Login = () => {
  return (
    <div className={styles.container}>
      <Image width={592} height={592} src={login} objectFit="cover" />
      <FormLogin />
    </div>
  );
};

export default Login;
