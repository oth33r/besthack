import styles from "./block.module.scss";
import cn from "classnames";
interface BlockProps extends React.HTMLAttributes<HTMLDivElement> {}

const Block = ({ className, children, ...props }: BlockProps) => {
  return (
    <div className={cn(styles.block, className)} {...props}>
      {children}
    </div>
  );
};

interface BlockHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
}

const BlockHeader = ({
  className,
  children,
  icon,
  ...props
}: BlockHeaderProps) => {
  return (
    <div className={cn(styles.block__header, className)} {...props}>
      <h3 className={styles.block__title}>{children}</h3>
      {icon && <div className={styles.block__icon}>{icon}</div>}
    </div>
  );
};

interface BlockContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const BlockContent = ({ className, children, ...props }: BlockContentProps) => {
  return (
    <div className={cn(styles.block__content, className)} {...props}>
      {children}
    </div>
  );
};

export { Block, BlockHeader, BlockContent };
