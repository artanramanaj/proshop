import { Title, Meta } from "react-head";

const Seo = ({ title, description }) => {
  return (
    <>
      {title && <Title>{title}</Title>}
      {description && <Meta name="description" content={description} />}
    </>
  );
};

export default Seo;
