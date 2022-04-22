import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { checkVoterId } from '../redux/actions/voter';

const EnterVoterIdScreen = () => {
  const [voterId, setVoterId] = useState("");
  const dispatch = useDispatch();

  const submitHandler = (e)=> {
      e.preventDefault();
      dispatch(checkVoterId(voterId)).then((res)=>{
          console.log("IYAAT",res);
      }).catch(e=>{
          console.log("checkVoterId: ",e.response.data);
      })
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form className="w-2/5" onSubmit={(e)=>submitHandler(e)}>
        <h2 className="text-3xl font-atkinson">Enter Voter ID</h2>
        <div className="my-4">
          <input
            type="text"
            required
            style={{ border: "1.4px solid #2B00FF" }}
            className="py-1 px-4 rounded-md w-3/4 focus:outline-none focus:border-8"
            value={voterId}
            onChange={(e)=>setVoterId(e.target.value)}
          />
        </div>
        <button className="rounded-md py-2 px-5 bg-blueBg text-white hover:bg-blue-900">
          Continue
        </button>
      </form>
    </div>
  );
}

export default EnterVoterIdScreen;