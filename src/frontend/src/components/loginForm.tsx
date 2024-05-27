import {
  useForm,
  SubmitHandler,
  FormProvider,
  Controller,
  ControllerRenderProps,
} from "react-hook-form";
import { cn } from "../lib/utils";

// TODO: Add Zod-validator with drizzle models later !
type TLoginForm = {
  email: string;
  password: string;
};

export function LoginForm() {
  const loginForm = useForm<TLoginForm>({
    // resolver: TODO: Add with ZOD !
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<TLoginForm> = (data) => console.log(data);

  return (
    <div className="flex flex-col gap-5 mx-auto max-w-xl">
      <div className="text-xl">Hello ! Log in !</div>
      <FormProvider {...loginForm}>
        <form onSubmit={loginForm.handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={loginForm.control}
            render={({ field }) => (
              <Input
                label="Email"
                type="email"
                placeholder="Your email address"
                field={field}
              />
            )}
          />
          <Controller
            name="password"
            control={loginForm.control}
            render={({ field }) => (
              <Input
                label="Password"
                type="password"
                placeholder="Your password"
                field={field}
              />
            )}
          />
          <button type="submit">Login</button>
        </form>
      </FormProvider>
    </div>
  );
}

type TInputProps = {
  label: string;
  type: React.HTMLInputTypeAttribute;
  placeholder: string;
  field: ControllerRenderProps<TLoginForm, keyof TLoginForm>;
  classes?: string | undefined;
};

function Input(props: TInputProps) {
  return (
    <label className="form-control">
      <div className="label">
        <span className="label-text">{props.label}</span>
      </div>
      <input
        {...props.field}
        type={props.type}
        placeholder={props.placeholder}
        className={cn("input input-bordered", props.classes)}
      />
    </label>
  );
}
