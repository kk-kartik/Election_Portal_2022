import React,{useEffect} from "react";
const VoterIdInput = ()=> {
    const FocusId = (e)=>{
        console.log(e)
        let id = parseInt(e.target.id)+1;
        document.getElementById(id.toString()).disabled = false;
        document.getElementById(id.toString()).focus();
        // document.getElementById(id).focus();
    }
    const Bkspc = (e)=>{
        console.log(e)
        var keynum;
        if(window.event) { // IE                  
            keynum = e.keyCode;
        } else if(e.which){ // Netscape/Firefox/Opera                 
            keynum = e.which;
        }
            
        //Checking if keynum is 8
        if(keynum == 8 ){
            let id = parseInt(e.target.id);
            if(id===1){
                document.getElementById('1').focus();
            }
            else{
                if(e.target.value){
                    document.getElementById(id.toString()).value = "";
                    document.getElementById(id.toString()).focus();
                }
                else{
                document.getElementById(id.toString()).disabled = true;
                id=id-1;
                document.getElementById(id.toString()).focus();
                }
            }
        }
    }
    return(
        <div>
            <div className="flex flex-col justify-between p-4">
                <div className="text-4xl font-atkinson">
                    <p className="text-gray-600">Enter Voter ID</p>
                </div>
                <form className="flex flex-row bg-gray-100 p-2 rounded-lg mt-5">
                        <input type="text" maxLength="1" id="1" className="w-16 h-10 p-2 border-2 mx-1 border-purple-400 rounded-md text-purple-600 focus:border-purple-400 font-bold text-center text-2xl bg-white" onChange={FocusId}/>

                        <input type="text" maxLength="1" id="2" className="w-16 h-10 p-2 border-2 mx-1 border-purple-400 rounded-md text-purple-600 focus:border-purple-400 font-bold text-center text-2xl bg-white" onKeyDown={Bkspc} onChange={FocusId} disabled/>

                        <input type="text" maxLength="1" id="3" className="w-16 h-10 p-2 border-2 mx-1 border-purple-400 rounded-md text-purple-600 focus:border-purple-400 font-bold text-center text-2xl bg-white" onKeyDown={Bkspc} onChange={FocusId} disabled/>

                        <input type="text" maxLength="1" id="4" className="w-16 h-10 p-2 border-2 mx-1 border-purple-400 rounded-md text-purple-600 focus:border-purple-400 font-bold text-center text-2xl bg-white" onKeyDown={Bkspc} onChange={FocusId} disabled/>

                        <input type="text" maxLength="1" id="5" className="w-16 h-10 p-2 border-2 mx-1 border-purple-400 rounded-md text-purple-600 focus:border-purple-400 font-bold text-center text-2xl bg-white" onKeyDown={Bkspc} onChange={FocusId} disabled/>

                        <input type="text" maxLength="1" id="6" className="w-16 h-10 p-2 border-2 mx-1 border-purple-400 rounded-md text-purple-600 focus:border-purple-400 font-bold text-center text-2xl bg-white " onKeyDown={Bkspc} onChange={FocusId} disabled/>

                        <input type="text" maxLength="1" id="7" className="w-16 h-10 p-2 border-2 mx-1 border-purple-400 rounded-md text-purple-600 focus:border-purple-400 font-bold text-center text-2xl bg-white " onKeyDown={Bkspc} onChange={FocusId} disabled/>

                        <input type="text" maxLength="1" id="7" className="w-16 h-10 p-2 border-2 mx-1 border-purple-400 rounded-md text-purple-600 focus:border-purple-400 font-bold text-center text-2xl bg-white" onKeyDown={Bkspc} onChange={FocusId} disabled/>
                </form>
                <div>
                    <button className="w-28 bg-blueBg mt-5 h-12 text-white rounded-lg font-roboto">Continue</button>
                </div>
            </div>
        </div>
    )
}

export default VoterIdInput;