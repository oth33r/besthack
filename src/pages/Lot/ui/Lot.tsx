import React from "react";
import { useParams } from "react-router-dom";
import { LotForm } from "./LotForm";
import styles from "./styles/lot.module.scss";
import { Loader } from "@shared/components";
import { useGetLotById } from "@shared/services/queries";
import Banner from "@shared/assets/banner.jpg"; // Укажите путь к вашему изображению

const LotComponent: React.FC = () => {
  const { lotId } = useParams<{ lotId: string }>();
  const { data: lot, isLoading, isError } = useGetLotById(Number(lotId));

  if (isLoading) return <Loader />;

  if (isError) {
    return <div className={styles.error}>Неизвестная ошибка</div>;
  }

  if (!lot) return null;

  return (
    <div className={styles.lot}>
      <div className={styles.lot__details}>
        {/* Добавляем левую секцию с картинкой */}
        <div className={styles.lot__leftSection}>
          <img
            className={styles.lot__banner}
            src={Banner} // Путь к изображению
            alt="Lot Banner"
          />
        </div>

        <div className={styles.lot__rightSection}>
          <h2 className={styles.lot__title}>Информация о лоте</h2>
          <div className={styles.lotInfo}>
            <div className={styles.form__inputGroup}>
              <label htmlFor="lotCode" className={styles.form__label}>
                Код лота:
              </label>
              <input
                type="text"
                id="lotCode"
                value="1"
                readOnly
                className={styles.form__input}
              />
            </div>

            <div className={styles.form__inputGroup}>
              <label htmlFor="nbCode" className={styles.form__label}>
                Код КССС НБ:
              </label>
              <input
                type="text"
                id="nbCode"
                value="101"
                readOnly
                className={styles.form__input}
              />
            </div>

            <div className={styles.form__inputGroup}>
              <label htmlFor="fuelCode" className={styles.form__label}>
                Код КССС Топлива:
              </label>
              <input
                type="text"
                id="fuelCode"
                value="10"
                readOnly
                className={styles.form__input}
              />
            </div>

            <div className={styles.form__inputGroup}>
              <label htmlFor="stock" className={styles.form__label}>
                Остаток:
              </label>
              <input
                type="text"
                id="stock"
                value="849.5 тонн"
                readOnly
                className={styles.form__input}
              />
            </div>

            <div className={styles.form__inputGroup}>
              <label htmlFor="status" className={styles.form__label}>
                Статус:
              </label>
              <input
                type="text"
                id="status"
                value="Подтвержден"
                readOnly
                className={styles.form__input}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.lot__form}>
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
