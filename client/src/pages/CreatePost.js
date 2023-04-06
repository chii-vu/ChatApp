import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

/**
 * Form to create a new post
 * @param {Object} props
 * @param {string} props.channelId
 * @returns {JSX.Element} CreatePost component
 */
function CreatePost({ channelId }) {
  // posts contain a topic and data
  const initialValues = {
    title: "",
    postText: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    postText: Yup.string().required("Required"),
  });

  // handler for submitting the form
  const onSubmit = (data) => {
    axios
      .post(`http://localhost:8081/posts/${channelId}`, data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ values, handleChange }) => (
          <Form className="formContainer">
            <h3 style={{ textAlign: "center" }}> Create Post</h3>
            <ErrorMessage name="title" component="span" />
            <Field
              autoComplete="off"
              id="inputCreatePost"
              name="title"
              placeholder="Topic"
            />
            <ErrorMessage name="postText" component="span" />
            <Field
              autoComplete="off"
              id="inputCreatePost"
              name="postText"
              placeholder="Data"
            />
            <button type="submit"> Create Post</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreatePost;
