import { Circle, CircleCheck, LoaderCircle } from 'lucide-react';
import type { Step } from '../types'

const DisplaySteps = ({steps}:{steps:Step[]}) => {
  return (
    <div className=' flex flex-col gap-2'>
        {
            steps.map((x:Step)=>{
                return (
                  <div
                    className="bg-[#9CAB84]/80 p-2 rounded w-11/12 mx-auto  "
                    key={x.id}
                  >
                    <div className='flex gap-2'>
                      <div>
                        {x.status == "pending" && <Circle />}
                        {x.status == "completed" && <CircleCheck />}
                        {x.status == "in progress" && <LoaderCircle className="animate-spin"/>}
                      </div>
                      <div>{x.title}</div>
                    </div>
                  </div>
                );
            })
        }
    </div>
  )
}

export default DisplaySteps