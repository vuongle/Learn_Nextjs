import LoginForm from "@/app/(auth)/login/components/login-form";

export default function LoginPage() {
  return (
    <>
      <h1 className="text-xl text-center font-semibold">Đăng Nhập</h1>
      <div className="flex justify-center">
        <LoginForm />
      </div>
    </>
  );
}
