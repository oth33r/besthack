import { Button, Input } from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { AuthorizationFormType } from "../model/types/types";
import { authorizationSchema } from "../model/schemas/authorization.schema";
import { useLogin } from "@shared/services/mutations";
import { Error, Loader } from "@shared/components";

import styles from "./styles/authorization.module.scss";

const AuthorizationForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthorizationFormType>({
    resolver: zodResolver(authorizationSchema),
  });
  const { mutate: login, isLoading, isError } = useLogin();

  const submitHandler: SubmitHandler<AuthorizationFormType> = (data) => {
    login(data);
  };

  return (
    <>
      <form
        id="authorization-form"
        className={styles.authorization__form}
        onSubmit={handleSubmit(submitHandler)}
      >
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <Input
              placeholder="Email"
              variant="borderless"
              {...field}
              className={styles.authorization__input}
            />
          )}
        />
        <Error error={errors.email} />
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <Input
              type="password"
              placeholder="Пароль"
              variant="borderless"
              {...field}
              className={styles.authorization__input}
            />
          )}
        />
        <Error error={errors.password} />
      </form>

      <Button
        className={styles.authorization__button}
        htmlType="submit"
        form="authorization-form"
        disabled={isLoading}
      >
        {isLoading ? <Loader /> : isError ? "Попробуйте снова" : "Войти"}
      </Button>
    </>
  );
};

export { AuthorizationForm };
