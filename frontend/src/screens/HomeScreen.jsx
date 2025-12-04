import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import { useGetProductsQuery } from "../slices/productsApiSlice.js";
const HomeScreen = () => {
  const productss = useGetProductsQuery();
  const { data: products, isLoading, error } = useGetProductsQuery();
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
        </>
      )}
    </>
  );
};

export default HomeScreen;
