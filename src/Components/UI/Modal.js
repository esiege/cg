import React from 'react';
import ReactModal from 'react-modal';
import './Modal.css';

ReactModal.setAppElement('#root');

const Modal = ({ isOpen, children, onRequestClose }) => {
  return (
    <ReactModal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose} 
      contentLabel="Modal"
      overlayClassName="ReactModal__Overlay"
      className="ReactModal__Content"
    >
      <div className="modal-content">
        {children}
      </div>
    </ReactModal>
  );
}

export default Modal;
