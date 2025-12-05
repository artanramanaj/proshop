import { Modal, Button } from "react-bootstrap";

const DeleteModal = ({ toggleModal, id, updateToggle, remove }) => {
  return (
    <Modal show={toggleModal}>
      <Modal.Header>
        <Modal.Title>Modal Title</Modal.Title>
      </Modal.Header>
      <Modal.Body>This is some text inside the modal.</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => updateToggle(false)}>
          Close
        </Button>
        <Button variant="danger" onClick={() => remove(id)}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
