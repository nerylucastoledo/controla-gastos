"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import styles from "../../styles/components/modal.module.scss";

interface Props {
  children: React.ReactNode;
  background?: string;
  customClass?: string
  onCustomDismiss?: () => void;
}

const Modal = ({ children, background, customClass = "", onCustomDismiss }: Props) => {
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const isModal = e.target === overlay.current || e.target === wrapper.current;

    if (isModal) {
      onDismiss();
    }
  }, [onDismiss]);

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    const isEsc = e.key === "Escape";

    if (isEsc) {
      onDismiss();
    }
  }, [onDismiss]);

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <div className={`${customClass} ${styles.modal_overlay}`} ref={overlay} onClick={onClick} >
      <div className={styles.modal_wrapper} ref={wrapper} tabIndex={0}>
        <div className={styles.modal_wrapper_content} style={{ background }}>
          <div className={styles.modal_wrapper_content_close}>
            <button onClick={() => onCustomDismiss ? onCustomDismiss() : onDismiss()}>x</button>
          </div>
           {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;