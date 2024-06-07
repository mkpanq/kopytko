import {
  useForm,
  SubmitHandler,
  FormProvider,
  Controller,
} from "react-hook-form";
import {
  TSignupUserSchema,
  ZSignupUserSchemaFormValidation,
} from "../../../../backend/shared/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApiClient } from "../../lib/hooks/useApiClient";
import { useCurrentUser } from "../../lib/hooks/useCurrentUser";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { Route } from "../../routes";
import { useMutation } from "@tanstack/react-query";

// TODO: Need full refactor - Prevent from layout shifting when error messages are displayed
export function SignupForm() {
  const router = useRouter();
  const navigate = useNavigate({ from: Route.fullPath });

  const apiClient = useApiClient();
  const { fetchCurrentUser } = useCurrentUser();

  const mutation = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (signupData: TSignupUserSchema) => {
      const response = await apiClient.auth.signup.$post({ json: signupData });
      if (!response.ok) throw Error(await response.text());
    },
    onSuccess: async () => {
      await fetchCurrentUser();
      router.invalidate();
      navigate({ to: "/" });
    },
    onError: (error) => {
      signupForm.setError("root.api", {
        message: error.message,
      });
    },
  });

  const signupForm = useForm<TSignupUserSchema>({
    resolver: zodResolver(ZSignupUserSchemaFormValidation),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit: SubmitHandler<TSignupUserSchema> = async (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex flex-col gap-5 mx-auto">
      <FormProvider {...signupForm}>
        <form
          onSubmit={signupForm.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full"
        >
          {signupForm.formState.errors.root && (
            <div className="label">
              <span className="label-text-alt text-red-600">
                {signupForm.formState.errors.root.api.message}
              </span>
            </div>
          )}
          <Controller
            name="username"
            control={signupForm.control}
            render={({ field }) => {
              return (
                <label className="form-control">
                  <div className="label">
                    <span className="label-text">Username</span>
                  </div>
                  <input
                    {...field}
                    type="text"
                    placeholder="Enter your username"
                    className="input input-bordered"
                    required
                  />
                  {signupForm.formState.errors.username && (
                    <div className="label">
                      <span className="label-text-alt text-red-600">
                        {signupForm.formState.errors.username.message}
                      </span>
                    </div>
                  )}
                </label>
              );
            }}
          />
          <Controller
            name="email"
            control={signupForm.control}
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
                  {signupForm.formState.errors.email && (
                    <div className="label">
                      <span className="label-text-alt text-red-600">
                        {signupForm.formState.errors.email.message}
                      </span>
                    </div>
                  )}
                </label>
              );
            }}
          />
          <Controller
            name="password"
            control={signupForm.control}
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
                {signupForm.formState.errors.password && (
                  <div className="label">
                    <span className="label-text-alt text-red-600">
                      {signupForm.formState.errors.password.message}
                    </span>
                  </div>
                )}
              </label>
            )}
          />
          <Controller
            name="password_confirmation"
            control={signupForm.control}
            render={({ field }) => (
              <label className="form-control">
                <div className="label">
                  <span className="label-text">Password confirmation</span>
                </div>
                <input
                  {...field}
                  type="password"
                  placeholder="Confirm your password"
                  className="input input-bordered"
                  required
                />
                <div className="label">
                  {signupForm.formState.errors.password_confirmation && (
                    <span className="label-text-alt text-red-600">
                      {
                        signupForm.formState.errors.password_confirmation
                          .message
                      }
                    </span>
                  )}
                </div>
              </label>
            )}
          />
          <button className="btn btn-accent mt-4 w-1/2 self-center">
            Signup
          </button>
        </form>
      </FormProvider>
    </div>
  );
}
