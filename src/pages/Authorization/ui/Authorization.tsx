import { Link } from "react-router-dom";

import { AuthorizationForm } from "./AuthorizationForm";
import Banner from "@shared/assets/banner.jpg";

import styles from "./styles/authorization.module.scss";

const Authorization = () => {
  return (
    <section className={styles.authorization}>
      <div className={styles.authorization__leftSection}>
        <h1 className={styles.authorization__title}>Welcome back!</h1>
        <span>
          Do not have an account?{" "}
          <Link to="/registration" className={styles.authorization__link}>
            Sign up
          </Link>
        </span>

        <AuthorizationForm />
      </div>

      <div className={styles.authorization__rightSection}>
        <img
          className={styles.authorization__banner}
          src={Banner}
          alt="banner"
        />
      </div>
    </section>
  );
};

export { Authorization };
