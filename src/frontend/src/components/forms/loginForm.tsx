import {
  useForm,
  SubmitHandler,
  FormProvider,
  Controller,
} from "react-hook-form";
import {
  TLoginUserSchema,
  ZLoginUserSchemaFormValidation,
} from "../../../../backend/shared/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApiClient } from "../../lib/hooks/useApiClient";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useRouterState } from "@tanstack/react-router";

export function LoginForm() {
  const apiClient = useApiClient();
  const router = useRouterState();
  const navigate = useNavigate({ from: router.location.pathname });

  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async (loginData: TLoginUserSchema) => {
      const response = await apiClient.auth.login.$post({ json: loginData });
      if (!response.ok) throw Error(await response.text());
    },
    onSuccess: async () => {
      navigate({ to: "/" });
    },
    onError: (error) => {
      loginForm.setError("root.api", {
        message: error.message,
      });
    },
  });

  const loginForm = useForm<TLoginUserSchema>({
    resolver: zodResolver(ZLoginUserSchemaFormValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<TLoginUserSchema> = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex flex-col gap-5 mx-auto">
      <FormProvider {...loginForm}>
        <form
          onSubmit={loginForm.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full"
        >
          {loginForm.formState.errors.root && (
            <div className="label">
              <span className="label-text-alt text-red-600">
                {loginForm.formState.errors.root.api.message}
              </span>
            </div>
          )}
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
