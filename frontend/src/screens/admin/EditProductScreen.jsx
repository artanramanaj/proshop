import { useEffect, useState } from "react";
import FormContainer from "../../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import {
  useGetProductQuery,
  useUpdateProductMutation,
  useUploadImageMutation,
} from "../../slices/productsApiSlice";
import { useNavigate, useParams, Link } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
const EditProductScreen = () => {
  const { id } = useParams();
  const { data: product, isLoading, error } = useGetProductQuery(id);
  const [updateProduct, { isLoading: updateLoading, error: updateError }] =
    useUpdateProductMutation();
  const [uploadImage, { isLoading: uploadLoading }] = useUploadImageMutation();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const editProduct = async (e) => {
    e.preventDefault();
    try {
      const body = {
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      };
      const result = await updateProduct({ id, data: body }).unwrap();
      toast.success(result.message);
      navigate("/admin/productlist");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };
  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const uploadFileHandler = async (e) => {
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);
      const res = await uploadImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };
  if (isLoading || updateLoading || uploadLoading) return <Loader />;
  if (error || updateError)
    return <Message variant="danger">{error || updateError} </Message>;

  return (
    <>
      <FormContainer>
        <h1>Update Product</h1>
        <Link to={"/admin/productlist"}>
          <Button variant="light" className="mt-2">
            Go Back
          </Button>
        </Link>
        <Form onSubmit={editProduct}>
          <Form.Group controlId="name" className="my-3">
            <Form.Label> Name</Form.Label>
            <Form.Control
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Enter your full name"
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="price" className="my-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              type="number"
              placeholder="Enter price"
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="image" className="my-2">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <Form.Control
              type="file"
              label="Choose file"
              onChange={uploadFileHandler}
            />
          </Form.Group>

          <Form.Group controlId="brand" className="my-3">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              onChange={(e) => setBrand(e.target.value)}
              value={brand}
              type="text"
              placeholder="Enter brand"
            />
          </Form.Group>

          <Form.Group controlId="category" className="my-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              type="text"
              placeholder="Enter category"
            />
          </Form.Group>

          <Form.Group controlId="countInStock" className="my-3">
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              onChange={(e) => setCountInStock(e.target.value)}
              value={countInStock}
              type="number"
              placeholder="Enter count in stock"
            />
          </Form.Group>

          <Form.Group controlId="description" className="my-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              placeholder="Enter description"
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="mt-2">
            Update Product
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default EditProductScreen;
