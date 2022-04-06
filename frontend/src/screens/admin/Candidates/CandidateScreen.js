import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCandidateData,
  editCandidateData,
} from "../../../actions/candidates";
import { DateConvert } from "../../../utils";

const CandidatesScreen = () => {
    const candidates = useSelector((state) => state.candidates);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCandidateData());
    }, [dispatch]);
    
  return (
    <>
      <h1 className="text-3xl text-black pb-6">Candidates</h1>
      <div className="w-full mt-6 overflow-auto">
        <div className="bg-white">
          <table className="min-w-full leading-normal">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-5 py-3 border-b-2 text-left text-sm font-semibold uppercase tracking-wider">
                  Name
                </th>
                <th className="px-5 py-3 border-b-2 text-left text-sm font-semibold uppercase tracking-wider">
                  Proposed By
                </th>
                <th className="px-5 py-3 border-b-2 text-left text-sm font-semibold uppercase tracking-wider">
                  Seconded By
                </th>
                <th className="px-5 py-3 border-b-2 text-left text-sm font-semibold uppercase tracking-wider">
                  Nomination Form
                </th>
                <th className="px-5 py-3 border-b-2 text-left text-sm font-semibold uppercase tracking-wider">
                  Verification Status
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {console.log(candidates)}
              {candidates.length !== 0 &&
                candidates.map((data, idx) => {
                  return (
                    <tr key={idx}>
                      <td className="text-left py-3 px-4">{data?.title}</td>
                      <td className="text-left py-3 px-4">
                        <span>{data?.proposed_by.name}</span><br/>
                        <span>{data?.proposed_by.roll_number}</span>
                      </td>
                      <td className="text-left py-3 px-4">
                        <span>{data?.seconded_by.name}</span><br/>
                        <span>{data?.seconded_by.roll_number}</span>
                      </td>
                      <td className="text-left py-3 px-4">
                        <span>{data?.seconded_by.name}</span><br/>
                        <span>{data?.seconded_by.roll_number}</span>
                      </td>
                      <td className="text-left py-3 px-4">
                      <select onChange={(e)=>{
                        console.log(e.target.value);
                        dispatch(
                          editCandidateData(data?.id,{'status' :e.target.value})
                        ).then(() => {
                          // navigate("../debates", { replace: true });
                          console.log("edited");
                        });
                      }}>
                        <option value="pending" selected={data?.nomination_status === "pending" ? true : false}>Pending</option>
                        <option value="approved" selected={data?.nomination_status === "approved" ? true : false}>Approve</option>
                        <option value="rejected" selected={data?.nomination_status === "rejected" ? true : false}>Reject</option>
                      </select>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CandidatesScreen;
