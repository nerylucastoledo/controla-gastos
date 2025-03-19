import React from 'react';

import styles from "../../styles/components/latest-expenses.module.scss"

import Icon from '../icon/icons';
import { Expense } from '@/app/dto/expenseDTO';

interface IProps {
  data: Expense[];
}

export const LatestExpenses = ({ data }: IProps) => {
  const latestExpenses = data.slice(-10).reverse();

  return (
    <div className="content_card">
      <h1 className='content_card__title'>últimos gastos</h1>
        {!latestExpenses.length ? (
          <div className='empty'>
            <p>nenhum gasto cadastrado esse mês</p>
          </div>
        ) : (
          <div className={styles.latest_expenses}>
            <ul>
              {latestExpenses.map((expense, index) => (
                <li key={`${expense.item}-${index}`} className={styles.item}>
                  <div className={styles.item_name}>
                    <div className={styles.item_icon}>
                      <Icon name={expense.category} />
                    </div>

                    <div>
                      <p>{expense.item}</p>
                      <p><b>Pessoa: </b>{expense.people}</p>
                    </div>
                  </div>
                  <p className={styles.item_value}>{expense.value}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>
  );
}