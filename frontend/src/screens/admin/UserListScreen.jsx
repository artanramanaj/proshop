import React from "react";
import { Button, Row, Col, Table, Badge } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  useGetUsersQuery,
  useRemoveUserMutation,
} from "../../slices/usersApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import DeleteModal from "../../components/DeleteModal";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Paggination from "../../components/Paggination";
const UserListScreen = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState();
  const [toggleModal, setToggleModal] = useState(false);
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetUsersQuery({
    perPage: page || 1,
    limit: 10,
  });

  const users = data?.users || [];
  const currentPage = data?.currentPage || 1;
  const totalPages = data?.totalPages || 1;

  console.log("users", data);
  const [removeUser, { isLoading: removeUserLoading, error: removeUserError }] =
    useRemoveUserMutation();

  const handleEdit = (id) => {
    navigate(`/admin/userlist/${id}/edit`);
  };

  const toggleDeleteModal = (bool, id) => {
    setToggleModal(bool);
    setUserId(id);
  };

  const deleteUser = async (id) => {
    try {
      const result = await removeUser(id).unwrap();
      console.log("res", result);
      toast.success(result.message);
      setToggleModal(false);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const changeCurrentPage = (page) => {
    setPage(page);
  };

  if (isLoading || removeUserLoading) return <Loader />;
  if (error || removeUserError)
    return (
      <Message variant="danger">
        {error?.data?.message ||
          removeUserError?.data?.message ||
          "something went wrong"}
      </Message>
    );
  return (
    <>
      <Row>
        <Col md={12}>
          <div className="container mt-4">
            <h2>Users</h2>
            {!users && users.length === 0 ? (
              <Message>There are no Users</Message>
            ) : (
              <Table responsive striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th> Email</th>
                    <th>Admin</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>{user._id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        {user.isAdmin ? (
                          <Badge bg="success">✓</Badge>
                        ) : (
                          <Badge bg="danger">✗</Badge>
                        )}
                      </td>

                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-1"
                          onClick={() => handleEdit(user._id)}
                          title="Edit"
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => toggleDeleteModal(true, user._id)}
                          title="Delete"
                        >
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={12} className="d-flex gap-4 justify-content-center">
          <Paggination
            totalPages={totalPages}
            currentPage={currentPage}
            changeCurrentPage={changeCurrentPage}
          />
        </Col>
      </Row>
      <DeleteModal
        toggleModal={toggleModal}
        updateToggle={toggleDeleteModal}
        id={userId}
        remove={deleteUser}
      />
    </>
  );
};

export default UserListScreen;
