import * as React from "react";
import { Avatar, Input, Layout } from "antd";
import { Header } from "antd/es/layout/layout";
import { DollarSign, Filter, User } from "lucide-react";

import { FilterWidget } from "@widgets/FilterWidget";
import { Lots, fuelTypeMap, oilBaseMap } from "@widgets/Lots";
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

  const [regionFilter, setRegionFilter] = React.useState("");
  const [fuelFilter, setFuelFilter] = React.useState("");
  const [oilBaseFilter, setOilBaseFilter] = React.useState("");

  const [searchQuery, setSearchQuery] = React.useState("");

  console.log(regionFilter);
  const filteredLots = React.useMemo(() => {
    if (!data?.data) return [];

    return data.data.filter((lot) => {
      if (
        oilBaseFilter &&
        (oilBaseMap[lot.code_nb] || "").toLowerCase() !==
          oilBaseFilter.toLowerCase()
      ) {
        return false;
      }
      if (
        fuelFilter &&
        (fuelTypeMap[lot.code_fuel] || "").toLowerCase() !==
          fuelFilter.toLowerCase()
      ) {
        return false;
      }

      const lowerSearch = searchQuery.toLowerCase();
      if (searchQuery) {
        const fuelStr = (fuelTypeMap[lot.code_fuel] || "").toLowerCase();
        const oilBaseStr = (oilBaseMap[lot.code_nb] || "").toLowerCase();
        if (
          !fuelStr.includes(lowerSearch) &&
          !oilBaseStr.includes(lowerSearch)
        ) {
          return false;
        }
      }

      return true;
    });
  }, [data?.data, fuelFilter, oilBaseFilter, searchQuery]);

  const knownLots = React.useMemo(() => {
    return filteredLots.filter(
      (lot) =>
        lot.status === "Подтвержден" && parseFloat(lot.available_balance) > 0
    );
  }, [filteredLots]);

  const highestPrice = React.useMemo(() => {
    if (!knownLots.length) return 0;
    return Math.max(...knownLots.map((lot) => parseFloat(lot.price_per_ton)));
  }, [knownLots]);

  const lowestPrice = React.useMemo(() => {
    if (!knownLots.length) return 0;
    return Math.min(...knownLots.map((lot) => parseFloat(lot.price_per_ton)));
  }, [knownLots]);

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </Header>

      <main className={styles.marketplace__main}>
        <h1 className={styles.marketplace__title}>Marketplace</h1>

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
            <div className={styles.marketplace__blocks}>
              <Block className={styles.marketplace__block}>
                <BlockHeader icon={<Filter width={16} height={16} />}>
                  Total number of lots
                </BlockHeader>
                <BlockContent>{knownLots.length}</BlockContent>
              </Block>

              <Block className={styles.marketplace__block}>
                <BlockHeader icon={<DollarSign width={16} height={16} />}>
                  Highest price
                </BlockHeader>
                <BlockContent>${highestPrice.toFixed(2)}</BlockContent>
              </Block>

              <Block className={styles.marketplace__block}>
                <BlockHeader icon={<DollarSign width={16} height={16} />}>
                  Lowest price
                </BlockHeader>
                <BlockContent>${lowestPrice.toFixed(2)}</BlockContent>
              </Block>
            </div>

            <Lots data={filteredLots} />
          </>
        )}
      </main>
    </Layout>
  );
};
