import React from 'react'

import styles from "../../styles/card.module.scss"
import { FaCreditCard } from 'react-icons/fa6'

interface Params { 
	name: string;
	value: string;
	color: string 
}

export const CardItem = ({ name, value, color }: Params) => {
  return (
    <button className={`${styles.card_container__item}`} style={{ backgroundColor: color }}>
			<div>
				<p>{name}</p>
				<FaCreditCard size={24} />
			</div>
			<div className={`${styles.card_container__item_value}`}>
				<span>**** **** **** ****</span>
				<p>{value}</p>
			</div>
		</button>
  )
}
