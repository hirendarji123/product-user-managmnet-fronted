import React, { useState, useEffect } from "react";
import { Table, Form, Button } from "react-bootstrap";
import { deleteData, getData } from "../../utils/api";
import { Pencil, Send, Trash3 } from "react-bootstrap-icons";
import ConfirmationModal from "./ConfirmationModal";
import { useNavigate } from "react-router-dom";
import UserSelectModal from "./UserSelectModal";
const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showUserSelectModal, setShowUserSelectModal] = useState(false);
  const [preselectedUsers, setPreselectedUser] = useState([]); // Example preselected user IDs
  const [selectedProduct, setSelectedProduct] = useState({});
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({ category: "", source: "" });
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchProducts();
  }, [search, filter]);

  const fetchProducts = async () => {
    const response = await getData("products", {
      search,
      ...filter,
    });

    if (response?.data?.products) {
      setProducts(response?.data?.products);
    }
    if (response?.data?.allCategories) {
      setCategory(response?.data?.allCategories);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const handleDeleteClick = (product) => {
    setShowModal(true);
    setSelectedProduct(product);
  };

  const handleShareClick = (product) => {
    setShowUserSelectModal(true);
    setPreselectedUser(product.users);
    setSelectedProduct(product);
  };

  const handleConfirmDelete = async () => {
    await deleteData(`products/${selectedProduct?._id}`);
    await fetchProducts();
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleEditClick = (product) => {
    navigate("/edit-product", { state: { product } });
  };

  const handleClose = () => setShowUserSelectModal(false);
  return (
    <div className="container" style={{ marginTop: 10 }}>
      <h2 style={{ textAlign: "center" }}>
        Perform filter and search on product
      </h2>
      <span style={{ float: "right" }}>
        <Button
          onClick={(e) => {
            navigate("/create-product");
          }}
        >
          create Product
        </Button>
      </span>
      <br />
      <Form>
        <Form.Group>
          <Form.Label>Search</Form.Label>
          <Form.Control
            type="text"
            placeholder="Search by name or SKU"
            value={search}
            onChange={handleSearchChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            name="category"
            value={filter.category}
            onChange={handleFilterChange}
          >
            <option value="">All</option>

            {category.map((item) => {
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              );
            })}
            {/* <option value="category2">Category 2</option> */}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Source</Form.Label>
          <Form.Control
            as="select"
            name="source"
            value={filter.source}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </Form.Control>
        </Form.Group>
      </Form>
      <hr />
      <h1 style={{ textAlign: "center" }}>Data</h1>
      <hr />
      {products && products.length > 0 ? (
        <>
          <Table striped bordered hover style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Logo</th>
                <th>Name</th>
                <th>SKU</th>
                <th>Description</th>
                <th>Category</th>
                <th>Source</th>
                {role !== "user" ? <th>Actions</th> : null}
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <img
                      src={product.logo}
                      alt={product.nae}
                      width={30}
                      height={30}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.sku}</td>
                  <td>{product.description}</td>
                  <td>{product.category}</td>
                  <td>{product.source}</td>
                  {role !== "user" ? (
                    <td
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      <span>
                        <Pencil t onClick={() => handleEditClick(product)} />
                        &nbsp; &nbsp;
                        <Trash3
                          onClick={() => {
                            handleDeleteClick(product);
                          }}
                        />
                        &nbsp; &nbsp;
                        <Send onClick={() => handleShareClick(product)} />
                      </span>
                    </td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        <h1 style={{ textAlign: "center", marginTop: 200 }}>No Data Found</h1>
      )}

      <ConfirmationModal
        show={showModal}
        onHide={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
      {role !== "user" ? (
        <UserSelectModal
          show={showUserSelectModal}
          handleClose={handleClose}
          preselectedUsers={preselectedUsers}
          productId={selectedProduct._id}
        />
      ) : null}
    </div>
  );
};

export default ProductGrid;
