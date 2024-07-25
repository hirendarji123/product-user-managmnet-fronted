import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { postData } from "../../utils/api";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const UserForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;

  const handleFormSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await postData("/users", values);
      navigate("/users");
    } catch (err) {
      setErrors({ submit: err?.response?.data?.message });
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().min(6).required("Password is required"),
  });

  return (
    <div className="container">
      <h2 style={{ textAlign: "center", marginTop: 20 }}>
        {product ? "Edit Product" : "Create Product"}
      </h2>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          errors,
          isSubmitting,
          setFieldValue,
        }) => (
          <Form onSubmit={handleSubmit}>
            {errors.submit && (
              <Alert variant="danger" style={{ marginTop: 20 }}>
                {errors.submit}
              </Alert>
            )}
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Field
                as={Form.Control}
                type="text"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-danger"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Field
                as={Form.Control}
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-danger"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Field
                as={Form.Control}
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-danger"
              />
            </Form.Group>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 20,
              }}
            >
              <Button type="submit" disabled={isSubmitting}>
                Create
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserForm;
