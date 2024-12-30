"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { IoFastFoodOutline } from 'react-icons/io5'

import styles from "../../styles/header.module.scss"

interface Params {
	name: string;
	href: string;
}
interface NavigationProps {
  navLinks: Params[];
}

export const Navigation: React.FC<NavigationProps> = ({ navLinks }) => {
	const pathname = usePathname();

	const openMenu = () => {
		const menu = document.querySelector("ul");
		menu?.classList.toggle(styles.active)
	}

  return (
    <header className={styles.header}>
			<nav>
				<Link href={"/"}>
					<IoFastFoodOutline size={60}/>
				</Link>

				<div className={styles.menu} onClick={openMenu}>
					<div id="bar1" className={styles.menu_bar}>
						<div id="bar1" className={styles.menu_bar_item}></div>
						<div id="bar2" className={styles.menu_bar_item}></div>
						<div id="bar3" className={styles.menu_bar_item}></div>
					</div>
				</div>

				<ul>
					{navLinks.map((link: Params) => {
						const isActive = pathname === link.href;

						return (
							<li key={link.name}>
								<Link href={link.href} className={isActive ? styles.active : ""}>{link.name}</Link>
							</li>
						)
					})}
				</ul>
			</nav>
  	</header>
  )
}
