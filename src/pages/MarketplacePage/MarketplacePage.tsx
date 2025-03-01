import * as React from "react";
import { Avatar, Input, Layout } from "antd";
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
import { useGetLots } from "@shared/services/queries";
import { Loader } from "@shared/components";

export const MarketplacePage: React.FC = () => {
  const { data, isLoading } = useGetLots();

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

        <FilterWidget
          regions={[
            { label: "ЮГ", key: "south" },
            { label: "СЕВЕР", key: "north" },
            { label: "ВОСТОК", key: "east" },
            { label: "ЗАПАД", key: "west" },
          ]}
          fuelTypes={[{ label: "АИ-95", key: "fuelType" }]}
          oilBases={[
            { label: "ЮГ", key: "oilBase" },
            { label: "СЕВЕР", key: "oilBase" },
          ]}
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
                <BlockContent>{data?.data.length}</BlockContent>
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

            <Lots data={data?.data ?? []} />
          </>
        )}
      </main>
    </Layout>
  );
};
