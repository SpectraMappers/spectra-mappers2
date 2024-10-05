import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoClose } from "react-icons/io5";
import { useModal } from "../../services/contextApi";
import { useLandsatContext } from "../../services/landSateContext"; // Import the context
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import Row from "@/components/ui/Row";

// Form schema using zod
const formSchema = z.object({
  longitude: z.string().nonempty({ message: "Longitude is required." }),
  latitude: z.string().nonempty({ message: "Latitude is required." }),
  wrsPath: z.string().nonempty({ message: "WRS Path is required." }),
  wrsRow: z.string().nonempty({ message: "WRS Row is required." }),
  publishDate: z.string().nonempty({ message: "Publish date is required." }),
  dayOrNight: z.enum(["Day", "Night"], { required_error: "Day or Night is required." }),
  imageQuality: z.number().min(1).max(100),
  satellite: z.enum(["LANDSAT 8", "LANDSAT 9"], { required_error: "Select a satellite." }),
});

export default function DataGround() {
  const { closeSignIn } = useModal(); // Hook to handle modal state
  const { submitDataToServer } = useLandsatContext(); // Use the context function for submission

  // Initialize the form with react-hook-form and zodResolver
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      longitude: "",
      latitude: "",
      wrsPath: "",
      wrsRow: "",
      publishDate: "",
      dayOrNight: "Day",
      imageQuality: 50,
      satellite: "LANDSAT 8",
    },
  });

  // Handle form submission
  async function onSubmit(values) {
    // Submit form data to the context's submit function
    submitDataToServer(values);
    form.reset();
  }

  return (
    <Form {...form}>
      <div className="w-full p-4 md:p-20 ">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative flex flex-col gap-4 w-full p-10 font-Kanit bg-[#E6E6E6] rounded-3xl"
        >
          <h1 className="text-3xl font-bold">Landsat Data Form</h1>
          <button
            className="absolute right-5 top-5 text-gray-600 hover:text-gray-800"
            onClick={closeSignIn}
            aria-label="Close"
          >
            <IoClose size={24} />
          </button>

          {/* Longitude and Latitude */}
          <Row type="horizontal">
            <FormField
              control={form.control}
              name="longitude"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>Longitude</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="latitude"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>Latitude</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Row>

          {/* Additional form fields... */}

          {/* Submit Button */}
          <div className="flex gap-4 items-center">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </Form>
  );
}
