import React, { useContext, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function CreatePost() {
  const { authState } = useContext(AuthContext);

  const navigate = useNavigate();
  const initialValues = {
    title: "",
    postText: "",
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, [navigate]);
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a Title!"),
    postText: Yup.string().required(),
  });

  const onSubmit = (data) => {
    axios
      .post("http://localhost:8081/posts", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        navigate("/");
      });
  };

  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Title: </label>
          <ErrorMessage name="title" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="title"
            placeholder="(Ex. Title...)"
          />
          <label>Post: </label>
          <ErrorMessage name="postText" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="postText"
            placeholder="(Ex. Post...)"
          />

          <button type="submit"> Create Post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;
// import React, { useContext, useEffect, useState } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../helpers/AuthContext";

// function CreatePost() {
//   const { authState } = useContext(AuthContext);
//   const [channels, setChannels] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!localStorage.getItem("accessToken")) {
//       navigate("/login");
//     }
//     axios.get("http://localhost:8081/channels").then((response) => {
//       setChannels(response.data);
//     });
//   }, [navigate]);

//   const initialValues = {
//     title: "",
//     postText: "",
//     channelId: "",
//   };

//   const validationSchema = Yup.object().shape({
//     title: Yup.string().required("You must input a Title!"),
//     postText: Yup.string().required(),
//     channelId: Yup.number().required(),
//   });

//   const onSubmit = (data) => {
//     axios
//       .post("http://localhost:8081/posts", data, {
//         headers: { accessToken: localStorage.getItem("accessToken") },
//       })
//       .then((response) => {
//         navigate("/");
//       });
//   };

//   return (
//     <div className="createPostPage">
//       <Formik
//         initialValues={initialValues}
//         onSubmit={onSubmit}
//         validationSchema={validationSchema}
//       >
//         {({ values, handleChange }) => (
//           <Form className="formContainer">
//             <label>Title: </label>
//             <ErrorMessage name="title" component="span" />
//             <Field
//               autoComplete="off"
//               id="inputCreatePost"
//               name="title"
//               placeholder="(Ex. Title...)"
//             />
//             <label>Post: </label>
//             <ErrorMessage name="postText" component="span" />
//             <Field
//               autoComplete="off"
//               id="inputCreatePost"
//               name="postText"
//               placeholder="(Ex. Post...)"
//             />
//             <label>Channel: </label>
//             <ErrorMessage name="channelId" component="span" />
//             <Field as="select" name="channelId" onChange={handleChange}>
//               <option value="">Select a Channel</option>
//               {channels.map((channel) => (
//                 <option key={channel.id} value={channel.id}>
//                   {channel.name}
//                 </option>
//               ))}
//             </Field>
//             <button type="submit" disabled={!values.channelId}>
//               Create Post
//             </button>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// }

// export default CreatePost;
