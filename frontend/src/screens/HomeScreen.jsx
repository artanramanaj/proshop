import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import { useGetProductsQuery } from "../slices/productsApiSlice.js";
import { useMemo, useState, useEffect } from "react";
import Paggination from "../components/Paggination.jsx";
import debounce from "lodash.debounce";
import Search from "../components/Search.jsx";
import TopProducts from "../components/TopProducts.jsx";
import Seo from "../components/Seo.jsx";
const HomeScreen = () => {
  const [page, setPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");

  const debouncedSetSearch = useMemo(
    () =>
      debounce((value) => {
        setSearchVal(value);
      }, 1000),
    []
  );

  useEffect(() => {
    return () => {
      debouncedSetSearch.cancel();
    };
  }, [debouncedSetSearch]);
  const { data, isLoading, error } = useGetProductsQuery({
    search: searchVal || "",
    page: page || 1,
    limit: 8,
  });

  const products = data?.products || [];
  const currentPage = data?.currentPage || 1;
  const totalPages = data?.totalPages || 1;

  const changeCurrentPage = (page) => {
    setPage(page);
  };

  return (
    <>
      {isLoading ? (
        <div>
          <h2>
            <Loader />
          </h2>
        </div>
      ) : error ? (
        <Message variant="danger">{error?.data?.message}</Message>
      ) : !products || products.length === 0 ? (
        <Message>There is no product</Message>
      ) : (
        <>
          <Row>
            <TopProducts />
          </Row>
          <div className="d-flex justify-content-between mt-4">
            <h1>Latest products</h1>
            <Search searchVal={searchVal} search={debouncedSetSearch} />
          </div>
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
          <Seo
            title="Homepage | My Shop"
            description="Find the best products on our homepage."
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
