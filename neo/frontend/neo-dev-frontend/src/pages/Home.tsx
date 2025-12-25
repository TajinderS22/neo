import Card from "../components/Card";
import Navbar from "../components/Navbar";
import {SendHorizonal} from "lucide-react"

const Home = () => {
  return (
    <>
      <Navbar />
      <div
        className="  h-full pb-4 bg-linear-to-b to-[#c27c43] 
          mt-12 pt-12 text-white shadow-[#c27c43] rounded-b-2xl shadow-xl  mx-auto  "
      >
        <div className=" h-full ">
          <div className="w-7/12 mx-auto pt-12 bg-linear-to-t from-[#F4A261]/15 to-[#F4A261]/30 backdrop-blur-2xl p-10 rounded-lg ">
            <p className="md:text-7xl  text-[#FA6868] font-bold ">Welcome to</p>
            <p
              className="md:text-6xl my-2 text-[#F4A261] font-bold
              duration-1000 hover:transform-3d animate-pulse"
            >
              Neo.dev
            </p>
          </div>

          <div className="w-6/12 bg-gray-700/30 pr-8  items-center p-4 rounded-xl mx-auto my-36 mt-48">
            <input
              className=" p-4 font-bold w-10/12 h-12 rounded-md bg "
              placeholder="What would you like to build."
              type="text"
            />

            <div className="flex justify-between pr-2">
              <div></div>
              <div className="">
                <button className="flex  gap-2 bg-[#001F3D]/50 rounded-full p-2 px-4  items-center justify-between font-bold ">
                  Build Now
                  <SendHorizonal className="w-8 h-8 " color="#E76F51" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 bg-linear-to-t shadow-[0_-10px_15px_rgba(0,0,0,0.1)] shadow-[#2A9D8F]/70 rounded-t-3xl to-[#2A9D8F]/70">
        <div className="flex gap-2 w-fit mx-auto justify-between p-4 flex-wrap">
          <Card text={"Create React Apps with a simple prompt."} />
          <Card text={"Create Node Apps with a simple prompt."} image="" />
        </div>
      </div>
    </>
  );
};

export default Home;
