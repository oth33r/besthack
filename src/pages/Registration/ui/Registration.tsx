import { Link } from "react-router-dom";

import { RegistrationForm } from "./RegistrationForm";
import Banner from "@shared/assets/banner.jpg";

import styles from "./styles/registration.module.scss";

const Registration = () => {
  return (
    <section className={styles.registration}>
      <div className={styles.registration__leftSection}>
        <h3 className={styles.registration__subtitle}>START FOR FREE</h3>
        <h1 className={styles.registration__title}>Create account</h1>
        <span>
          Already have an account?{" "}
          <Link to="/authorization" className={styles.registration__link}>
            Log in
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
