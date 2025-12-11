import React from "react";
import {
  useGetProductsQuery,
  useAddNewProductMutation,
  useDeleteProductMutation,
} from "../../slices/productsApiSlice";
import { Button, Row, Col, Table } from "react-bootstrap";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../components/DeleteModal";
import { useState } from "react";
import Paggination from "../../components/Paggination";
const ProductListScreen = () => {
  const [page, setPage] = useState();
  const [toggleModal, setToggleModal] = useState(false);
  const [prodId, setProdId] = useState(null);
  const { data, isLoading, error } = useGetProductsQuery({
    search: "",
    page: page || 1,
    limit: 10,
  });

  const products = data?.products || [];
  const currentPage = data?.currentPage || 1;
  const totalPages = data?.totalPages || 1;
  const navigate = useNavigate();
  const [addNewProduct, { isLoading: createLoading }] =
    useAddNewProductMutation();
  const [deleteProduct, { isLoading: deleteProductLoading }] =
    useDeleteProductMutation();

  const createProduct = async () => {
    try {
      await addNewProduct().unwrap();
      toast.success("product created");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };
  const removeProduct = async (id) => {
    try {
      const res = await deleteProduct(id).unwrap();
      toast.success(res.message);
      setToggleModal(false);
    } catch (error) {
      toast.error(error?.data?.message);
      setToggleModal(false);
    }
  };
  const handleEdit = (id) => {
    navigate(`/admin/product/${id}/edit`);
  };

  const toggleDeleteModal = (bool, id) => {
    setToggleModal(bool);
    setProdId(id);
  };
  const changeCurrentPage = (page) => {
    setPage(page);
  };
  if (isLoading || deleteProductLoading || createLoading) return <Loader />;
  if (error)
    return (
      <Message variant="danger">
        {error?.data?.message || "something went wrong"}
      </Message>
    );
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
            onClick={() => createProduct()}
          >
            <FaPlus /> Create Product
          </Button>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <div className="container mt-4">
            {!products || products.length === 0 ? (
              <Message>There are no products</Message>
            ) : (
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
                          onClick={() => handleEdit(product._id)}
                          title="Edit"
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => toggleDeleteModal(true, product._id)}
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
        {products && products.length > 0 && (
          <Col md={12} className="d-flex gap-4 justify-content-center">
            <Paggination
              totalPages={totalPages}
              currentPage={currentPage}
              changeCurrentPage={changeCurrentPage}
            />
          </Col>
        )}
      </Row>
      <DeleteModal
        updateToggle={toggleDeleteModal}
        remove={removeProduct}
        toggleModal={toggleModal}
        id={prodId}
      />
    </>
  );
};

export default ProductListScreen;
