import { Formik } from "formik";
import { React, useState } from "react";
import taskApi from "../../api/taskApi";
import AlertApp from "../../common/Alert/Alert";
import "./Add.css";
export default function Add() {
  const [openAlert, setOpenAlert] = useState(false);

  return (
    <div className="add">
      <h2>Add new Task</h2>
      <hr />
      {openAlert ? (
        <AlertApp type="Success" content="Create Task Success" />
      ) : null}
      <Formik
        initialValues={{ task: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.task) {
            errors.task = "Field Task is required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const data = { tittle: values.task };
          const addTask = async () => {
            await taskApi.add(data);
            resetForm();
          };

          addTask();
          setOpenAlert(true);
          setTimeout(() => {
            setOpenAlert(false);
          }, 3000);
          // alert("Task: " + task + "\nProcess: " + process);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form className="add-form" onSubmit={handleSubmit}>
            <label>Task</label>
            <textarea
              type="text"
              name="task"
              placeholder="Task content..."
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.task}
            />
            <span>{errors.task && touched.task && errors.task}</span>
            <button type="submit">Submit</button>
          </form>
        )}
      </Formik>
    </div>
  );
}
