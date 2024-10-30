import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { IoClose } from "react-icons/io5";
import { useModal } from "../services/contextApi"; // Import the modal context
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

// Form schema using zod for validation
const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
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

export default function SignUpForm() {
  const { openLogin, closeSignUp, submitSignUp } = useModal(); // Use the modal context

  // Initialize the form using react-hook-form and zodResolver
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      acceptTerms: false,
      subscribeNewsletter: false,
    },
  });

  // Handle form submission
  const onSubmit = async (values) => {
    // Use the context function to submit the sign-up data
    await submitSignUp(values);
    form.reset(); // Reset the form after submission

    // Close the Sign Up modal and open the Login modal
    closeSignUp();
    openLogin();
  };

  return (
    <Form {...form}>
      <div className="w-full p-4 md:p-20">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative flex flex-col gap-4 w-full p-10 font-Kanit bg-[#E6E6E6] rounded-3xl"
        >
          <div>
            <h1 className="text-3xl font-bold">Sign Up Now</h1>
          </div>
          <button
            className="absolute right-5 top-5 text-gray-600 hover:text-gray-800"
            onClick={closeSignUp}
            aria-label="Close"
          >
            <IoClose size={24} />
          </button>

          {/* First Name and Last Name */}
          <Row type="horizontal">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
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

          {/* Phone Number */}
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Phone Number</FormLabel>
                <FormControl className="w-full">
                  <PhoneInput
                    className="w-full"
                    country={"us"}
                    value={field.value}
                    onChange={(value) => field.onChange(value)} // Update value for react-hook-form
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

          {/* Accept Terms and Conditions */}
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
                <FormLabel htmlFor="acceptTerms" className="text-[10px]">
                  Accept terms and conditions. By creating an account, I agree to
                  our <u>Terms of use</u> and <u>Privacy Policy</u>
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Subscribe to Newsletter */}
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
                <FormLabel htmlFor="subscribeNewsletter" className="text-[10px]">
                  By creating an account, I am also consenting to receive SMS
                  messages and emails, including product updates, events, and marketing promotions.
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <div className="flex gap-4 items-center">
            <Button type="submit">Submit</Button>
            <p className="text-xs text-gray-600">
              Already have an account?{" "}
              <Link to="/login">
                <u
                className="text-blue-600 hover:text-blue-800"
                  onClick={() => {
                    closeSignUp();
                    openLogin();
                  }}
                >
                  Log in
                </u>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </Form>
  );
}
