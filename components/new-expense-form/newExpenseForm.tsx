"use client"

import React, { ChangeEvent, useActionState, useEffect, useState } from 'react'

import Select from '../forms/select'
import Input from '../forms/input'

import { categorys, formatCurrency, months, years } from '@/utils'
import { PeopleDTOOutput } from '@/dto/peopleDTO'

import styles from "../../styles/components/new-expense/new-expense.module.scss"

import { useDate } from '@/context/date-context'
import { billPost } from '@/actions/bill'

import { toast } from 'react-hot-toast';
import { CardDTOOutput } from '@/dto/cardDTO'

type NewExpenseFormProps = {
  peoples: PeopleDTOOutput[];
  cards: CardDTOOutput[];
}

export default function NewExpenseForm({ peoples, cards }: NewExpenseFormProps) {
  const { date } = useDate();

  const [installments, setInstallments] = useState(false);

  const [state, action] = useActionState(billPost, { ok: false, error: '', data: null });

  useEffect(() => {
    if (state.ok) {
      toast.success("Despesa adicionada com sucesso!");
    } else if (state.error) {
      toast.error("Erro ao adicionar despesa. Tente novamente!");
    }
  }, [state]);

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    e.target.value = formatCurrency(value);
  };

  if (!cards.length) {
    return <div className={`empty ${styles.empty}`}>
      <p className='subtitle'>Adicione um cartão para adicionar um gasto.</p>
    </div>;
  }

  const names = ["Eu"];
  const cardNames = cards.map((card) => card.name);

  if (peoples.length) {
    peoples.forEach((people) => names.push(people.name));
  }

  return (
    <form className={styles.form} action={action}>
      <div className={styles.date}>
        <Select
          id="month"
          name='month'
          className={styles.select}
          label="Mês"
          options={months}
          defaultValue={date.month}
          handleChange={(value: string) => value}
        />

        <Select
          id="year"
          name='year'
          className={styles.select}
          label="Ano"
          options={years}
          defaultValue={date.year}
          handleChange={(value: string) => value}
        />
      </div>

      <Select
        id="people"
        name='people'
        className={styles.select}
        label="Pessoas"
        options={names}
        defaultValue={names[0]}
        handleChange={(value: string) => value}
      />

      <Select
        id="card"
        name='card'
        className={styles.select}
        label="Cartão"
        options={cardNames}
        defaultValue={cardNames[0]}
        handleChange={(value: string) => value}
      />

      <Select
        id="category"
        name='category'
        className={styles.select}
        label="Categoria"
        options={Array.from(categorys)}
        defaultValue={Array.from(categorys)[0]}
        handleChange={(value: string) => value}
      />

      <Input
        id="item"
        name='item'
        label="Descrição"
        type="text"
        placeholder="Ex: Compra no mercado"
        required
      />

      <Input
        id="value"
        name='value'
        label="Valor"
        type="text"
        placeholder="R$ 0,00"
        onChange={handleValueChange}
        required
      />

      <Input
        id="installment"
        label="Possui parcelas?"
        type="checkbox"
        checked={installments}
        onChange={() => setInstallments(!installments)}
      />

      {installments && (
        <Input
          id="installments"
          name='installments'
          label="Quantidade de parcelas"
          type="number"
          placeholder="Ex: 3"
          required
        />
      )}

      <button type="submit">Adicionar</button>
    </form>
  )
}
