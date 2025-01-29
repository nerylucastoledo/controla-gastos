import React from 'react'

import styles from "../../styles/components/card.module.scss"

import { FaCreditCard } from 'react-icons/fa6'

interface IParams { 
	name: string;
	value: string;
	color: string 
}

export const CardItem = ({ name, value, color }: IParams) => {
  return (
    <div className={`${styles.item_content}`} style={{ backgroundColor: color }}>
			<div>
				<p>{name}</p>
				<FaCreditCard size={24} />
			</div>
			<div className={`${styles.item_content_value}`}>
				<span>**** **** **** ****</span>
				<p>{value}</p>
			</div>
		</div>
  )
}
