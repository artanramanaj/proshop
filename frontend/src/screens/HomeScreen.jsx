import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import { useGetProductsQuery } from "../slices/productsApiSlice.js";
import { useState } from "react";
import Paggination from "../components/Paggination.jsx";
const HomeScreen = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useGetProductsQuery({
    perPage: page || 1,
    limit: 8,
  });
  console.log(data);

  const products = data?.products || [];
  const currentPage = data?.currentPage || 1;
  const totalPages = data?.totalPages || 1;

  const changeCurrentPage = (page) => {
    setPage(page);
  };

  return (
    <>
      <h1>latest products</h1>
      {isLoading ? (
        <div>
          <h2>
            <Loader />
          </h2>
        </div>
      ) : error ? (
        <Message variant="danger">{error?.data?.message}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col
                key={product._id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                className="mb-4 d-flex"
              >
                <Product product={product} />
              </Col>
            ))}
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
        </>
      )}
    </>
  );
};

export default HomeScreen;
