import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoClose } from "react-icons/io5";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

// Schema for form validation
const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export default function LoginForm({ closeLogin, openSignUp }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values) {
    console.log(values); // Handle login logic (e.g., API call)
    closeLogin();
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Logged in successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative flex flex-col gap-4 w-full p-10 font-Kanit bg-[#E6E6E6] rounded-3xl"
      >
        <div>
          <h1 className="text-3xl font-bold">Login</h1>
        </div>
        <button
          className="absolute right-5 top-5 text-gray-600 hover:text-gray-800"
          onClick={closeLogin}
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

        {/* Submit Button */}
        <div className="flex gap-4 items-center">
          <Button type="submit">Login</Button>
          <p>
            Don&apos;t have an account?{" "}
            <Link to="/signup">
              <u
                onClick={() => {
                  openSignUp();
                  closeLogin();
                }}
              >
                Sign up
              </u>
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
}
