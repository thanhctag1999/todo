import { React, useState } from "react";
import taskApi from "../../api/taskApi";

export default function CustomSelect(props) {
  const { id = props.id, value = props.value, color = props.color } = props;
  const [background, setBackground] = useState(color);
  const waiting = "Waiting";
  const inProcess = "In Process";
  const complete = "Complete";
  const inReview = "In Review";
  const approved = "Approved";
  const [selected, setSeleted] = useState(value);
  const handleChangeSelect = (event) => {
    const changeProcess = async () => {
      console.log(event.target.value);
      const data = {
        id: props.id,
        process: event.target.value,
      };
      await taskApi.updateProgress(data);
    };
    changeProcess();

    setSeleted(event.target.value);
    if (event.target.value === waiting) {
      setBackground("#a0a0a0");
    }
    if (event.target.value === inProcess) {
      setBackground("#ffa42e");
    }
    if (event.target.value === complete) {
      setBackground("#06dbad");
    }
    if (event.target.value === inReview) {
      setBackground("#fd2c61");
    }
    if (event.target.value === approved) {
      setBackground("#2c87fd");
    }
  };
  return (
    <select
      id="select"
      style={{ backgroundColor: background }}
      value={selected}
      onChange={(event) => handleChangeSelect(event)}
    >
      <option value={waiting}>{waiting}</option>
      <option value={inProcess}>{inProcess}</option>
      <option value={complete}>{complete}</option>
      <option value={inReview}>{inReview}</option>
      <option value={approved}>{approved}</option>
    </select>
  );
}
