import FormLogin from "../../components/form/FormLogin";
import login from "../../../assets/login.svg";
import Image from "next/image";
import styles from "./styles.module.css";

export default function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image src={login} objectFit="cover" alt="illustration" />
      </div>
      <div className={styles.loginContainer}>
        <FormLogin />
      </div>
    </div>
  );
}