import { useDispatch, useSelector } from "react-redux";
import ChatBox from "../components/ChatBox"
import Navbar from "../components/Navbar"
import type { RootState } from "../store/store";
import DisplaySteps from "../components/DisplaySteps";
import { useEffect, useState } from "react";
import type { FileItems, Step } from "../types";
import { setSteps } from "../store/slices/steps";

const Builder = () => {

    const steps=useSelector((state:RootState)=>state.steps)
    const [files,setFiles]= useState<FileItems[]>([])
    const dispatch=useDispatch()

    useEffect(()=>{

      let originalFiles=[...files]
      let updateHappened=false;

      steps.filter(({status})=> status=="pending").map((step:Step)=>{
        updateHappened=true;
        if (step?.type == "CreateFile") {
          let parsedPath = step.path?.split("/") ?? []; // it helps  us get the folders[src, compoonent,pages etc ]
          let currentFileStructure = [...originalFiles];
          const finalAnswerRef = currentFileStructure;

          let currentFolder = "";

          while (parsedPath.length) {
            currentFolder = `${currentFolder}/${parsedPath[0]}`;
            const currentFolderName = parsedPath[0];
            parsedPath = parsedPath.slice(1);

            if (!parsedPath.length) {
              const file = currentFileStructure.find(
                (x) => x.path == currentFolder
              );
              if (!file) {
                currentFileStructure.push({
                  name: currentFolderName,
                  type: "file",
                  path: currentFolder,
                  content: step.code,
                });
              } else {
                file.content = step.code;
              }
            } else {
              const folder = currentFileStructure.find(
                (x) => x.path == currentFolder
              );
              if (!folder) {
                currentFileStructure.push({
                  name: currentFolderName,
                  type: "folder",
                  path: currentFolder,
                  children: [],
                });
              }

              currentFileStructure = currentFileStructure.find(
                (x) => x.path === currentFolder
              )!.children!;
            }
          }
          originalFiles = finalAnswerRef;
        }
      })

      if (updateHappened) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFiles(originalFiles);
        dispatch(setSteps((steps:Step[]) =>
          steps.map((s: Step) => {
            return {
              ...s,
              status: "completed",
            };
          })
        ));
      }
      console.log(files);

    },[steps,files,dispatch])
    
  return (
    <div className="bg-linear-to-b to-[#5A9CB5] h-fit ">
      <Navbar />
      <div className=" min-h-[90svh] gap-1 w-11/12 mx-auto flex  my-1">
        <div className="p-2 bg-linear-to-b from-black/20 flex flex-col gap-2  min-w-75 to-slate-800 ">
          <div className="flex-1 overflow-scroll">

            <DisplaySteps steps={steps}></DisplaySteps>

          </div>
          <div className="pb-6">
            <ChatBox size="small" />
          </div>
        </div>
        <div className=" bg-linear-to-b from-black/20 to-slate-800 flex-1 ">
          Coment box
        </div>
      </div>
    </div>
  );
}

export default Builder