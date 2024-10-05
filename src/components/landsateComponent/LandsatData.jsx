
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Row from "@/components/ui/Row";
import { useLandsatContext } from "../../services/landSateContext";

const formSchema = z.object({
  longitude: z.string().nonempty({ message: "Longitude is required." }),
  latitude: z.string().nonempty({ message: "Latitude is required." }),
  wrsPath: z.string().nonempty({ message: "WRS Path is required." }),
  wrsRow: z.string().nonempty({ message: "WRS Row is required." }),
  publishDate: z.string().nonempty({ message: "Publish date is required." }),
  dayOrNight: z.enum(["Day", "Night"]),
  imageQuality: z.number().min(1).max(100),
  satellite: z.enum(["LANDSAT 8", "LANDSAT 9"]),
});

export default function LandsatForm() {
  const { userData, setUserData, apiData, isLoading, error } = useLandsatContext();
  const form = useForm({ resolver: zodResolver(formSchema) });

  const onSubmit = (values) => {
    setUserData(values);
    form.reset();
  };

  return (
    <div className="w-full p-4 md:p-20">
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full p-10 bg-[#E6E6E6] rounded-3xl">
        <h1 className="text-3xl font-bold">Landsat Data Form</h1>
        <Row type="horizontal">
          <div>
            <label>Longitude:</label>
            <Input name="longitude" {...form.register("longitude")} />
          </div>
          <div>
            <label>Latitude:</label>
            <Input name="latitude" {...form.register("latitude")} />
          </div>
        </Row>
        <Button type="submit">Submit</Button>
      </form>

      {/* Handle Loading and Error States */}
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}

      {/* Display API Data */}
      {apiData && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
          <h2>Fetched Landsat Data:</h2>
          <pre>{JSON.stringify(apiData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
