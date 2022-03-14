import React from "react";
import { Link } from "react-router-dom";

const ImportantDatesScreen = () => {
  return (
    <>
      <h1 className="text-3xl text-black pb-6">Important Dates</h1>

      <div className="mt-6">
        <Link
          className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded"
          to={`/admin/importantdates/add`}
        >
          Add Important Dates
        </Link>
      </div>
      <div className="w-full mt-6 overflow-auto">
        <div className="bg-white">
          <table className="min-w-full leading-normal">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-5 py-3 border-b-2 text-left text-sm font-semibold uppercase tracking-wider">
                  Title
                </th>
                <th className="px-5 py-3 border-b-2 text-left text-sm font-semibold uppercase tracking-wider">
                  Date
                </th>
                <th className="px-5 py-3 border-b-2 text-left text-sm font-semibold uppercase tracking-wider">
                  Edit
                </th>
                <th className="px-5 py-3 border-b-2 text-left text-sm font-semibold uppercase tracking-wider">
                  Delete
                </th>
              </tr>
            </thead>

            <tbody className="text-gray-700">
              <tr>
                <td className="text-left py-3 px-4"> Election Date</td>
                <td className="text-left py-3 px-4">24/03/2022</td>
                <td className="text-left py-3 px-4">
                  <Link
                    to={{
                      pathname: `/sac/add`,
                    }}
                  >
                    <button className="hover:text-blue-500">Edit</button>
                  </Link>
                </td>
                <td className="text-left py-3 px-4">
                  <button className="hover:text-red-500">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ImportantDatesScreen;
