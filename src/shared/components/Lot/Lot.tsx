import { HTMLAttributes } from "react";

import styles from "./lot.module.scss";

interface LotCardProps extends HTMLAttributes<HTMLDivElement> {}

const LotCard = ({ children, ...props }: LotCardProps) => {
  return (
    <div {...props} className={styles.lotCard}>
      {children}
    </div>
  );
};

interface LotCardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const LotCardImage = ({ src, ...props }: LotCardImageProps) => {
  return (
    <img alt="Lot" src={src} {...props} className={styles.lotCard__image} />
  );
};

export { LotCard, LotCardImage };
