import React, { useState } from "react";
import { Order } from "../model/types/types";
import styles from "./styles/lotForm.module.scss";
import { usePlaceOrder } from "@shared/services/mutations";

interface LotFormProps {
  lotNumber: number;
  codeNb: number;
  codeFuel: number;
  userId: string;
}

const LotForm: React.FC<LotFormProps> = ({
  lotNumber,
  codeNb,
  codeFuel,
  userId,
}) => {
  const [volume, setVolume] = useState<number>(0);
  const [deliveryType, setDeliveryType] = useState<string>("self_delivery");
  const { mutate: placeOrder, isLoading, isError } = usePlaceOrder();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const order: Order = {
      lot_number: lotNumber,
      code_nb: codeNb,
      code_fuel: codeFuel,
      volume,
      delivery_type: deliveryType,
      user_id: userId,
    };

    placeOrder(order);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3 className={styles.form__title}>Оформление заказа</h3>
      {isError && (
        <div className={styles.form__error}>Something went wrong</div>
      )}
      <div className={styles.form__inputGroup}>
        <label htmlFor="volume" className={styles.form__label}>
          Объем (тонн):
        </label>
        <input
          type="number"
          id="volume"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          required
          className={styles.form__input}
        />
      </div>
      <div className={styles.form__inputGroup}>
        <label htmlFor="deliveryType" className={styles.form__label}>
          Тип доставки:
        </label>
        <select
          id="deliveryType"
          value={deliveryType}
          onChange={(e) => setDeliveryType(e.target.value)}
          className={styles.form__select}
        >
          <option value="self_delivery">Самовывоз</option>
          <option value="delivery">Доставка</option>
        </select>
      </div>
      <button
        type="submit"
        className={styles.form__button}
        disabled={isLoading}
      >
        {isLoading ? "Оформление..." : "Оформить заказ"}
      </button>
    </form>
  );
};

export { LotForm };
