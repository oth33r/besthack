import React from "react";
import { useParams } from "react-router-dom";
import { LotForm } from "./LotForm";
import styles from "./styles/lot.module.scss";
import { Loader } from "@shared/components";
import { useGetLotById } from "@shared/services/queries";

const LotComponent: React.FC = () => {
  const { lotId } = useParams<{ lotId: string }>();
  const { data: lot, isLoading, isError } = useGetLotById(Number(lotId));

  if (isLoading) return <Loader />;

  if (isError) {
    return <div className={styles.error}>Something went wrong</div>;
  }

  if (!lot) return null;

  return (
    <div className={styles.lot}>
      <div>
        <h2 className={styles.lot__title}>Информация о лоте</h2>
        <p>Код лота: {lot.data.number}</p>
        <p>Код КССС НБ: {lot.data.code_nb}</p>
        <p>Код КССС Топлива: {lot.data.code_fuel}</p>
        <p>Остаток: {lot.data.available_balance} тонн</p>
        <p>Статус: {lot.status}</p>

        <LotForm
          lotNumber={lot.data.number}
          codeNb={lot.data.code_nb}
          codeFuel={lot.data.code_fuel}
          userId="3fa85f64-5717-4562-b3fc-2c963f66afa6"
        />
      </div>
    </div>
  );
};

export { LotComponent };
