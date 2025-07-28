"use client"

import React, { useActionState, useEffect, useState } from 'react'
import { Input } from '../forms/input'

import styles from "../../styles/components/new-option/new-option.module.scss"

import { toast } from 'react-hot-toast';
import { optionPost } from '@/actions/option'

export default function NewOptionForm() {
  const [type, setType] = useState<"people" | "card">("people");
  const [color, setColor] = useState<string>("#222");

  const [state, action] = useActionState(optionPost, { ok: false, error: '', data: null });

  useEffect(() => {
    if (state.ok) {
      toast.success("Adicionado com sucesso!");
    } else if (state.error) {
      toast.error(state.error || "Erro ao adicionar. Tente novamente!");
    }
  }, [state]);

  return (
    <>
      <div className={styles.options}>
        <button onClick={() => setType("people")} className={type === "people" ? styles.active : ''}>
          Pessoa
        </button>
        <button onClick={() => setType("card")} className={type === "card" ? styles.active : ''}>
          Cartão
        </button>
      </div>

      <form className={styles.form} action={action}>
        <Input
          id="name"
          name='name'
          label={type === "people" ? "Nome da pessoa" : "Nome do cartão"}
          type="text"
          placeholder={type === "people" ? "Digite o nome da pessoa" : "Digite o nome do cartão"}
          required
          autoComplete='off'
        />

        {type === "card" && (
          <Input
            id="color"
            name='color'
            label="Cor do cartão"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            style={{ backgroundColor: color }}
            type="color"
            placeholder="Selecione a cor do cartão"
          />
        )}

        <button type="submit">Adicionar</button>
      </form>
    </>
  )
}
