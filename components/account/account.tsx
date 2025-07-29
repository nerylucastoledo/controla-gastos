"use client";

import { CardDTOOutput } from '@/dto/cardDTO';
import { PeopleDTOOutput } from '@/dto/peopleDTO';
import React, { useActionState, useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast';

import { MdOutlineEmojiPeople } from "react-icons/md";
import { FaCreditCard } from "react-icons/fa6";

import { formatCurrency, formatToCurrencyBRL, parseCurrencyString } from '@/utils';
import { salaryUpdate } from '@/actions/account';

import styles from "../../styles/components/account/account.module.scss";

import Item from './item/item';
import Input from '../forms/input';
import ModalEdit from './modal-action/modalEdit';
import ModalDelete from './modal-action/modalDelete';
import Submit from '../forms/submit';

type AccountProps = {
  peoples: PeopleDTOOutput[];
  cards: CardDTOOutput[];
}

type ModalActionType = {
  show: boolean;
  type: "edit" | "delete" | null;
  item: CardDTOOutput | PeopleDTOOutput | null;
}

export default function Account({ cards, peoples }: AccountProps) {
  const [salary, setSalary] = useState("R$ 0,00");
  const [modalAction, setModalAction] = useState<ModalActionType>({ show: false, type: null, item: null });

  const [state, action] = useActionState(salaryUpdate, { ok: false, error: '', data: null });

  useEffect(() => {
    const storedSalary = localStorage.getItem('salary');

    if (storedSalary) {
      setSalary(formatToCurrencyBRL(Number(storedSalary)));
    }
  }, []);

  useEffect(() => {
    if (state.ok) {
      localStorage.setItem('salary', parseCurrencyString(salary).toString());

      setModalAction({ show: false, type: null, item: null });
      
      toast.success(state.data.message || "Salário atualizado com sucesso!");
    } else if (state.error) {
      toast.error(state.error || "Erro ao atualizar. Tente novamente!");
    }
  }, [state, salary]);
  
  const handleCloseModalAction = useCallback(() => {
    setModalAction({ show: false, type: null,  item: null });
  }, []);

  const handleSalary = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSalary(formatCurrency(value));
  }, []);

  return (
    <div className={styles.account}>
      <form action={action} className={styles.formSalary}>
        <Input
          id='salary'
          name='salary'
          type='text'
          label='Salário'
          value={salary}
          onChange={handleSalary}
          placeholder='R$ 0,00'
          required
        />

        <Submit message="Salvando...">Salvar</Submit>
      </form>

      <div>
          <h2>Pessoas</h2>

          <div className={styles.cards}>
            {!peoples.length ? (
              <div className="empty">
                <p className='subtitle'>Você não possui pessoas cadastradas.</p>
              </div>
            ) : (
              <>
                {peoples.map(person => (
                  <Item
                    key={person._id}
                    icon={<MdOutlineEmojiPeople size={40} color='#fff' />}
                    item={person}
                    setModalAction={setModalAction}
                  />
                ))}
              </>
            )}
          </div>
        </div>

      <div>
        <h2>Cartões</h2>

        <div className={styles.cards}>
          {!cards.length ? (
            <div className="empty">
              <p className='subtitle'>Você não possui cartões cadastrados.</p>
            </div>
          ) : (
            <>
              {cards.map(card => (
                <Item
                  key={card._id}
                  icon={<FaCreditCard size={40} color={card.color} />}
                  item={card}
                  setModalAction={setModalAction}
                />
              ))}
            </>
          )}
        </div>
      </div>

      {modalAction.show && modalAction.type === "edit" && modalAction.item && (
        <ModalEdit
          handleCloseModal={handleCloseModalAction}
          item={modalAction.item}
        />
      )}
  
      {modalAction.show && modalAction.type === "delete" && modalAction.item && (
        <ModalDelete
          handleCloseModal={handleCloseModalAction}
          item={modalAction.item}
        />
      )}
    </div>
  )
}
