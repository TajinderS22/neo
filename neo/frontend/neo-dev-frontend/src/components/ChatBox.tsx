import axios from "axios";
import { SendHorizonal } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router";
import { backend_Server } from "../utils/constants";
import { useDispatch } from "react-redux";
import { clearSteps, setSteps } from "../store/slices/steps";
import { parseXml } from "../utils/steps";



const ChatBox = ({size}:{
  size:string
}) => {


  const dispatch = useDispatch()
  const location=useLocation();
  const [prompt,setPrompt]=useState("")

  const HandlePromptSubmit=async()=>{

    dispatch(clearSteps())

    const response= await axios.post(backend_Server+"/api/template",{
      prompt:prompt
    })
    const { prompts, uiPrompts } = response.data;
    console.log(prompts)
    console.log(uiPrompts);

    dispatch(setSteps( parseXml(uiPrompts[0])))

    console.log(parseXml(uiPrompts[0]))

    // const stepResponse = await axios.post(backend_Server+"/chat",{
    //   messages:[...prompts,prompt].map((content)=>({
    //     role: "user",
    //     content
    //   }))
    // })

    // console.log(stepResponse)

  }

  
  if(location.pathname=="/builder"){
    return (
      <div
        className={`${size == "large" && "w-6/12"} ${
          size == "small" && "w-11/12"
        } bg-gray-500 pr-8 flex justify-between  items-center p-4 rounded-xl mx-auto mt-2`}
      >
        <input
          value={prompt}
          onChange={(e)=>{
            setPrompt(e.target.value)
          }}
          className={` p-4 font-bold  h-12 rounded-md bg `}
          placeholder="chat with Neo."
          type="text"
        />
        <div className="flex justify-between mr-2 pr-2">
          <div className="">
            <button onClick={()=>{
              HandlePromptSubmit();
            }}  className="flex  gap-2 bg-[#001F3D]/50 rounded-full p-2 px-4  items-center justify-between font-bold ">
              <SendHorizonal className={`w-4 h-4 `} color="#E76F51" />
            </button>
          </div>
        </div>
      
      </div>
    );
  }

  return (
    <div
      className={`${size == "large" && "w-6/12"} ${
        size == "small" && "w-11/12"
      } bg-gray-700/30 pr-8  items-center p-4 rounded-xl mx-auto my-36 mt-48`}
    >
      <input
        className={` p-4 font-bold w-10/12 h-12 rounded-md bg `}
        placeholder="What would you like to build."
        type="text"
      />
      {  (
        <div className="flex justify-between pr-2">
          <div></div>
          <div className="">
            <button className="flex  gap-2 bg-[#001F3D]/50 rounded-full p-2 px-4  items-center justify-between font-bold ">
              {location.pathname == "/" && "Build Now"}
              <SendHorizonal
                className={`${
                  location.pathname == "/" && "w-8 h-8"
                } w-4 h-4 `}
                color="#E76F51"
              />
            </button>
          </div>
        </div>
      )}

     
    </div>
  );
}

export default ChatBox