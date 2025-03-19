"use client"

import Link from 'next/link'
import React, { ReactElement, useState } from 'react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

import styles from "../../styles/components/header.module.scss"

import logo from "../../images/logo.webp";
import { fetcherPost } from '@/app/utils'
import { Toast } from '../toast/toast'

interface IProps {
	href: string;
	icon: ReactElement,
	name_mobile: string;
	name_desktop?: string;
}

interface INavigationProps {
  navLinks: IProps[];
}

export const Navigation: React.FC<INavigationProps> = ({ navLinks }) => {
	const router = useRouter();
	const pathname = usePathname();
	const [toast, setToast] = useState<{ success: boolean; message: string } | null>(null);
	const common = { width: 64, height: 64 };
	const hiddenNav = pathname === "/register" || pathname === "/login"

	if (hiddenNav) return null;

	const handleLogout = async () => {
		try {
      await fetcherPost<void, void>(
        `${process.env.NEXT_PUBLIC_API_URL}/logout`, 
        "POST", 
      );

			localStorage.clear()
			sessionStorage.clear()
			setToast({ success: true, message: "Estamos te redirecionando." })

			setTimeout(() => router.push("/login"), 1000);
    } catch (err) {
			const message = err instanceof Error ? err.message : "Ocorreu um erro inesperado.";
      setToast({ success: false, message: message })
    }
	}

  return (
    <header className={styles.header}>
      <Toast 
				success={toast?.success}
				message={toast?.message}
				show={toast ? true : false}
				setShowToast={setToast}
			/>

			<nav>
				<Link href={"/"}>
					<Image {...common} src={logo.src} alt='Logo' priority={true} />
				</Link>

				<ul>
					{navLinks.map((link: IProps, index: number) => {
						const isActive = pathname === link.href;
						const isBtnLogout = navLinks.length - 1 === index

						return (
							<li key={link.name_mobile} onClick={() => isBtnLogout ? handleLogout() : {}}>
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
