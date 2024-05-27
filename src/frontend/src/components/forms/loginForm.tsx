import {
  useForm,
  SubmitHandler,
  FormProvider,
  Controller,
  useFormState,
} from "react-hook-form";
import {
  TLoginUserSchema,
  ZLoginUserSchemaFormValidation,
} from "../../../../backend/shared/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";

export function LoginForm() {
  const loginForm = useForm<TLoginUserSchema>({
    resolver: zodResolver(ZLoginUserSchemaFormValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<TLoginUserSchema> = (data) => console.log(data);

  return (
    <div className="flex flex-col gap-5 mx-auto">
      <FormProvider {...loginForm}>
        <form
          onSubmit={loginForm.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full"
        >
          <Controller
            name="email"
            control={loginForm.control}
            render={({ field }) => {
              return (
                <label className="form-control">
                  <div className="label">
                    <span className="label-text">Email</span>
                  </div>
                  <input
                    {...field}
                    type="email"
                    placeholder="Enter your email address"
                    className="input input-bordered"
                    required
                  />
                </label>
              );
            }}
          />
          <Controller
            name="password"
            control={loginForm.control}
            render={({ field }) => (
              <label className="form-control">
                <div className="label">
                  <span className="label-text">Password</span>
                </div>
                <input
                  {...field}
                  type="password"
                  placeholder="Enter your password"
                  className="input input-bordered"
                  required
                />
              </label>
            )}
          />
          <button className="btn btn-accent mt-4 w-1/2 self-center">
            Login
          </button>
        </form>
      </FormProvider>
    </div>
  );
}
