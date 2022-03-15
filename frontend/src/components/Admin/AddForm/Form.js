import React from "react";

const Form = (props) => {
  return (
    <div className="mt-2">
      <label className="block text-sm text-gray-600" htmlFor={props.name}>
        {props.name}
      </label>
      <input
        className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
        id={props.name}
        name={props.name}
        type={props.type}
        placeholder={props.name}
        required
      />
    </div>
  );
};

export default Form;
