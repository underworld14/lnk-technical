import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { loginSchema } from "@/schemas/auth.schema";
import { useLogin } from "@/queries/auth.query";
import { useAuthData } from "@/context/auth.context";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuthData();

  const form = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useLogin({
    onSuccess: (response) => {
      setUser(response.data.data.user);

      navigate("/");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    mutate({
      email: data.email,
      password: data.password,
    });
  });

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Form {...form}>
        <form className="w-full" onSubmit={onSubmit}>
          <Card className="mx-auto max-w-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>Enter your email below to login to your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter your email" {...field} />
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
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter your password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button loading={isPending} type="submit" className="w-full">
                  Login
                </Button>
              </div>

              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/auth/register" className="underline">
                  Register
                </Link>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
