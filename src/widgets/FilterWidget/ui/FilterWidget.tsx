import { Input } from "antd";
import styles from "./styles/filters.module.scss";

const FilterWidget = () => {
  return (
    <div className={styles.filters}>
      <Input
        placeholder="Region..."
        variant="borderless"
        className={styles.filters__input}
      />
      <Input
        placeholder="Fuel type..."
        variant="borderless"
        className={styles.filters__input}
      />
      <Input
        placeholder="Oil base..."
        variant="borderless"
        className={styles.filters__input}
      />
    </div>
  );
};

export { FilterWidget };
