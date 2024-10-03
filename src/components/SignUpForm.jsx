import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { IoClose } from "react-icons/io5";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import Row from "@/components/ui/Row";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const formSchema = z.object({
  Name: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions.",
  }),
  subscribeNewsletter: z.boolean(),
});

export default function SignUPForm({ closeSignUp ,openLogin}) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Name: "",
      email: "",
      phoneNumber: "",
      password: "",
      acceptTerms: false,
      subscribeNewsletter: false,
    },
  });

  function onSubmit(values) {
    console.log(values);
    closeSignUp();
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your Account has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative flex flex-col gap-4 w-3/4 p-10 font-Kanit bg-[#E6E6E6] rounded-3xl"
      >
        <div>
          <h1 className="text-3xl font-bold">Sign Up now</h1>
        </div>
        <button
          className="absolute right-5 top-5 text-gray-600 hover:text-gray-800"
          onClick={closeSignUp}
          aria-label="Close"
        >
          <IoClose size={24} />
        </button>
        <Row type="horizontal">
          <FormField
            control={form.control}
            name="Name"
            render={({ field }) => (
              <FormItem className="w-3/4">
                <FormLabel>You Full Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="w-1/3">
                <FormLabel>Phone Number</FormLabel>
                <FormControl className="w-full">
                  <PhoneInput
                    className="w-full"
                    country={"us"}
                    value={field.value}
                    onChange={field.onChange}
                    inputProps={{
                      name: "phoneNumber",
                      required: true,
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Row>

        {/* Email */}
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

        {/* Password */}
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

        {/* Accept Terms and Conditions Checkbox */}
        <FormField
          control={form.control}
          name="acceptTerms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-1">
              <FormControl>
                <Checkbox
                  id="acceptTerms"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel htmlFor="acceptTerms">
                Accept terms and conditionsBy creating an account, I agree to
                our <u>Terms of use</u> and <u>Privacy Policy </u>
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Subscribe to Newsletter Checkbox */}
        <FormField
          control={form.control}
          name="subscribeNewsletter"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-1">
              <FormControl>
                <Checkbox
                  id="subscribeNewsletter"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel htmlFor="subscribeNewsletter">
                By creating an account, I am also consenting to receive SMS
                messages and emails, including product new feature updates,
                events, and marketing promotions.
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4 items-center">
          <Button type="submit">Submit</Button>
          <p>
            Already have an ccount?{" "}
            <Link to="/login">
              <u onClick={() => { closeSignUp(); openLogin(); }}>Log in</u>
            </Link>{" "}
          </p>
        </div>
      </form>
    </Form>
  );
}