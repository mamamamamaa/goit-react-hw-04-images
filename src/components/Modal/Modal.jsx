import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { ModalContent, Backdrop } from './Modal.styled';

export const Modal = ({ onClose, children }) => {
  useEffect(() => {
    window.addEventListener('keydown', onEscapeClose);
    return () => {
      window.removeEventListener('keydown', onEscapeClose);
    };
  }, []);

  const onBackdropClose = evt => {
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  };

  const onEscapeClose = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const modalRoot = document.querySelector('#modal-root');

  return createPortal(
    <Backdrop onClick={onBackdropClose}>
      <ModalContent>{children}</ModalContent>
    </Backdrop>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
