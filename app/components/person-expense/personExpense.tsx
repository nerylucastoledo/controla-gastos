import React from 'react'

import styles from "../../styles/components/person-expense/person-expense.module.scss"

export default function PersonExpense() {
  return (
    <div className={styles.personExpense}>
      <h1 className='title'>Gasto por pessoa</h1>

      <table>
        <thead>
          <tr>
            <th>Pessoa</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Alessa</td>
            <td>R$ 50,00</td>
          </tr>
          <tr>
            <td>Alessa</td>
            <td>R$ 50,00</td>
          </tr>
          <tr>
            <td>Alessa</td>
            <td>R$ 50,00</td>
          </tr>
          <tr>
            <td>Alessa</td>
            <td>R$ 50,00</td>
          </tr>
          <tr>
            <td>Alessa</td>
            <td>R$ 50,00</td>
          </tr>
          <tr>
            <td>Alessa</td>
            <td>R$ 50,00</td>
          </tr>
          <tr>
            <td>Alessa</td>
            <td>R$ 50,00</td>
          </tr>
          <tr>
            <td>Alessa</td>
            <td>R$ 50,00</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
