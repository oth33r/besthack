import React, { useState, useEffect } from 'react';
import { Lot } from '../model/types/types';
import { useParams } from 'react-router-dom';
import { LotForm } from './LotForm';
import styles from './styles/lot.module.scss';

export const fetchLotData = async (lotNumber: number): Promise<Lot | null> => {
  try {
    const response = await fetch(`/api/lot/${lotNumber}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (response.ok) {
      const lotData = await response.json();
      return lotData;
    } else {
      console.log('Ошибка при получении данных о лоте');
      return null;
    }
  } catch (error) {
    console.log('Ошибка при запросе данных');
    return null;
  }
};

const LotComponent: React.FC = () => {
  const { lotId } = useParams<{ lotId: string }>();
  const [lot, setLot] = useState<Lot | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getLotData = async () => {
      if (!lotId) {
        setError('Ошибка: ID лота не найдено');
        return;
      }
      try {
        const data = await fetchLotData(Number(lotId));
        if (data) {
          setLot(data);
        } else {
          setError('Ошибка загрузки данных');
        }
      } catch (err) {
        setError('Ошибка при запросе данных');
      }
    };

    getLotData();
  }, [lotId]);

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.lot}>
      {lot ? (
        <div>
          <h2 className={styles.lot__title}>Информация о лоте</h2>
          <p>Код лота: {lot.number}</p>
          <p>Код КССС НБ: {lot.code_nb}</p>
          <p>Код КССС Топлива: {lot.code_fuel}</p>
          <p>Остаток: {lot.available_balance} тонн</p>
          <p>Статус: {lot.status}</p>

          {/* Вставляем форму для оформления заказа */}
          <LotForm 
            lotNumber={lot.number} 
            codeNb={lot.code_nb} 
            codeFuel={lot.code_fuel} 
            userId="3fa85f64-5717-4562-b3fc-2c963f66afa6"
          />
        </div>
      ) : (
        <p>Загружается...</p>
      )}
    </div>
  );
};

export { LotComponent };
