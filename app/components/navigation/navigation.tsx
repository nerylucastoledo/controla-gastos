"use client"

import Link from 'next/link'
import React, { ReactElement } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import styles from "../../styles/components/header.module.scss"

import logo from "../../images/logo.webp";

interface IProps {
	href: string;
	icon: ReactElement,
	name_mobile: string;
	name_desktop: string;
}
interface INavigationProps {
  navLinks: IProps[];
}

export const Navigation: React.FC<INavigationProps> = ({ navLinks }) => {
	const pathname = usePathname();
	const common = { alt: 'lOGO', width: 64, height: 64 };
	const hiddenNav = pathname === "/register" || pathname === "/login"

	if (hiddenNav) return null;

  return (
    <header className={styles.header}>
			<nav>
				<Link href={"/"}>
					<Image {...common} src={logo.src} alt='Logo ' priority={false} />
				</Link>

				<ul>
					{navLinks.map((link: IProps) => {
						const isActive = pathname === link.href;

						return (
							<li key={link.name_mobile}>
								<Link href={link.href} className={isActive ? styles.active : ""} prefetch={true}>
									{link.icon}
									<span>{link.name_mobile}</span>
									<span>{link.name_desktop}</span>
								</Link>
							</li>
						)
					})}
				</ul>
			</nav>
  	</header>
  )
}
