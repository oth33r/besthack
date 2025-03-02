import React, { useState } from 'react';
import { Order } from '../model/types/types';
import { placeOrder } from '@shared/services/api';
import styles from './styles/lotForm.module.scss';

interface LotFormProps {
  lotNumber: number;
  codeNb: number;
  codeFuel: number;
  userId: string;
}

const LotForm: React.FC<LotFormProps> = ({ lotNumber, codeNb, codeFuel, userId }) => {
  const [volume, setVolume] = useState<number>(0);
  const [deliveryType, setDeliveryType] = useState<string>('self_delivery');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const order: Order = {
      lot_number: lotNumber,
      code_nb: codeNb,
      code_fuel: codeFuel,
      volume,
      delivery_type: deliveryType,
      user_id: userId,
    };

    try {
      await placeOrder(order);
      alert('Заказ успешно оформлен!');
      window.location.reload();  // Перезагрузка страницы
    } catch (error) {
      setError('Ошибка при оформлении заказа');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3 className={styles.form__title}>Оформление заказа</h3>
      {error && <div className={styles.form__error}>{error}</div>}
      <div className={styles.form__inputGroup}>
        <label htmlFor="volume" className={styles.form__label}>Объем (тонн):</label>
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
        <label htmlFor="deliveryType" className={styles.form__label}>Тип доставки:</label>
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
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Оформление...' : 'Оформить заказ'}
      </button>
    </form>
  );
};

export { LotForm };
