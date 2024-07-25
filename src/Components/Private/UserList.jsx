import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { getData } from "../../utils/api";
import { Pencil, Trash3 } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await getData("users/getAlluser", { allDetails: true });
    if (response?.data) {
      setUsers(response?.data);
    }
  };

  return (
    <div className="container" style={{ marginTop: 30 }}>
      <span style={{ float: "right" }}>
        <Button
          onClick={(e) => {
            navigate("/create-user");
          }}
        >
          create User
        </Button>
      </span>
      <br />
      <h1 style={{ textAlign: "center" }}>User List</h1>
      <hr />
      {users && users.length > 0 ? (
        <>
          <Table striped bordered hover style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                {role !== "user" ? <th>Actions</th> : null}
              </tr>
            </thead>
            <tbody>
              {users.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  {role !== "user" ? (
                    <td
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      <span>
                        <Pencil />
                        &nbsp; &nbsp;
                        <Trash3 />
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
    </div>
  );
};

export default UserList;
