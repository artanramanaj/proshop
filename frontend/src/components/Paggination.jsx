import React from "react";
import { Button } from "react-bootstrap";
const Paggination = ({ totalPages, currentPage, changeCurrentPage }) => {
  return (
    <div className="d-flex gap-2">
      {" "}
      {[...Array(totalPages)].map((_, index) => (
        <Button
          onClick={() => changeCurrentPage(index + 1)}
          key={index}
          className={`rounded-circle p-0`}
          style={{ width: "48px", height: "48px" }}
          variant={currentPage == index + 1 ? "primary" : "secondary"} // secondary = gray
        >
          {index + 1}
        </Button>
      ))}
    </div>
  );
};

export default Paggination;
