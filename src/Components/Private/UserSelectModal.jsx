import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import Select from "react-select";
import { getData, putData } from "../../utils/api";

const UserSelectModal = ({
  show,
  handleClose,
  preselectedUsers,
  productId,
}) => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getData("users/getAlluser");
        const users = response.data.map((user) => ({
          value: user._id,
          label: user.name,
        }));
        setOptions(users);

        // Set preselected options
        const preselected = users.filter((option) =>
          preselectedUsers.includes(option.value)
        );
        setSelectedOption(preselected);
      } catch (err) {
        setError("Failed to fetch users", err?.message);
      }
    };

    fetchUsers();
  }, [preselectedUsers]);

  const handleChange = (selectedOptions) => {
    setSelectedOption(selectedOptions || []);
  };

  const handleSubmit = async () => {
    await putData(`/products/${productId}`, {
      users: selectedOption.map((opt) => opt.value),
    });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Select Users</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form>
          <Form.Group>
            <Form.Label>Select Users</Form.Label>
            <Select
              value={selectedOption}
              onChange={handleChange}
              isMulti
              options={options}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserSelectModal;
