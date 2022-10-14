import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { ModalContent, Backdrop } from './Modal.styled';

export const Modal = ({ onClose, children }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onEscapeClose = useCallback(e => {
    if (e.code === 'Escape') {
      onClose();
    }
  });

  const onBackdropClose = evt => {
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  };

  const modalRoot = document.querySelector('#modal-root');

  useEffect(() => {
    window.addEventListener('keydown', onEscapeClose);
    return () => {
      window.removeEventListener('keydown', onEscapeClose);
    };
  }, [onEscapeClose]);

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
