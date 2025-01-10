import React from 'react';

import styles from "../../styles/card.module.scss"

import { Data } from '@/app/utils/types';
import { CardItem } from './cardItem';
import Loading from '../loading/loading';

export default function Card({ loading }: { loading: boolean, data: Data[] }) {

  return (
    <div className={`content_card ${styles.card}`}>
      <h1 className='content_card__title'>cartões</h1>

      <div className={`${styles.card_container}`}>
        {loading ? (
          <Loading />
        ) : (
          <>
            <CardItem name='Nubank' color='red' value='R$ 6.278,97'/>
            <CardItem name='Samsung' color='#000' value='R$ 6.278,97'/>
            <CardItem name='Picpay' color='blue' value='R$ 6.278,97'/>
          </>
        )}
      </div>
    </div>
  );
}