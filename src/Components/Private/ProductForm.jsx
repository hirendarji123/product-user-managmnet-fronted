import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { postData, putData } from "../../utils/api";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ProductForm = () => {
  const [selectedOption, setSelectedOption] = useState([]);
  const history = useNavigate();
  const location = useLocation();
  const product = location.state?.product;
  const handleFormSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      if (product) {
        await putData(`/products/${product._id}`, {
          ...values,
          users: selectedOption.map((opt) => opt.value),
        });
      } else {
        await postData("/products", {
          ...values,
          users: selectedOption.map((opt) => opt.value),
        });
      }
      history("/products");
    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    sku: Yup.string().required("SKU is required"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
    logo: Yup.string().url("Invalid URL").required("Logo URL is required"),
  });

  return (
    <div className="container">
      <h2 style={{ textAlign: "center", marginTop: 20 }}>
        {product ? "Edit Product" : "Create Product"}
      </h2>
      <Formik
        initialValues={{
          name: product?.name || "",
          sku: product?.sku || "",
          description: product?.description || "",
          category: product?.category || "",
          logo: product?.logo || "",
          users: selectedOption.map((opt) => opt.value) || [],
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
              <Form.Label>SKU</Form.Label>
              <Field
                as={Form.Control}
                type="text"
                name="sku"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.sku}
              />
              <ErrorMessage
                name="sku"
                component="div"
                className="text-danger"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Field
                as={Form.Control}
                type="text"
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-danger"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Field
                as={Form.Control}
                type="text"
                name="category"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.category}
              />
              <ErrorMessage
                name="category"
                component="div"
                className="text-danger"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Logo</Form.Label>
              <Field
                as={Form.Control}
                type="url"
                name="logo"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.logo}
              />
              <ErrorMessage
                name="logo"
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
                {product ? "Update" : "Create"}
              </Button>
            </div>
            {errors.submit && (
              <Alert variant="danger" style={{ marginTop: 20 }}>
                {errors.submit}
              </Alert>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProductForm;
