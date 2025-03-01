import * as React from "react";
import { Avatar, Input, Layout } from "antd";
import { Lot } from "@entities/lot/types/types";
import { FilterWidget } from "@widgets/FilterWidget";

import styles from "./styles/marketplace.module.scss";
import { Header } from "antd/es/layout/layout";
import { DollarSign, Filter, User } from "lucide-react";
import {
  Block,
  BlockContent,
  BlockHeader,
} from "@shared/components/Block/Block";
import { Lots } from "@widgets/Lots";

// Тестовые данные
const testData: Lot[] = [
  {
    id: 1,
    lotNumber: 101,
    fuelType: "АИ-95",
    oilBaseName: "Нефтебаза_1",
    region: "Центр",
    date: "2025-03-01",
    pricePerTon: 55000,
    availableVolume: 12000,
  },
  {
    id: 2,
    lotNumber: 102,
    fuelType: "ДТ",
    oilBaseName: "Нефтебаза_2",
    region: "Север",
    date: "2025-03-01",
    pricePerTon: 48000,
    availableVolume: 15000,
  },
  {
    id: 3,
    lotNumber: 103,
    fuelType: "АИ-92",
    oilBaseName: "Нефтебаза_3",
    region: "Юг",
    date: "2025-03-01",
    pricePerTon: 50000,
    availableVolume: 9000,
  },
  {
    id: 4,
    lotNumber: 104,
    fuelType: "АИ-95 Экто",
    oilBaseName: "Нефтебаза_1",
    region: "Центр",
    date: "2025-03-01",
    pricePerTon: 57000,
    availableVolume: 11000,
  },
];

export const MarketplacePage: React.FC = () => {
  return (
    <Layout className={styles.marketplace}>
      <Header className={styles.marketplace__header}>
        <div className={styles.marketplace__container}>
          <Avatar
            size={40}
            icon={<User />}
            className={styles.marketplace__avatar}
          />
          <Input
            placeholder="Search..."
            variant="borderless"
            className={styles.marketplace__search}
          />
        </div>
      </Header>

      <main className={styles.marketplace__main}>
        <h1 className={styles.marketplace__title}>Marketplace</h1>

        <FilterWidget />

        <div className={styles.marketplace__blocks}>
          <Block className={styles.marketplace__block}>
            <BlockHeader icon={<Filter width={16} height={16} />}>
              Total number of lots
            </BlockHeader>
            <BlockContent>432</BlockContent>
          </Block>
          <Block className={styles.marketplace__block}>
            <BlockHeader icon={<DollarSign width={16} height={16} />}>
              Highest price
            </BlockHeader>
            <BlockContent>$52.89</BlockContent>
          </Block>
          <Block className={styles.marketplace__block}>
            <BlockHeader icon={<DollarSign width={16} height={16} />}>
              Lowest price
            </BlockHeader>
            <BlockContent>$373.02</BlockContent>
          </Block>
        </div>

        <Lots />
      </main>
    </Layout>
  );
};
