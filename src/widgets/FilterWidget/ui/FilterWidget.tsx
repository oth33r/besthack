import { Dropdown, Input } from "antd";
import styles from "./styles/filters.module.scss";
import type { MenuProps } from "antd";

interface FilterWidgetProps {
  regions: MenuProps["items"];
  fuelTypes: MenuProps["items"];
  oilBases: MenuProps["items"];
  onRegionChange: (value: string) => void;
  onFuelChange: (value: string) => void;
  onOilBaseChange: (value: string) => void;
}

const FilterWidget = ({
  regions,
  fuelTypes,
  oilBases,
  onRegionChange,
  onFuelChange,
  onOilBaseChange,
}: FilterWidgetProps) => {
  return (
    <div className={styles.filters}>
      <Dropdown
        menu={{ items: regions, onClick: (e) => onRegionChange(e.key) }}
        trigger={["click"]}
      >
        <Input
          placeholder="Region..."
          variant="borderless"
          className={styles.filters__input}
        />
      </Dropdown>
      <Dropdown
        menu={{ items: fuelTypes, onClick: (e) => onFuelChange(e.key) }}
        trigger={["click"]}
      >
        <Input
          placeholder="Fuel type..."
          variant="borderless"
          className={styles.filters__input}
        />
      </Dropdown>
      <Dropdown
        menu={{ items: oilBases, onClick: (e) => onOilBaseChange(e.key) }}
        trigger={["click"]}
      >
        <Input
          placeholder="Oil base..."
          variant="borderless"
          className={styles.filters__input}
        />
      </Dropdown>
    </div>
  );
};

export { FilterWidget };
