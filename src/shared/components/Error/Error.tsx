import { FieldError } from "react-hook-form";

import styles from "./error.module.scss";
import { useMemo } from "react";
import cn from "classnames";

interface ErrorProps {
  error?: FieldError | string;
  className?: string;
}

const Error = ({ error, className }: ErrorProps) => {
  const message = useMemo(() => {
    if (typeof error === "string") {
      return error;
    }

    if (error?.message) {
      return error.message;
    }
  }, [error]);

  if (!message) {
    return;
  }

  return <span className={cn(styles.error, className)}>{message}</span>;
};

export { Error };
