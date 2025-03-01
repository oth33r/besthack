import { Table } from "antd";

import styles from "./styles/lots.module.scss";
import { Lot } from "@shared/types/types";
import { useGetLots } from "@shared/services/queries";
import { Loader } from "@shared/components/Loader/Loader";

const columns = [
  {
    title: "id",
    dataIndex: "id",
  },
  {
    title: "Lot number",
    dataIndex: "lotNumber",
  },
  {
    title: "Fuel type",
    dataIndex: "fuelType",
  },
  {
    title: "Oil base name",
    dataIndex: "oilBaseName",
  },
  {
    title: "Region",
    dataIndex: "region",
  },
  {
    title: "Price per ton",
    dataIndex: "pricePerTon",
  },
  {
    title: "Available volume",
    dataIndex: "availableVolume",
  },
];

interface LotsProps {
  data: Lot[];
}

const Lots = ({ data }: LotsProps) => {
  return (
    <Table
      className={styles.lots}
      columns={columns}
      dataSource={data}
      locale={{
        emptyText: "No available lots",
      }}
      pagination={{
        pageSize: 10,
      }}
    />
  );
};

export { Lots };
