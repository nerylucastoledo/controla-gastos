import React, { Dispatch, SetStateAction } from "react";

import styles from "../../styles/components/modal.module.scss";

interface Props {
  onClose: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
  title: string;
}

const ModalInvoice = ({ onClose, children, title }: Props) => {
  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal_wrapper}>
        <div className={styles.modal}>
          <div className={styles.modal_header}>
            <a href="#" onClick={() => onClose(false) }>
              x
            </a>
          </div>
          {title && <h1>{title}</h1>}
          <div className={styles.modal_body}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ModalInvoice;