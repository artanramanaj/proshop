import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";

const Search = ({ searchVal, search }) => {
  const [localValue, setLocalValue] = useState(searchVal || "");

  useEffect(() => {
    setLocalValue(searchVal || "");
  }, [searchVal]);

  const handleChange = (e) => {
    const value = e.target.value;
    setLocalValue(value);
    search(value);
  };

  return (
    <Form.Control
      type="text"
      value={localValue}
      onChange={handleChange}
      placeholder="Search products..."
      className="w-25 h-auto "
    />
  );
};

export default Search;
