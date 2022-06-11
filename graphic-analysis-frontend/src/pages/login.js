import FormLogin from "../organisms/FormLogin";
import login from "../../assets/images/login-image.png";
import Image from "next/image";
import styles from "../styles/login/styles.module.css"

export default function Login() {
  return (
    <div className={styles.container}>
      <Image width={592} height={592} src={login} objectFit="cover" />
      <FormLogin />
    </div>
  );
}
