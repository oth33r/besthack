import { Dropdown, Input, Button } from "antd";
import styles from "./styles/filters.module.scss";
import type { MenuProps } from "antd";
import { useState } from "react";

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
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedFuel, setSelectedFuel] = useState<string | null>(null);
  const [selectedOilBase, setSelectedOilBase] = useState<string | null>(null);

  const resetFilters = () => {
    setSelectedRegion(null);
    setSelectedFuel(null);
    setSelectedOilBase(null);
    onRegionChange("");
    onFuelChange("");
    onOilBaseChange("");
  };

  return (
    <div className={styles.filters}>
      <Dropdown
        menu={{
          items: regions,
          onClick: (e) => {
            setSelectedRegion(e.key);
            onRegionChange(e.key);
          },
        }}
        trigger={["click"]}
      >
        <Input
          placeholder={selectedRegion || "Region..."}
          variant="borderless"
          className={styles.filters__input}
          readOnly
        />
      </Dropdown>

      <Dropdown
        menu={{
          items: fuelTypes,
          onClick: (e) => {
            setSelectedFuel(e.key);
            onFuelChange(e.key);
          },
        }}
        trigger={["click"]}
      >
        <Input
          placeholder={selectedFuel || "Fuel type..."}
          variant="borderless"
          className={styles.filters__input}
          readOnly
        />
      </Dropdown>

      <Dropdown
        menu={{
          items: oilBases,
          onClick: (e) => {
            setSelectedOilBase(e.key);
            onOilBaseChange(e.key);
          },
        }}
        trigger={["click"]}
      >
        <Input
          placeholder={selectedOilBase || "Oil base..."}
          variant="borderless"
          className={styles.filters__input}
          readOnly
        />
      </Dropdown>

      <Button onClick={resetFilters} type="default">
        Reset
      </Button>
    </div>
  );
};

export { FilterWidget };
