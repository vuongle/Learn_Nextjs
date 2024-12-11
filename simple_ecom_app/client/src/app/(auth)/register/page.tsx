import RegisterForm from "@/app/(auth)/register/components/register-form";

export default function RegisterPage() {
  return (
    <>
      <h1 className="text-xl text-center font-semibold">Đăng Ký</h1>
      <div className="flex justify-center">
        <RegisterForm />
      </div>
    </>
  );
}
