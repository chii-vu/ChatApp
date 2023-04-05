import React, { useContext, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function SearchBar() {
    const { authState } = useContext(AuthContext);

    const navigate = useNavigate();
    const initialValues = {
        keyword: "",
    };

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            navigate("/login");
        }
    }, [navigate]);
    const validationSchema = Yup.object().shape({
        keyword: Yup.string().required("Input Keyword(s)"),
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
        <div className="searchbar">
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                <Form className="formContainer">
                    <label>Search Posts </label>
                    <ErrorMessage name="title" component="span" />
                    <Field
                        autoComplete="off"
                        id="inputCreatePost"
                        name="keyword"
                    />
                    <button type="submit"> Search</button>
                </Form>
            </Formik>
        </div>
    );
}

export default SearchBar;