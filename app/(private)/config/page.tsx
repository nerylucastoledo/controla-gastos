"use client"

import useSWR from "swr";
import { useCallback, useEffect, useState } from "react";

import styles from "../../styles/pages/home.module.scss";
import stylesConfig from "../../styles/pages/config.module.scss";

import { useUser } from "../../context/user";
import { fetcher, fetcherPost, formatCurrency, parseCurrencyString } from "../../utils";

import { ConfigList } from "../../components/configList/list";
import { Error as ErrorComponent } from "../../components/error/Error";
import { Input } from "../../components/input/input";
import { ModalEditConfig } from "../../components/modalEditConfig/modalEditConfig";
import { ModalConfigDelete } from "../../components/modalDeleteConfig/modalDeleteConfig";
import { Toast } from "../../components/toast/toast";

import Loading from "./loading";

import { useAuth } from "@/app/context/auth";
import { ResponseErrorOutput, ResponseOutput } from "@/app/dto/fetch";

import { PeopleOutput } from "@/app/dto/peopleDTO";
import { CardOutput } from "@/app/dto/cardDTO";
import { UpdateSalaryInput } from "@/app/dto/userDTO";

export default function Config() {
  const [salaryUpdate, setSalaryUpdate] = useState("R$ 0,00");
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [item, setItem] = useState<PeopleOutput | CardOutput | null>(null);
  const [toast, setToast] = useState<{ success: boolean; message: string } | null>(null);
  
  const { username, salary, setSalary } = useUser();
  const URL = process.env.NEXT_PUBLIC_API_URL

  useAuth();

  useEffect(() => {
    setSalaryUpdate(salary)
  }, [salary])


  const { data: peopleData, error: peopleError, mutate: mutatePeole, isLoading: loadingPeople } = useSWR<{ data: PeopleOutput[]}>(
    username ? `${URL}/peoples/${username}` : null,
    fetcher
  );
  const { data: cardData, error: cardError, mutate: mutateCard, isLoading: loadingCard } = useSWR<{ data: CardOutput[]}>(
    username ? `${URL}/cards/${username}` : null,
    fetcher
  );

  const handleFetch = () => {
    mutatePeole();
    mutateCard()
  }

  const openModal = useCallback((item: PeopleOutput | CardOutput, method: "PUT" | "DELETE") => {
    setItem(item);

    if (method === "PUT") {
      setIsModalEdit(true);
      return;
    }
    
    setIsModalDelete(true);
  }, []);

  const upateSalary = async () => {
    try {
      const response = await fetcherPost<UpdateSalaryInput, ResponseOutput | ResponseErrorOutput>(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${username}`, 
        "PUT", 
        { username, salary: parseCurrencyString(salaryUpdate) }
      );

      if ("error" in response) {
        throw new Error(response.message)
      }

      setToast({ success: true, message: response.message })
      setSalary(salaryUpdate)
      localStorage.setItem("salary", salaryUpdate)
      
    } catch (err) {
      const message = err instanceof Error ? err.message : "Ocorreu um erro inesperado.";
      setToast({ success: false, message: message })
    }
  }

  if (loadingPeople || loadingCard) return <Loading />
  if (peopleError || cardError) return <ErrorComponent mutate={handleFetch} />
  if (!peopleData || !cardData) return null;

  return (
    <>
      <Toast 
        success={toast?.success}
        message={toast?.message}
        show={toast ? true : false}
        setShowToast={setToast}
      />

      <section className={`container ${styles.container_home} ${stylesConfig.config}`}>
        <div className={`${stylesConfig.content}`}>
          <h2 className="title">Atualize os dados</h2>
          <p className="subtitle">Aqui você mantém total controle das pessoas, cartões e dos eu salário</p>

          <div className={`${stylesConfig.content__container}`}>
            <div className={`${stylesConfig.item}`}>
              <h3>salário</h3>

              <div className={`${stylesConfig.item__salary}`}>
                <Input
                  data-testid="value"
                  label="Valor (R$)"
                  name="value"
                  onChange={({ currentTarget }) => setSalaryUpdate(formatCurrency(currentTarget.value))}
                  required
                  type="text" 
                  value={salaryUpdate}
                />
                <button className="button button__primary" onClick={() => upateSalary()} data-testid="update-salary">
                  Salvar
                </button>
              </div>
            </div>

            <div className={`${stylesConfig.item}`}>
              <h3>pessoas</h3>
              {!peopleData.data.length ? (
                <p className="empty">nenhuma pessoa cadastrada</p>
              ) : (
                <ConfigList data={peopleData.data} openModal={openModal} />
              )}
            </div>

            <div className={`${stylesConfig.item}`}>
              <h3>cartões</h3>
              {!cardData.data.length ? (
                <p className="empty">nenhum cartão cadastrado</p>
              ) : (
                <ConfigList data={cardData.data} openModal={openModal} />
              )}
            </div>
          </div>
        </div>
      </section>

      {isModalEdit && <ModalEditConfig item={item} mutate={handleFetch} onCustomDismiss={() => setIsModalEdit(false)} />}
      {isModalDelete && <ModalConfigDelete item={item} mutate={handleFetch} onCustomDismiss={() => setIsModalDelete(false)} />}
    </>
  );
}
