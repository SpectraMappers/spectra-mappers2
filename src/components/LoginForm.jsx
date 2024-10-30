import { useAuth } from "../services/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoClose } from "react-icons/io5";
import { z } from "zod";
import { Link } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useModal } from "../services/contextApi";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export default function LoginForm() {
  const { closeLogin, openSignUp } = useModal(); // Using modal context
  const { loginMutation } = useAuth(); // Destructuring the loginMutation from useAuth
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // On form submit
  function onSubmit(values) {
    loginMutation.mutate(values); // Calling the login mutation from useAuth
  }

  return (
    <Form {...form}>
      <div className="w-full p-4 md:p-20">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative flex flex-col gap-4 w-full p-10 font-Kanit bg-[#E6E6E6] rounded-3xl"
        >
          <div>
            <h1 className="text-3xl font-bold">Log In</h1>
          </div>
          <button
            className="absolute right-5 top-5 text-gray-600 hover:text-gray-800"
            onClick={closeLogin} // Closing the modal on button click
            aria-label="Close"
          >
            <IoClose size={24} />
          </button>

          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4 items-center">
            <Button type="submit">Submit</Button>
            <p className="text-xs text-gray-600">
              Don&apos;t have an account?{" "}
              <Link to="/signup">
                <u
                  onClick={() => {
                    closeLogin();
                    openSignUp();
                  }}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Sign up
                </u>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </Form>
  );
}
