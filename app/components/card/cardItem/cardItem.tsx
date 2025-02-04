import React from 'react'

import styles from "../../../styles/components/card.module.scss"

import { FaCreditCard } from 'react-icons/fa6'

interface IProps { 
	color: string 
	name: string;
	value: string;
}

export const CardItem = ({ color, name, value }: IProps) => {
  return (
    <div className={`${styles.item_content}`} style={{ backgroundColor: color }} data-testid="card-item">
			<div>
				<p>{name}</p>
				<FaCreditCard size={24} data-testid="icon"/>
			</div>
			<div className={`${styles.item_content_value}`}>
				<span>**** **** **** ****</span>
				<p>{value}</p>
			</div>
		</div>
  )
}
