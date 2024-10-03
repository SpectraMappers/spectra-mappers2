import { instructionData } from "../../data/instruction.jsx";
import SataliteImage from "../../assets/images/Group 5.svg";

function Instructions() {
  return (
    <section className="relative py-12 flex flex-col justify-center items-center gap-6 bg-[#070823]">
      {/* Background Image */}
      <div className="absolute top-[-30%] left-0 w-full h-full">
        <img
          src={SataliteImage}
          alt="Satellite Background"
          className="object-cover w-1/2 h-full opacity-20" // Adjust opacity and size as needed
        />
      </div>
      
      <div className="flex justify-center items-center flex-col gap-2 font-Kanit z-10">
        <h1 className="text-4xl font-bold mb-8 text-white">Instructions</h1>
        <p className="text-gray-400 text-lg mb-8">
          Step-by-step instructions on how to use the key features of the website.
        </p>
      </div>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 z-10">
        {instructionData.map((item, index) => {
          return (
            <div
              key={index}
              className="flex flex-col gap-8 shadow-lg p-6 rounded-lg text-left transform transition duration-500 hover:scale-105 bg-[#0E0F2A]"
            >
              <div className="mb-4 w-16 h-16 flex items-center justify-center rounded-md bg-white">
                {item.icon}
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl font-semibold mb-2 text-white">
                  {item.title}
                </h3>
                <p className="text-white">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Instructions;
