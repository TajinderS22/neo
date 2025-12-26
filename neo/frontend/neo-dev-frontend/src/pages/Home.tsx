import Card from "../components/Card";
import ChatBox from "../components/ChatBox";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <div
        className="  h-full pb-4 bg-linear-to-b to-[#5A9CB5] 
          mt-12 pt-12 text-white shadow-[#5A9CB5] rounded-b-2xl shadow-xl  mx-auto  "
      >
        <div className=" h-full ">
          <div className="w-7/12 mx-auto pt-12 bg-linear-to-t from-[#FA6868]/25 to-[#5A9CB5]/30 backdrop-blur-2xl p-10 rounded-lg ">
            <p className="md:text-7xl  text-[#FA6868] font-bold ">Welcome to</p>
            <p
              className="md:text-6xl my-2 text-[#5A9CB5] font-bold
              duration-1000 hover:transform-3d animate-pulse"
            >
              Neo.dev
            </p>
          </div>

          <ChatBox size="large" />
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
