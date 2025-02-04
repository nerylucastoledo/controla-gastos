"use client"

import Link from 'next/link'
import React, { ReactElement } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import styles from "../../styles/components/header.module.scss"

import logo from "../../images/logo.png";

interface IProps {
	href: string;
	icon: ReactElement,
	name: string;
}
interface INavigationProps {
  navLinks: IProps[];
}

export const Navigation: React.FC<INavigationProps> = ({ navLinks }) => {
	const pathname = usePathname();
	const common = { alt: 'lOGO', width: 64, height: 64 };

  return (
    <header className={styles.header}>
			<nav>
				<Link href={"/"}>
					<Image {...common} src={logo.src} alt='Logo ' />
				</Link>

				<ul>
					{navLinks.map((link: IProps) => {
						const isActive = pathname === link.href;

						return (
							<li key={link.name}>
								<Link href={link.href} className={isActive ? styles.active : ""} prefetch={true}>
									{link.icon}
									<span>{link.name}</span>
								</Link>
							</li>
						)
					})}
				</ul>
			</nav>
  	</header>
  )
}
