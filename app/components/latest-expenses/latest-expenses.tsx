import React from 'react';

import styles from "../../styles/latestExpenses.module.scss"
import Loading from '../loading/loading';
import { Data } from '@/app/utils/types';
import Icon from '../icon/icons';

export default function LatestExpenses({ loading, data }: { loading: boolean, data: Data[] }) {
  const latestExpenses = data.slice(-10).reverse();

  return (
    <div className="content_card">
      <h1 className='content_card__title'>últimos gastos</h1>

      {loading ? (
        <Loading />
      ) : (
        <>
          {!latestExpenses.length ? (
            <div className='empty'>
              <p>Nada para mostrar no momento :)</p>
            </div>
          ) : (
            <div className={styles.latest_expenses}>
              <ul>
                {latestExpenses.map((expense, index) => (
                  <li key={`${expense.item}-${index}`} className={styles.latest_expenses__item}>
                    <div className={styles.latest_expenses__item_name}>
                      <div className={styles.latest_expenses__item_name_icon}>
                        <Icon name={expense.category} />
                      </div>
                      <div>
                        <p>{expense.item}</p>
                        <p><b>Pessoa: </b>{expense.people}</p>
                      </div>
                    </div>
                    <p className={styles.latest_expenses__item_value}>{expense.value}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}