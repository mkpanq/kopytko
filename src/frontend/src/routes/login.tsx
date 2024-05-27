import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SignupForm } from "../components/forms/signupForm";
import { LoginForm } from "../components/forms/loginForm";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  return (
    <div className="max-w-xl mx-auto">
      <FormSwitch isLogin={isLogin} setIsLogin={setIsLogin} />
      {isLogin ? <LoginForm /> : <SignupForm />}
    </div>
  );
}

function FormSwitch({
  isLogin,
  setIsLogin,
}: {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
}) {
  return (
    <div className="flex justify-between mb-10 align-middle">
      <h3 className="text-5xl">{isLogin ? "Login" : "Signup"}</h3>
      <div className="text-right">
        <p>
          {isLogin ? "Do not have an account ?" : "Already have an account ?"}
        </p>
        <button onClick={() => setIsLogin(!isLogin)} className="font-bold">
          {isLogin ? "Sign up" : "Log in"}
        </button>
      </div>
    </div>
  );
}
