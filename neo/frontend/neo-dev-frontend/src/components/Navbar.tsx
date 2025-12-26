import { useEffect, useState } from "react"

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

  useEffect(()=>{
    const handleScroll=()=>{
      setIsScrolled(window.scrollY>0)
    }

    window.addEventListener("scroll",handleScroll);
     
  })

  return (
    <div
      className={`${
        isScrolled ? "w-8/12" : "w-11/12"
      } bg-[#5A9CB5]/30 sticky top-2
      backdrop-blur-md  mx-auto text-white z-10  mb-6 border border-[#5A9CB5]  shadow-lg shadow-[#5A9CB5]/70
      rounded-md  p-2 easy-in-out transform duration-300 `}
    >
      <div className="flex justify-between items-center">
        <h1 className={"text-2xl font-bold "}>Neo.dev</h1>
        <div>
          <ul className="flex text-sm  items-center gap-3">
            <li>Home</li>
            <li>Pricing</li>
            <li>About Us</li>
            <li className="p-1 rounded-md border border-[#e58f79] bg-[#e58f79]/70 text-[#264653] ">
              Get started
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar