import React, { useContext, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function CreateChannel() {
    const { authState } = useContext(AuthContext);

    const navigate = useNavigate();
    const initialValues = {
        channelName: "",
    };

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            navigate("/login");
        }
    }, [navigate]);
    const validationSchema = Yup.object().shape({
        channelName: Yup.string().required("You must input a channel name!"),
    });

    const onSubmit = (data) => {
        axios
            .post("http://localhost:8081/channels", data, {
                headers: { accessToken: localStorage.getItem("accessToken") },
            })
            .then((response) => {
                window.location.reload();
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
                    <h3 style={{ textAlign: "center" }}> Create Channel</h3>
                    <ErrorMessage name="title" component="span" />
                    <Field
                        autoComplete="off"
                        id="inputCreatePost"
                        name="channelName"
                        placeholder="Channel Name"
                    />
                    <button type="submit"> Create Channel</button>
                </Form>
            </Formik>
        </div>
    );
}

export default CreateChannel;