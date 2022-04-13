const { useState, useEffect } = require("react");
const { useDispatch, useSelector } = require("react-redux");
const { useNavigate } = require("react-router-dom");
const { MULTIPARTAPI, updateCandidateData } = require("../api");
const { SET_CANDIDATE_DATA } = require("../constants");

function buildFormData(formData, data, parentKey) {
  if (
    data &&
    typeof data === "object" &&
    !(data instanceof Date) &&
    !(data instanceof File)
  ) {
    Object.keys(data).forEach((key) => {
      buildFormData(
        formData,
        data[key],
        parentKey ? `${parentKey}[${key}]` : key
      );
    });
  } else {
    const value = data == null ? "" : data;

    formData.append(parentKey, value);
  }
}

function jsonToFormData(data) {
  const formData = new FormData();

  buildFormData(formData, data);

  return formData;
}
const deadline = 1649759400000;
// const deadline = 1649549824000;
const checkDeadline = () => {
  return false;
};

const useNominate = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const candidate = useSelector((store) => store.candidate);
  const userData = useSelector((store) => store.auth);

  const [isDeadlineOver, setIsDeadlineOver] = useState(checkDeadline());
  const isNominationComplete = false;
  const isFormClosed = isNominationComplete || isDeadlineOver;
  const checkCreds = () => {
    if (
      candidate &&
      candidate.credentials &&
      candidate.credentials["Grade Card"]
    ) {
      return true;
      // if (userData?.euser?.degree !== "P") {
      //   return true;
      // } else if (
      //   userData?.euser?.degree === "P" &&
      //   candidate.credentials["Thesis incomplete proof"]
      // ) {
      //   return true;
      // } else {
      //   return false;
      // }
    } else {
      return false;
    }
  };

  const isCredsComplete = checkCreds();
  const isAgendaComplete =
    candidate &&
    candidate.agenda_text &&
    Object.keys(candidate.agenda_text).length >= 3;
  const isComplete =
    !!candidate.id &&
    !!candidate.video &&
    isAgendaComplete &&
    isCredsComplete &&
    !!candidate.credentials &&
    !!candidate.proposed_by?.name;

  const updateNomination = async (updatedData, next = null) => {
    if (isNominationComplete || isDeadlineOver) {
      setMessage(
        "Nomination is already submitted or nomination deadline is finished"
      );
      return;
    }
    if (!candidate) {
      navigate("/", { replace: true });
      return;
    }
    if (!updatedData || Object.keys(updatedData).length == 0) {
      setMessage("Everything is up to date");
      return;
    }
    const data = { ...updatedData };
    setLoading(true);
    try {
      const finalData = {};
      Object.keys(data).forEach((k) => {
        if (k === "nomination_status" || k === "agenda_pdf") {
          return;
        }
        if (
          k == "image" ||
          k == "proposed_by_sign" ||
          k == "seconded_by_sign"
        ) {
          const val = data[k];
          if (
            val &&
            (typeof val === "string" || val instanceof String) &&
            val.startsWith("http")
          ) {
            return;
          }
        }
        if (
          k == "agenda_text" ||
          k == "credentials" ||
          k == "proposed_by" ||
          k == "seconded_by"
        ) {
          finalData[k] = JSON.stringify(data[k]);
          return;
        }
        finalData[k] = data[k];
      });
      const formData = await jsonToFormData(finalData);
      const res = await updateCandidateData(candidate.id, formData);
      dispatch({
        type: SET_CANDIDATE_DATA,
        data: res.data,
      });

      setMessage("Nomination data submitted!!");
    } catch (err) {
      console.log(err);
      setError(
        err.response?.data
          ? "Please check your response"
          : "Something went wrong!Please check try refreshing again."
      );
      setLoading(false);
      return;
    }

    // if (next && !error) {
    //   navigate(next);
    // }
    setMessage("Saved");
    setLoading(false);
  };

  return {
    candidate,
    error,
    setError,
    loading,
    setLoading,
    updateNomination,
    isComplete,
    message,
    setMessage,
    isNominationComplete,
    isDeadlineOver,
    isFormClosed,
  };
};

export default useNominate;
