import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { IoClose } from "react-icons/io5";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Row from "@/components/ui/Row";
import { Link } from "react-router-dom";

// Schema validation
const FormSchema = z.object({
  pin: z
    .string()
    .min(6, { message: "Your one-time password must be 6 characters." })
    .max(6, {
      message: "Your one-time password must be exactly 6 characters.",
    }),
});

export default function InputOTPForm({ closeForgetPass }) {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  // Handle form submission
  function onSubmit(data) {
    // Display the OTP in a SweetAlert modal
    Swal.fire({
      title: "OTP Submitted",
      html: `<pre><code>${JSON.stringify(data, null, 2)}</code></pre>`,
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
      customClass: {
        popup: "text-left", // Ensures proper JSON formatting inside the SweetAlert
      },
    });
  }

  return (
    <Form {...form}>
      <div className="w-full p-8 md:p-12">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative flex flex-col gap-4 w-full p-4 md:p-10 font-Kanit bg-[#E6E6E6] rounded-3xl"
        >
          <div>
            <h1 className="text-3xl font-bold">Enter OTP</h1>
          </div>
          <button
            className="absolute right-5 top-5 text-gray-600 hover:text-gray-800"
            onClick={closeForgetPass}
            aria-label="Close"
          >
            <IoClose size={24} />
          </button>

          {/* OTP Input Fields */}
          <Row type="horizontal">
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>One-Time Password</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot
                          className="border-2 border-gray-300 rounded-lg shadow-md p-2 w-12 h-12 text-center text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 ease-in-out"
                          index={0}
                        />
                        <InputOTPSlot
                          className="border-2 border-gray-300 rounded-lg shadow-md p-2 w-12 h-12 text-center text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 ease-in-out"
                          index={1}
                        />
                        <InputOTPSlot
                          className="border-2 border-gray-300 rounded-lg shadow-md p-2 w-12 h-12 text-center text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 ease-in-out"
                          index={2}
                        />
                        <InputOTPSlot
                          className="border-2 border-gray-300 rounded-lg shadow-md p-2 w-12 h-12 text-center text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 ease-in-out"
                          index={3}
                        />
                        <InputOTPSlot
                          className="border-2 border-gray-300 rounded-lg shadow-md p-2 w-12 h-12 text-center text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 ease-in-out"
                          index={4}
                        />
                        <InputOTPSlot
                          className="border-2 border-gray-300 rounded-lg shadow-md p-2 w-12 h-12 text-center text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 ease-in-out"
                          index={5}
                        />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Row>

          <div className="flex gap-4 items-center">
            <Button type="submit">Submit</Button>
            <p className="text-xs text-gray-600">
              Didn’t receive an OTP?{" "}
              <Link to="/resend-otp">
                <u>Resend OTP</u>
              </Link>{" "}
            </p>
          </div>
        </form>
      </div>
    </Form>
  );
}
