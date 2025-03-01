import * as React from "react";
import { Avatar, Input, Layout } from "antd";
import { Header } from "antd/es/layout/layout";
import { DollarSign, Filter, User } from "lucide-react";

import { FilterWidget } from "@widgets/FilterWidget";
import { Lots } from "@widgets/Lots";
import { useGetLots } from "@shared/services/queries";
import { Loader } from "@shared/components";
import {
  Block,
  BlockContent,
  BlockHeader,
} from "@shared/components/Block/Block";

import styles from "./styles/marketplace.module.scss";

export const MarketplacePage: React.FC = () => {
  const { data, isLoading } = useGetLots();

  // Состояния для фильтрации
  const [regionFilter, setRegionFilter] = React.useState("");
  const [fuelFilter, setFuelFilter] = React.useState("");
  const [oilBaseFilter, setOilBaseFilter] = React.useState("");

  // Состояние для поиска
  const [searchQuery, setSearchQuery] = React.useState("");

  // Фильтруем данные на клиенте
  const filteredLots = React.useMemo(() => {
    if (!data?.data) return [];

    return data.data.filter((lot) => {
      // Фильтр по региону
      if (
        regionFilter &&
        lot.region.toLowerCase() !== regionFilter.toLowerCase()
      ) {
        return false;
      }
      // Фильтр по типу топлива
      if (
        fuelFilter &&
        lot.fuelType.toLowerCase() !== fuelFilter.toLowerCase()
      ) {
        return false;
      }
      // Фильтр по нефтебазе
      if (
        oilBaseFilter &&
        lot.oilBaseName.toLowerCase() !== oilBaseFilter.toLowerCase()
      ) {
        return false;
      }

      // Поиск по ключевым словам (проверяем fuelType, oilBaseName, region)
      const lowerSearch = searchQuery.toLowerCase();
      if (
        searchQuery &&
        !lot.fuelType.toLowerCase().includes(lowerSearch) &&
        !lot.oilBaseName.toLowerCase().includes(lowerSearch) &&
        !lot.region.toLowerCase().includes(lowerSearch)
      ) {
        return false;
      }

      return true;
    });
  }, [data?.data, regionFilter, fuelFilter, oilBaseFilter, searchQuery]);

  return (
    <Layout className={styles.marketplace}>
      {/* Шапка */}
      <Header className={styles.marketplace__header}>
        <div className={styles.marketplace__container}>
          <Avatar
            size={40}
            icon={<User />}
            className={styles.marketplace__avatar}
          />
          {/* Поисковая строка */}
          <Input
            placeholder="Search..."
            variant="borderless"
            className={styles.marketplace__search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </Header>

      {/* Основной контент */}
      <main className={styles.marketplace__main}>
        <h1 className={styles.marketplace__title}>Marketplace</h1>

        {/* Виджет фильтров */}
        <FilterWidget
          regions={[
            { label: "ЮГ", key: "ЮГ" },
            { label: "СЕВЕР", key: "СЕВЕР" },
            { label: "ВОСТОК", key: "ВОСТОК" },
            { label: "ЗАПАД", key: "ЗАПАД" },
          ]}
          fuelTypes={[
            { label: "АИ-95", key: "АИ-95" },
            { label: "АИ-92", key: "АИ-92" },
            { label: "ДТ", key: "ДТ" },
          ]}
          oilBases={[
            { label: "Нефтебаза_1", key: "Нефтебаза_1" },
            { label: "Нефтебаза_2", key: "Нефтебаза_2" },
          ]}
          onRegionChange={setRegionFilter}
          onFuelChange={setFuelFilter}
          onOilBaseChange={setOilBaseFilter}
        />

        {isLoading ? (
          <div className={styles.marketplace__loader}>
            <Loader />
          </div>
        ) : (
          <>
            {/* Пример блоков со статистикой */}
            <div className={styles.marketplace__blocks}>
              <Block className={styles.marketplace__block}>
                <BlockHeader icon={<Filter width={16} height={16} />}>
                  Total number of lots
                </BlockHeader>
                <BlockContent>{filteredLots.length}</BlockContent>
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

            {/* Таблица (Lots) с отфильтрованными данными */}
            <Lots data={filteredLots} />
          </>
        )}
      </main>
    </Layout>
  );
};
