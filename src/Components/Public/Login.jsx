import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import * as Yup from "yup";
import { postData } from "../../utils/api";
import { jwtDecode } from "jwt-decode";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
});

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = React.useState("");

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      const response = await postData("auth", values);
      const decodedToken = jwtDecode(response?.data?.token);
      localStorage.setItem("token", response?.data?.token);
      localStorage.setItem("role", decodedToken.user.role);
      navigate("/products");
    } catch (err) {
      setError("Invalid credentials");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="container"
      style={{
        width: 400,
        backgroundColor: "antiquewhite",
        borderRadius: 10,
      }}
    >
      <h2 style={{ textAlign: "center", marginTop: 50 }}>Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, touched, errors }) => (
          <FormikForm>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Field
                type="email"
                name="email"
                as={Form.Control}
                isInvalid={touched.email && !!errors.email}
              />
              <ErrorMessage
                name="email"
                component={Form.Control.Feedback}
                type="invalid"
              />
              <br />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Field
                type="password"
                name="password"
                as={Form.Control}
                isInvalid={touched.password && !!errors.password}
              />
              <ErrorMessage
                name="password"
                component={Form.Control.Feedback}
                type="invalid"
              />
              <br />
            </Form.Group>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 20,
              }}
            >
              <Button
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 20,
                }}
                type="submit"
                disabled={isSubmitting}
              >
                Login
              </Button>
            </div>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};

export default Login;
