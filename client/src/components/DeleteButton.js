import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {
    
    MdDelete,
  } from 'react-icons/md';
  import { getColor } from 'utils/colors';

  import { Link } from 'react-router-dom';

  const ModalExample = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleDelete = () => {
    console.log(props)
      setModal(false);
      props.handleDelete(props.deleteRec);

  }

  return (
    <>
      <Button color="defdault" onClick={toggle} type="link"> <MdDelete size={25} color={getColor('danger')} /> </Button>
     
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Delete ?</ModalHeader>
          <ModalBody>
              Are you sure you want to delete this record?
              <br></br>
          </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleDelete}>Yes</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default ModalExample;