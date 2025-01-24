"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { IoFastFoodOutline } from 'react-icons/io5'

import styles from "../../styles/components/header.module.scss"
import { IconType } from 'react-icons'

interface Params {
	name: string;
	href: string;
	icon: IconType,
}
interface NavigationProps {
  navLinks: Params[];
}

export const Navigation: React.FC<NavigationProps> = ({ navLinks }) => {
	const pathname = usePathname();

  return (
    <header className={styles.header}>
			<nav>
				<Link href={"/"}>
					<IoFastFoodOutline size={60}/>
				</Link>

				<ul>
					{navLinks.map((link: Params) => {
						const isActive = pathname === link.href;

						return (
							<li key={link.name}>
								<Link href={link.href} className={isActive ? styles.active : ""} prefetch={true}>{link.icon} <span>{link.name}</span></Link>
							</li>
						)
					})}
				</ul>
			</nav>
  	</header>
  )
}
