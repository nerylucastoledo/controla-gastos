"use client"

import Link from "next/link";
import useSWR from "swr";
import { useState } from "react";

import styles from "../styles/pages/home.module.scss";
import stylesConfig from "../styles/pages/config.module.scss";

import { IoFastFoodOutline } from "react-icons/io5";

import { useUser } from "../context/user";
import { fetcher, formatCurrency } from "../utils";

import LoadingConfig from "./loading";
import { Input } from "../components/input/input";
import List from "./list/list";
import { ConfigModalEdit } from "./modalEdit/configModalEdit";
import { ConfigModalDelete } from "./modalDelete/configModalDelete";

interface People {
  _id: string;
  name: string;
  username: string;
}

interface Card {
  _id: string;
  name: string;
  username: string;
  color: string;
}

export default function NewExpense() {
  const { username, salary } = useUser();
  const [salaryUpdate, setSalaryUpdate] = useState(salary);
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [item, setItem] = useState<People | Card | null>(null);

  const { data: peopleData, error: peopleError, isLoading: isLoadingPeople, mutate: mutatePeole } = useSWR<People[]>(`http://localhost:4000/api/peoples/${username}`, fetcher);
  const { data: cardData, error: cardError, isLoading: isLoadingCard, mutate: mutateCard } = useSWR<Card[]>(`http://localhost:4000/api/cards/${username}`, fetcher);

  const handleFetch = () => {
    mutatePeole();
    mutateCard()
  }

  if (isLoadingPeople && isLoadingCard) return <LoadingConfig />;

  if (peopleError || cardError || !peopleData || !cardData ) {
    return (
      <div className={styles.container_home}>
        <div className={styles.container_home_error}>
          <h1>Tivemos um problema para carregar seus dados! Você pode clicar no botão abaixa e tentar novamente :)</h1>
          <button className="button" onClick={handleFetch}>Recarregar</button>
        </div>
      </div>
    )
  }

  const openModal = (item: People | Card, method: "PUT" | "DELETE") => {
    setItem(item);

    if (method === "PUT") {
      setIsModalEdit(true);
    } else {
      setIsModalDelete(true);
    }
  };

  return (
    <>
      <section className={`container ${styles.container_home} ${stylesConfig.config}`}>
        <Link href={"/"}>
          <IoFastFoodOutline size={60}/>
        </Link>

        <div className={`${stylesConfig.content}`}>
          <h2 className="title">Atualize os dados</h2>
          <p className="subtitle">Aqui você mantém total controle das pessoas, cartões e dos eu salário</p>

          <div className={`${stylesConfig.content__container}`}>
            <div className={`${stylesConfig.item}`}>
              <h3>salário</h3>

              <div className={`${stylesConfig.item__salary}`}>
                <Input
                  label="Valor (R$)"
                  type="text" 
                  name="value"
                  data-testid="value"
                  required
                  value={salaryUpdate}
                  onChange={({ currentTarget }) => setSalaryUpdate(formatCurrency(currentTarget.value))}
                />
                <button className="button button__primary">Salvar</button>
              </div>
            </div>

            <div className={`${stylesConfig.item}`}>
              <h3>pessoas</h3>
              {!peopleData.length ? (
                <p className="empty">nenhuma pessoa cadastrada</p>
              ) : (
                <List data={peopleData} openModal={openModal} />
              )}
            </div>

            <div className={`${stylesConfig.item}`}>
              <h3>cartões</h3>
              {!cardData.length ? (
                <p className="empty">nenhum cartão cadastrado</p>
              ) : (
                <List data={cardData} openModal={openModal} />
              )}
            </div>
          </div>
        </div>
      </section>

      {isModalEdit && <ConfigModalEdit item={item} onCustomDismiss={() => setIsModalEdit(false)} />}
      {isModalDelete && <ConfigModalDelete item={item} onCustomDismiss={() => setIsModalDelete(false)} />}
    </>
  );
}
