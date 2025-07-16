import React from 'react'

import styles from "../../styles/components/recent-transaction/recent-transaction.module.scss"
import Icon from '../icon/icons'

export default function RecentTransaction() {
  return (
    <div className={styles.recentTransaction}>
      <h1 className='title'>Transações recentes</h1>

      <div className={styles.container}>
        <div className={styles.item}>
          <Icon name={"Alimentação"} color='#000' />
          <div>
            <h2>Almoço no restaurante Almoço no restaurante</h2>
            <p>R$ 50,00</p>
            <p>Alessa</p>
          </div>
        </div>

        <div className={styles.item}>
          <Icon name={"Alimentação"} color='#000' />
          <div>
            <h2>Almoço no restaurante</h2>
            <p>R$ 50,00</p>
            <p>Alessa</p>
          </div>
        </div>

        <div className={styles.item}>
          <Icon name={"Alimentação"} color='#000' />
          <div>
            <h2>Almoço no restaurante</h2>
            <p>R$ 50,00</p>
            <p>Alessa</p>
          </div>
        </div>

        <div className={styles.item}>
          <Icon name={"Alimentação"} color='#000' />
          <div>
            <h2>Almoço no restaurante</h2>
            <p>R$ 50,00</p>
            <p>Alessa</p>
          </div>
        </div>

        <div className={styles.item}>
          <Icon name={"Alimentação"} color='#000' />
          <div>
            <h2>Almoço no restaurante</h2>
            <p>R$ 50,00</p>
            <p>Alessa</p>
          </div>
        </div>

        <div className={styles.item}>
          <Icon name={"Alimentação"} color='#000' />
          <div>
            <h2>Almoço no restaurante</h2>
            <p>R$ 50,00</p>
            <p>Alessa</p>
          </div>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Categoria</th>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Pessoa</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><Icon name={"Alimentação"} /> Alimentação</td>
            <td>Almoço no restaurante</td>
            <td>R$ 50,00</td>
            <td>Alessa</td>
          </tr>
          <tr>
            <td><Icon name={"Alimentação"} /> Alimentação</td>
            <td>Almoço no restaurante</td>
            <td>R$ 50,00</td>
            <td>Alessa</td>
          </tr>
          <tr>
            <td><Icon name={"Alimentação"} /> Alimentação</td>
            <td>Almoço no restaurante</td>
            <td>R$ 50,00</td>
            <td>Alessa</td>
          </tr>
          <tr>
            <td><Icon name={"Alimentação"} /> Alimentação</td>
            <td>Almoço no restaurante</td>
            <td>R$ 50,00</td>
            <td>Alessa</td>
          </tr>
          <tr>
            <td><Icon name={"Alimentação"} /> Alimentação</td>
            <td>Almoço no restaurante</td>
            <td>R$ 50,00</td>
            <td>Alessa</td>
          </tr>
          <tr>
            <td><Icon name={"Alimentação"} /> Alimentação</td>
            <td>Almoço no restaurante</td>
            <td>R$ 50,00</td>
            <td>Alessa</td>
          </tr>
          <tr>
            <td><Icon name={"Alimentação"} /> Alimentação</td>
            <td>Almoço no restaurante</td>
            <td>R$ 50,00</td>
            <td>Alessa</td>
          </tr>
          <tr>
            <td><Icon name={"Alimentação"} /> Alimentação</td>
            <td>Almoço no restaurante</td>
            <td>R$ 50,00</td>
            <td>Alessa</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
