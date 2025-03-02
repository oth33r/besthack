import { Table } from "antd";
import styles from "./styles/lots.module.scss";
import { Lot } from "@shared/types/types";

export const fuelTypeMap: Record<number, string> = {
  10: "АИ-92",
  20: "АИ-95",
  30: "АИ-92 Экто",
  40: "АИ-95 Экто",
  50: "ДТ",
};

export const oilBaseMap: Record<number, string> = {
  101: "Нефтебаза_1",
  102: "Нефтебаза_2",
  103: "Нефтебаза_3",
};

const columns = [
  {
    title: "Номер лота",
    dataIndex: "number",
    sorter: (a: any, b: any) => a.number - b.number,
  },
  {
    title: "Вид топлива",
    dataIndex: "fuelType",
    filters: Object.values(fuelTypeMap).map((fuel) => ({
      text: fuel,
      value: fuel,
    })),
    onFilter: (value: any, record: any) => record.fuelType === value,
  },
  {
    title: "Нефтебаза",
    dataIndex: "oilBaseName",
    filters: Object.values(oilBaseMap).map((base) => ({
      text: base,
      value: base,
    })),
    onFilter: (value: any, record: any) => record.oilBaseName === value,
  },
  {
    title: "Дата лота",
    dataIndex: "date",
    render: (date: string) => new Date(date).toLocaleDateString(),
    sorter: (a: any, b: any) =>
      new Date(a.date).getTime() - new Date(b.date).getTime(),
  },
  {
    title: "Доступный остаток",
    dataIndex: "availableBalance",
    sorter: (a: any, b: any) => a.availableBalance - b.availableBalance,
  },
  {
    title: "Цена за 1 тонну",
    dataIndex: "pricePerTon",
    sorter: (a: any, b: any) => a.pricePerTon - b.pricePerTon,
  },
];

interface LotsProps {
  data: Lot[];
}

const Lots = ({ data }: LotsProps) => {
  console.log("Rendering Lots with data:", data);

  const formattedData = data
    .map((lot) => ({
      key: lot._id,
      oilBaseName: oilBaseMap[lot.code_nb] || "Неизвестно",
      fuelType: fuelTypeMap[lot.code_fuel] || "Неизвестно",
      availableBalance: parseFloat(lot.available_balance),
      pricePerTon: parseFloat(lot.price_per_ton),
      ...lot,
      number: lot.number,
      date: lot.date,
    }))
    .filter(
      (lot) =>
        lot.status === "Подтвержден" &&
        lot.oilBaseName !== "Неизвестно" &&
        lot.fuelType !== "Неизвестно"
    );

  return (
    <Table
      className={styles.lots}
      columns={columns}
      dataSource={formattedData}
      scroll={{ x: "max-content" }}
      locale={{
        emptyText: "Нет доступных лотов",
      }}
      pagination={{
        pageSize: 10,
        position: ["bottomCenter"],
      }}
    />
  );
};

export { Lots };
