const { useState } = require("react");
const { useDispatch, useSelector } = require("react-redux");
const { useNavigate } = require("react-router-dom");
const { API, updateCandidateData } = require("../api");
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

const useNominate = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const candidate = useSelector((store) => store.candidate);
  const isComplete =
    !!candidate.id &&
    !!candidate.video &&
    !!candidate.agenda_text &&
    !!candidate.credentials &&
    !!candidate.proposed_by?.name;

  const updateNomination = async (updatedData, next = null) => {
    if (!candidate) {
      navigate("/", { replace: true });
      return;
    }

    const data = { ...candidate, ...updatedData };
    setLoading(true);
    try {
      API.defaults.headers["Content-Type"] = "multipart/form-data";
      const finalData = {};
      Object.keys(data).forEach((k) => {
        if (k == "nomination_status") {
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
      setError(
        err.response?.data?.detail ||
          "Something went wrong!Please try logging in again."
      );
      setLoading(false);
      return;
    }

    if (next && !error) {
      navigate(next);
    }
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
  };
};

export default useNominate;
