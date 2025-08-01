"use client";

import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from "../../styles/components/header/header.module.scss";

import logo from "../../images/logo.webp";

const PATHS = {
  LOGIN: '/login',
  REGISTER: '/register',
};

export const HeaderPublic = () => {
  const pathName = usePathname();
  const buttonText = pathName === PATHS.LOGIN ? "Criar uma conta" : "Fazer login";
  const buttonLink = pathName === PATHS.LOGIN ? PATHS.REGISTER : PATHS.LOGIN;

  return (  
    <header className={`${styles.header} ${styles.public}`}>
      <nav className={styles.container}>
        <div className={styles.container_logo}>
          <Image 
            width={64}
            height={64}
            src={logo.src} 
            alt='Logo'
            priority
          />
          
          <p>Controla Gastos</p>
        </div>

        <Link className="link-as-button" href={buttonLink}>
          {buttonText}
        </Link>
      </nav>
    </header>
  )
}
