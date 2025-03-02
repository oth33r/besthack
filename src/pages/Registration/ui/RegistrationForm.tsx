import { Button, Input } from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { SignupFormType } from "../model/types/types";
import { signupSchema } from "../model/schemas/signup.schema";
import { useCreateUser, useLogin } from "@shared/services/mutations";
import { Error, Loader } from "@shared/components";

import styles from "./styles/registration.module.scss";

const RegistrationForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormType>({
    resolver: zodResolver(signupSchema),
  });

  const { mutateAsync: createUser, isLoading, isError } = useCreateUser();
  const {
    mutateAsync: login,
    isLoading: isLoginLoading,
    isError: isLoginError,
  } = useLogin();

  const submitHandler: SubmitHandler<SignupFormType> = async (data) => {
    await createUser(data).then(async () => {
      await login({
        email: data.email,
        password: data.password,
      });
    });
  };

  const error = isError || isLoginError;
  const loading = isLoading || isLoginLoading;

  return (
    <>
      <form
        id="authorization-form"
        className={styles.registration__form}
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
              className={styles.registration__input}
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
              placeholder="Password"
              variant="borderless"
              {...field}
              className={styles.registration__input}
            />
          )}
        />
        <Error error={errors.password} />
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <Input
              type="password"
              placeholder="Confirm password"
              variant="borderless"
              {...field}
              className={styles.registration__input}
            />
          )}
        />
        <Error error={errors.confirmPassword} />
      </form>

      <Button
        className={styles.registration__button}
        htmlType="submit"
        form="authorization-form"
        disabled={loading}
      >
        {error ? "Try again" : loading ? <Loader /> : "Create account"}
      </Button>
    </>
  );
};

export { RegistrationForm };
