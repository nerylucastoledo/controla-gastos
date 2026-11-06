import React, { useMemo } from 'react'

import styles from "../../../styles/components/installments-by-person/installments-by-person.module.scss"

import { formatToCurrencyBRL, parseCurrencyString } from '@/utils';
import { BillDTOOutput } from '@/dto/billDTO';

type PersonInstallments = {
  name: string;
  items: BillDTOOutput[];
  total: number;
}

const installmentsByPeople = (expenses: BillDTOOutput[]) => {
  const installments = expenses.filter((expense) => expense.installment);

  const grouped = installments.reduce((acc, expense) => {
    if (!acc[expense.people]) {
      acc[expense.people] = {
        name: expense.people,
        items: [],
        total: 0,
      };
    }

    acc[expense.people].items.push(expense);
    acc[expense.people].total += parseCurrencyString(expense.value);

    return acc;
  }, {} as Record<string, PersonInstallments>);

  return Object.values(grouped);
};

export default function InstallmentsByPerson({ data }: { data: BillDTOOutput[] }) {

  const installments = useMemo(() => installmentsByPeople(data), [data]);

  return (
    <div className={styles.installmentsByPerson}>
      <h2 className={styles.title}>Parcelas por pessoa</h2>

      {!installments.length ? (
        <div className="empty">
          <p className='subtitle'>Nenhuma parcela encontrada.</p>
        </div>
      ) : (
        <div className={styles.list}>
          {installments.map((person) => (
            <div key={person.name} className={styles.person}>
              <div className={styles.header}>
                <p className={styles.name}>{person.name}</p>
                <p className={styles.total}>{formatToCurrencyBRL(person.total)}</p>
              </div>

              <table>
                <tbody>
                  {person.items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.item}</td>
                      <td>{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
