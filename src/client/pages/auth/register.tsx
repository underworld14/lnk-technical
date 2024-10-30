import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { registerSchema } from "@/schemas/auth.schema";
import { useRegister } from "@/queries/auth.query";
import { toast } from "sonner";

export default function Register() {
  const navigate = useNavigate();

  const form = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const { mutate, isPending } = useRegister({
    onSuccess: () => {
      toast.success("Successfully registered, please login to continue");
      navigate("/auth/login");
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
              <CardTitle className="text-2xl">Register</CardTitle>
              <CardDescription>Create an account by entering your email and password below</CardDescription>
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

                <FormField
                  control={form.control}
                  name="passwordConfirmation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password Confirmation </FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter your confirmation password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button loading={isPending} type="submit" className="w-full">
                  Register
                </Button>
              </div>

              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link to="/auth/login" className="underline">
                  Login
                </Link>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
