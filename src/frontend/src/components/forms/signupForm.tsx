import {
  useForm,
  SubmitHandler,
  FormProvider,
  Controller,
} from "react-hook-form";

// TODO: Add Zod-validator with drizzle models later !
type TSignupForm = {
  username: string;
  email: string;
  password: string;
};

export function SignupForm() {
  const signupForm = useForm<TSignupForm>({
    // resolver: TODO: Add with ZOD !
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<TSignupForm> = (data) => console.log(data);

  return (
    <div className="flex flex-col gap-5 mx-auto">
      <FormProvider {...signupForm}>
        <form
          onSubmit={signupForm.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full"
        >
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
