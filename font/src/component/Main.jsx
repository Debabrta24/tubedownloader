import { useState } from "react";
const Main = () => {
  const [initialValue, setValue] = useState("")
  console.log(initialValue)
  const handlefunctioncall = () => {
  // const data =  getInfo(initialValue);
    // console.log(data)
  };

  return (
    <>
      <div className="">
        <input type="text" placeholder="enter any url"  value={initialValue}  onChange={(e)=>{setValue(e.target.value)}} />
        <button onClick={handlefunctioncall}>Click here</button>
      </div>
    </>
  );
};

export default Main;
