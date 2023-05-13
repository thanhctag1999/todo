import { FormControl } from "@mui/material";
import { Formik } from "formik";
import { React, useState } from "react";
import meetingApi from "../../api/meetingApi";
import AlertApp from "../../common/Alert/Alert";
import "./AddMeeting.css";
import { useStore, actions } from "../../app/index";

export default function AddMeeting() {
  const [openAlert, setOpenAlert] = useState(false);
  const [dispatch] = useStore();
  return (
    <div className="add">
      <h2>Add Meeting</h2>
      <hr />
      {openAlert ? (
        <AlertApp type="Success" content="Create Task Success" />
      ) : null}

      <Formik
        initialValues={{ name: "", link: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = "Field Name is required";
          }
          if (!values.link) {
            errors.link = "Field Link is required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          var name = values.name;
          var link = values.link;
          const data = { name: name, link: link };
          const addMeeting = async () => {
            await meetingApi.add(data);
            resetForm();
          };

          addMeeting();
          dispatch(actions.setIsAddMeeting(true));
          setOpenAlert(true);
          setTimeout(() => {
            setOpenAlert(false);
          }, 3000);
          //   alert("Name: " + name + "\nLink: " + link);
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
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Task content..."
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            <span>{errors.name && touched.name && errors.name}</span>
            <label>Link</label>
            <FormControl name="link" fullWidth>
              <input
                className="add-link"
                type="text"
                name="link"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.link}
              />
              <span>{errors.link && touched.link && errors.link}</span>
            </FormControl>
            <button type="submit">Submit</button>
          </form>
        )}
      </Formik>
    </div>
  );
}
