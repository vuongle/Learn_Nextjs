"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginBody, LoginBodyType } from "@/lib/schemaValidations/auth.schema";
import authApi from "@/api-requests/auth-api-request";
import { useRouter } from "next/navigation";
import { handleApiError } from "@/lib/utils";
import { useState } from "react";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Define login form with default values
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginBodyType) => {
    if (loading) return;

    setLoading(true);

    try {
      // 1. send a POST request to external backend API(running on port 4000) for login
      const res = await authApi.login(values);

      // 2. send a POST request to nextjs server's API (running on port 3000) to set the cookie
      await authApi.setToken({
        sessionToken: res.payload.data.token,
      });

      // 3. redirect to profile page
      router.push("/me");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      handleApiError({ error, setError: form.setError });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 max-w-[600px] flex-shrink-0 w-full"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Nhập Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật Khẩu</FormLabel>
              <FormControl>
                <Input placeholder="Nhập Mật Khẩu" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="!mt-8 w-full" type="submit">
          Đăng Nhập
        </Button>
      </form>
    </Form>
  );
}
