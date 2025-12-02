import React from "react";
import { useGetProductsQuery } from "../../slices/productsApiSlice";
import { Button, Row, Col, Table, Badge } from "react-bootstrap";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
const ProductListScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  console.log("products", products);
  const deleteProduct = (id) => {
    console.log("click", id);
  };
  const handleEdit = (id) => {
    console.log(id);
  };

  const handleDelete = (id) => {
    console.log(id);
  };

  if (isLoading) return <Loader />;
  if (error) return <Message variant="danger">{error}</Message>;
  return (
    <>
      <Row className="align-items-center mb-3">
        <Col md={9}>
          <h2>Products</h2>
        </Col>
        <Col md={3} className="d-flex justify-content-end">
          <Button
            variant="dark"
            className="d-flex align-items-center gap-1"
            style={{ backgroundColor: "#1f2833", borderColor: "#27354b" }}
            onClick={() => console.log("Create new product")}
          >
            <FaPlus /> Create Product
          </Button>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <div className="container mt-4">
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Brand</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>

                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-1"
                        onClick={() => handleEdit(product.id)}
                        title="Edit"
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(product.id)}
                        title="Delete"
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ProductListScreen;
