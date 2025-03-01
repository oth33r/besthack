import { Dropdown, Input } from "antd";
import styles from "./styles/filters.module.scss";
import type { MenuProps } from "antd";

interface FilterWidgetProps {
  regions: MenuProps["items"];
  fuelTypes: MenuProps["items"];
  oilBases: MenuProps["items"];
}

const FilterWidget = ({ regions, fuelTypes, oilBases }: FilterWidgetProps) => {
  return (
    <div className={styles.filters}>
      <Dropdown menu={{ items: regions }} trigger={["click"]}>
        <Input
          placeholder="Region..."
          variant="borderless"
          className={styles.filters__input}
        />
      </Dropdown>
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
