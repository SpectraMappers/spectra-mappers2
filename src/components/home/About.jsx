import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { aboutData } from "../../data/aboutData";

export default function About() {
  return (
    <section className="py-12 h-screen flex flex-col justify-center items-center gap-6 bg-[#070823] font-Kanit">
      <div className="w-full mb-20 px-5  lg:px-28 text-white flex flex-col items-start gap-4">
        <span className="text-sm font-bold text-blue-500">LANDSAT</span>
        <h1 className="text-4xl font-bold text-white text-left">About</h1>
        <div className="w-1/2 lg:w-1/4">
          <p className="text-gray-400 text-left">
            Informative overview of Landsat purpose and importance.
          </p>
        </div>
      </div>
      <Carousel className="w-full  lg:px-20 h-[90%] relative">
        <CarouselContent className="flex gap-4 h-full">
          {aboutData
            .reduce((acc, item, index) => {
              // Create a new group of 3 items
              if (index % 3 === 0) acc.push([]);
              acc[acc.length - 1].push(item);
              return acc;
            }, [])
            .map((group, groupIndex) => (
              <CarouselItem key={groupIndex} className="flex w-full">
                {group.map((item) => (
                  <div key={item.id} className="p-2 sm:p-4 w-full md:w-1/3">
                    {" "}
                    {/* Responsive width adjustments */}
                    <Card
                      className="relative h-full p-4 sm:p-6 bg-cover bg-center rounded-lg shadow-lg transform transition-transform hover:scale-105"
                      style={{
                        backgroundImage: `url(${item.image})`,
                        backgroundSize: "cover",
                      }}
                    >
                      <div className="absolute top-8 left-8 bg-[#ffffff] bg-opacity-[20%] text-white py-2 px-4 rounded-3xl">
                        {item.headline}
                      </div>
                      <CardContent className="flex flex-col justify-end text-white h-full p-4 rounded-lg">
                        <CardTitle className="text-lg sm:text-2xl font-semibold">
                          {item.title}
                        </CardTitle>
                        <CardDescription className="text-sm sm:text-white">
                          {item.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious className="text-white" />
        <CarouselNext className="text-white" />
      </Carousel>
    </section>
  );
}
