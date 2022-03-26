import React from "react";
import { ImportantDates } from "./constant";
import Form from "./Form";

const AddForm = () => {
  const FormLabels = ImportantDates.labels;
  return (
    <>
      <h1 className="text-3xl text-black pb-6">{ImportantDates.name}</h1>
      <div className="flex flex-wrap justify-center">
        <div className="w-full lg:w-1/2 my-6 pr-0 lg:pr-2">
          <p className="text-xl pb-6 flex items-center">
            <i className="fas fa-list mr-3"></i> {ImportantDates.name}
          </p>
          <div className="leading-loose">
            <form className="p-10 bg-white rounded shadow-xl">
              {FormLabels.map((data) => (
                <>
                  <Form name={data[0]} type={data[1]} />
                </>
              ))}
              <div className="mt-6">
                <button
                  className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddForm;
