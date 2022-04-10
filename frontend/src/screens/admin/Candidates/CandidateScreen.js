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
      <div className="w-full mt-6 overflow-x-scroll bg-white">
        <div className="bg-white">
          <table className="min-w-full leading-normal">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-3 border-b-2 text-left text-sm font-semibold uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 border-b-2 text-left text-sm font-semibold uppercase tracking-wider">
                  Position
                </th>
                <th className="px-4 py-3 border-b-2 text-left text-sm font-semibold uppercase tracking-wider">
                  Video
                </th>
                <th className="px-4 py-3 border-b-2 text-left text-sm font-semibold uppercase tracking-wider">
                  Nomination Form
                </th>
                <th className="px-4 py-3 border-b-2 text-left text-sm font-semibold uppercase tracking-wider">
                  Credentials
                </th>
                <th className="px-4 py-3 border-b-2 text-left text-sm font-semibold uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {console.log(candidates)}
              {candidates &&
                candidates.length !== 0 &&
                candidates.map((data, idx) => {
                  if (data?.nomination_complete) {
                    return (
                      <tr key={idx}>
                        <td className="text-left py-3 px-4">
                          <Link
                            to={`/admin/candidates/${data?.id}`}
                            state={data}
                          >
                            <div className="hover:text-blue-500">
                              <p>{data?.user.name}</p>
                              <p className="text-sm">
                                {data?.user.roll_number}
                              </p>
                            </div>
                          </Link>
                        </td>
                        <td className="text-left py-3 px-4">
                          {data?.position?.title}
                        </td>
                        <td className="text-left py-3 px-4">
                          <a
                            href={data?.video}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-500 underline"
                          >
                            View
                          </a>
                        </td>
                        <td className="text-left py-3 px-4">
                          <a
                            className="bg-violet-500 text-white p-2 py-1"
                            href={`https://swc.iitg.ac.in/elections_api/sgc/candidate_pdf/${data?.id}/`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            View Form
                          </a>
                        </td>
                        <td className="text-left py-3 px-4">
                          <Link
                            to={`/admin/candidates/${data?.id}`}
                            state={data}
                            className="bg-violet-500 text-white p-2 py-1"
                          >
                            View Credentials
                          </Link>
                        </td>
                        <td className="text-left py-3 px-4">
                          <select
                            onChange={(e) => {
                              console.log(e.target.value);
                              dispatch(
                                editCandidateData(data?.id, {
                                  nomination_status: e.target.value,
                                })
                              ).then(() => {
                                // navigate("../debates", { replace: true });
                                console.log("edited");
                              });
                            }}
                            className="px-2 py-1 bg-gray-300"
                          >
                            <option
                              value="pending"
                              selected={
                                data?.nomination_status === "pending"
                                  ? true
                                  : false
                              }
                            >
                              Pending
                            </option>
                            <option
                              value="approved"
                              selected={
                                data?.nomination_status === "approved"
                                  ? true
                                  : false
                              }
                            >
                              Approve
                            </option>
                            <option
                              value="rejected"
                              selected={
                                data?.nomination_status === "rejected"
                                  ? true
                                  : false
                              }
                            >
                              Reject
                            </option>
                          </select>
                        </td>
                      </tr>
                    );
                  } else {
                    return null;
                  }
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CandidatesScreen;
