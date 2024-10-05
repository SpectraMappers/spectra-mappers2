import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "../../components/ui/button"; // Adjust the path to match your folder structure
import Input from "../../components/ui/input"; // Adjust the path to match your folder structure

// Define the schema for the form
const popupSchema = z.object({
  startDate: z.string().nonempty({ message: "Start date is required." }),
  endDate: z.string().nonempty({ message: "End date is required." }),
  cloudCoverage: z.number().min(0).max(100).nonnegative(),
});

const CoordinatesForm = ({ onSubmit, latitude, longitude }) => {
  const form = useForm({ resolver: zodResolver(popupSchema) });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Enter Satellite Data</h2>

      {/* Coordinates */}
      <div className="mb-4">
        <label className="block mb-2">Latitude</label>
        <Input value={latitude} disabled />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Longitude</label>
        <Input value={longitude} disabled />
      </div>

      {/* Start Date */}
      <div className="mb-4">
        <label className="block mb-2">Start Date</label>
        <Input {...form.register("startDate")} type="date" />
      </div>

      {/* End Date */}
      <div className="mb-4">
        <label className="block mb-2">End Date</label>
        <Input {...form.register("endDate")} type="date" />
      </div>

      {/* Cloud Coverage */}
      <div className="mb-4">
        <label className="block mb-2">Cloud Coverage (%)</label>
        <Input {...form.register("cloudCoverage")} type="number" min={0} max={100} />
      </div>

      {/* Submit Button */}
      <div className="flex gap-4 items-center">
        <Button type="submit">Get Data</Button>
      </div>
    </form>
  );
};

export default CoordinatesForm;
