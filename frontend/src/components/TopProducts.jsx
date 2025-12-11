import Message from "./Message";
import Loader from "./Loader";
import { Carousel, Row, Col } from "react-bootstrap";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";
import { Link } from "react-router-dom";
const TopProducts = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();
  const products = data?.products || [];
  if (isLoading) return <Loader />;
  if (error)
    return (
      <Message variant="danger">
        Error loading product: {error?.data?.message || "something went wrong"}
      </Message>
    );
  return (
    <>
      <h2>Top Products</h2>
      <Row>
        <Carousel className="bg-dark p-3 rounded " indicators={false}>
          {products.map((product) => (
            <Carousel.Item key={product._id} interval={3000}>
              <Link
                to={`/product/${product._id}`}
                style={{
                  textDecoration: "none",
                  outline: "none",
                }}
              >
                <div className="d-flex flex-column align-items-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      maWidth: "100%",
                      maxHeight: "460px",
                      borderRadius: "10px",
                      objectFit: "cover",
                      width: "auto",
                    }}
                  />
                  <div className="text-center mt-3">
                    <h3 className="text-white">{product.name}</h3>
                    <p className="text-white">{product.description}</p>
                  </div>
                </div>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      </Row>
    </>
  );
};

export default TopProducts;
