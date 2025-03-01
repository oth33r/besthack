import { Table } from "antd";

import styles from "./styles/lots.module.scss";

const columns = [
  {
    title: "№",
    dataIndex: "number",
  },
  {
    title: "Топливо",
    dataIndex: "fuel",
  },
];

const data = [
  {
    number: 1,
    fuel: "АИ-95",
  },
  {
    number: 2,
    fuel: "АИ-92",
  },
  {
    number: 3,
    fuel: "АИ-98",
  },
  {
    number: 4,
    fuel: "ДТ",
  },
  {
    number: 5,
    fuel: "Газ",
  },
  {
    number: 6,
    fuel: "Газ",
  },
  {
    number: 7,
    fuel: "Газ",
  },
  {
    number: 8,
    fuel: "Газ",
  },
  {
    number: 9,
  },
  {
    number: 10,
    fuel: "Газ",
  },
];
const Lots = () => {
  return (
    <Table
      className={styles.lots}
      columns={columns}
      dataSource={data}
      pagination={{
        pageSize: 10,
      }}
    />
  );
};

export { Lots };
