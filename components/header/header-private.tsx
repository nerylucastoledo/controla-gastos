'use client'

import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from "../../styles/components/header/header.module.scss";

import logo from "../../images/logo.webp";

import { IoHomeSharp } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import { MdOutlineLogout } from 'react-icons/md';
import { MdAccountCircle } from "react-icons/md";
import { RiListCheck } from "react-icons/ri";

import logout from '@/actions/logout';

export const HeaderPrivate = () => {
  const pathName = usePathname();

  const links = [
    { href: "/", label: "Ínicio", icon: <IoHomeSharp size={20} /> },
    { href: "/new-expense", label: "Transação", icon: <RiListCheck size={20} /> },
    { href: "/new-option", label: "Novo", icon: <IoIosAddCircle size={20} /> },
    { href: "/account", label: "Conta", icon: <MdAccountCircle size={20} /> },
  ]

  const handleLogout = async () => {
    localStorage.removeItem("salary");
    await logout();
  };

  return (  
    <header className={`${styles.header} ${styles.private}`}>
      <nav className={styles.container}>
        <div className={styles.container_logo}>
          <Link href="/">
            <Image 
              src={logo.src} 
              alt="Controla Gastos" 
              width={50} 
              height={50} 
            />
          </Link>
          
          <p>Controla Gastos</p>

          <button onClick={handleLogout} aria-label="Sair da conta">
            <MdOutlineLogout size={24} />
          </button>
        </div>

        <ul>
          {links.map(link => (
            <li 
              key={link.href} 
              className={`${pathName === link.href ? styles.active : ''}`}
            >
              <Link href={link.href}>
                { link.icon} <span>{link.label}
              </span></Link>
            </li>
          ))}
          
          <li>
            <button onClick={handleLogout} aria-label="Sair da conta">
              <MdOutlineLogout size={24} />
            </button>
          </li>
        </ul>
      </nav>
    </header>
  )
}
