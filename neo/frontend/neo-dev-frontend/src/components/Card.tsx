
const Card = ({text,image}:{text:string,image?:string}) => {
  return (
    <div className="w-80 h-70  rounded-2xl bg-linear-to-t bg-[#d7a27e] p-4">
        <p className="text-xl font-bold">
            {text}
        </p>
        
        <img className="hover:animate-ping" src={image} alt="" />
    </div>
  );
}

export default Card