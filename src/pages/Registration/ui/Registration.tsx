import { Link } from "react-router-dom";

import { RegistrationForm } from "./RegistrationForm";
import Banner from "@shared/assets/banner.jpg";

import styles from "./styles/registration.module.scss";

const Registration = () => {
  return (
    <section className={styles.registration}>
      <div className={styles.registration__leftSection}>
        <h1 className={styles.registration__title}>Создать аккаунт</h1>
        <span>
          Уже есть аккаунт?{" "}
          <Link to="/authorization" className={styles.registration__link}>
            Войти
          </Link>
        </span>

        <RegistrationForm />
      </div>

      <div className={styles.registration__rightSection}>
        <img
          className={styles.registration__banner}
          src={Banner}
          alt="banner"
        />
      </div>
    </section>
  );
};

export { Registration };
