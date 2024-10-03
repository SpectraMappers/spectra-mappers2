const Landing = ({ children }) => {
  return (
    <section className="w-full h-screen bg-[#0E0F2A] flex justify-center items-end">
      <div className="hidden lg:flex absolute inset-0 overflow-hidden ">
        <div>
          <div className="circle circle1">
            <div className="dot"></div>
          </div>
          <div className="circle circle2">
            <div className="dot"></div>
          </div>
          <div className="circle circle3">
            <div className="dot"></div>
          </div>
        </div>
      </div>
      <video
        className="absolute top-0 left-0 w-full h-[112%] object-cover lg:hidden"
        src="http://images-assets.nasa.gov/video/GSFC_20171031_Landsat_m12754_whiskbroom/GSFC_20171031_Landsat_m12754_whiskbroom~orig.mp4"
        type="video/mp4"
        autoPlay
        muted
        loop
      ></video>
      <div className="">{children}</div>
      {/* <div className="absolute inset-0 bg-black bg-opacity- z-5"></div> */}
    </section>
  );
};

export default Landing;