import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const VotersScreen = () => {
//   const voters = useSelector((state) => state.voters);
//   const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
//   const candidatesPerPage = 8;

//   useEffect(() => {
//     dispatch(getCandidateData());
//   }, [dispatch]);

//   let candidatesToShow = [];

//   const lastInd = currentPage * candidatesPerPage;
//   const firstInd = lastInd - candidatesPerPage;
//   const paginatedCandidates =
//     candidates && candidates.length !== 0
//       ? candidates.slice(firstInd, lastInd)
//       : [];

//   const searchedCandidates =
//     candidates && candidates.length !== 0
//       ? candidates.filter((c, i) => {
//           return (
//             c?.user?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             c?.user?.roll_number
//               .toLowerCase()
//               .includes(searchQuery.toLowerCase()) ||
//             c?.position?.title.toLowerCase().includes(searchQuery.toLowerCase())
//           );
//         })
//       : [];

//   candidatesToShow =
//     searchQuery === "" ? paginatedCandidates : searchedCandidates;

  return (
    <>
      <h1 className="text-3xl text-black mb-6">Candidates</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-5/12 border-2 border-blue-500 rounded px-3 py-1"
        placeholder="Search voters by name, roll no"
      />
      <div className="w-full mt-6 overflow-x-scroll bg-white">
        <div className="bg-white">
          <table className="min-w-full leading-normal">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-3 border-b-2 text-left text-sm font-semibold uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 border-b-2 text-left text-sm font-semibold uppercase tracking-wider">
                  Hostel
                </th>
                <th className="px-4 py-3 border-b-2 text-left text-sm font-semibold uppercase tracking-wider">
                  Roll No.
                </th>
                <th className="px-4 py-3 border-b-2 text-left text-sm font-semibold uppercase tracking-wider">
                  Programme
                </th>
                <th className="px-4 py-3 border-b-2 text-left text-sm font-semibold uppercase tracking-wider">
                 Voting Status
                </th>
              </tr>
            </thead>
            </table>
            </div>
            </div>
    </>
  );
};

export default VotersScreen;
