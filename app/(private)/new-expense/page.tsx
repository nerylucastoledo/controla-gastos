"use client"

import { useUser } from "../../context/user";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";

import styles from "../../styles/pages/home.module.scss";
import stylesNewExpense from "../../styles/pages/new-expense.module.scss";

import { categorys, fetcher, fetcherPost, formatCurrency, months, years } from "../../utils";

import { Error } from "../../components/error/Error";
import { Input } from "../../components/input/input";
import { Select } from "../../components/select/select";
import { Toast } from "../../components/toast/toast";

import Loading from "./loading";

import { ICard, IPeople } from "../../utils/types";

interface IBody {
  card: string;
  category: string;
  date: string;
  installments: number;
  item: string;
  people: string;
  username: string;
  value: string;
}

interface IData {
  data: IPeople[] | ICard[]
}

export default function NewExpense() {
  const date = new Date()
  const [month, setMonth] = useState(months[date.getMonth()]);
  const [year, setYear] = useState(date.getFullYear().toString());
  const [people, setPeople] = useState("");
  const [card, setCard] = useState("");
  const [category, setCategory] = useState("");
  const [value, setValue] = useState("R$ 0,00");
  const [item, setItem] = useState("")
  const [hasInstallment, setHasInstallment] = useState(false);
  const [installments, setInstallments] = useState(1)
  const [toastCustom, setToastCustom] = useState({ error: true, message: ""});

  const router = useRouter()
  const { username } = useUser();

  useEffect(() => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        router.push("/login");
      }
    }, [username, router]);

  const { data: peopleData, error: peopleError, mutate: mutatePeople, isLoading: loadingPeople } = useSWR<IData>(
    username ? `${process.env.NEXT_PUBLIC_API_URL}/peoples/${username}` : null, 
    fetcher
  );
  
  const { data: cardData, error: cardError, mutate: mutateCard, isLoading: loadingCard } = useSWR<IData>(
    username ? `${process.env.NEXT_PUBLIC_API_URL}/cards/${username}` : null, 
    fetcher
  );

  const handleFetch = () => {
    mutatePeople()
    mutateCard()
  }

  const handleToast = useCallback(async (error: boolean, message: string) => {
    setToastCustom({ error, message })
    setTimeout(() => setToastCustom({ error, message: "" }), 2000);
  }, [])

  const resetOptions = useCallback(() => {
    setPeople("")
    setCard("")
    setCategory("")
    setItem("")
    setValue("R$ 0,00")
    setHasInstallment(false)
    setInstallments(1)
  }, [])

  if (loadingPeople || loadingCard) return <Loading />
  if (peopleError || cardError) return <Error mutate={handleFetch} />
  if (!peopleData || !cardData) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const body = {
        "date": `${month}${year}`,
        card,
        category,
        item,
        installments,
        people,
        username,
        value,
      }

      const response = await fetcherPost<IBody, { message: string }>(`${process.env.NEXT_PUBLIC_API_URL}/expenses`, 
        "POST", 
        body
      );
      
      handleToast(true, response.message)
      resetOptions()
    } catch (err) {
      handleToast(false, (err as Error).message);
    }
  }

  return (
    <section className={`container ${stylesNewExpense.new_expense}`}>
      <Toast message={toastCustom.message} success={toastCustom.error} />

      <div className={styles.container_home}>
        <form onSubmit={handleSubmit}>
          {!cardData.data.length ? (
            <p className={"empty"}>Você precisa cadastrar um cartão para continuar</p>
          ) : (
            <>
              <h1 className="title">Cadastre o novo gasto</h1>
              <p className="subtitle">
                Assim que você inserir o gasto ele irá aparecer na sua tela inicial e você conseguirá entender para onde ele está indo
              </p>
              
              <div className={stylesNewExpense.date}>
                <Select 
                  data-testid="month-select" 
                  value={month} 
                  id={"month"}
                  label={"mês"} 
                  onChange={({ target }) => setMonth(target.value)}
                >
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month === "Marco" ? "Março" : month}
                    </option>
                  ))}
                </Select>

                <Select 
                  data-testid="year-select" 
                  value={year}
                  id={"year"}
                  label={"ano"} 
                  onChange={({ target }) => setYear(target.value)}
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </Select>
              </div>

              <Select
                className={"modal-form__select"}
                data-testid="people-select" 
                id='people' 
                label='pessoa' 
                onChange={({ target }) => setPeople(target.value)}
                required
                value={people}
              >
                <option value={""} disabled>Selecione a pessoa</option>
                <option value={"Eu"}>Eu</option>
                {peopleData.data.length && peopleData.data.map((people) => (
                  <option key={people.name} value={people.name}>
                      {people.name}
                  </option>
                ))}
              </Select>

              <Select
                className={"modal-form__select"}
                data-testid="card-select" 
                id='card' 
                label='cartão' 
                onChange={({ target }) => setCard(target.value)}
                required
                value={card}
              >
                <option value={""} disabled>Selecione o cartão</option>
                {cardData.data.length && cardData.data.map((card) => (
                  <option key={card.name} value={card.name}>
                    {card.name}
                  </option>
                ))}
              </Select>

              <Select 
                className={"modal-form__select"}
                data-testid="category-select" 
                id='category' 
                label='Categoria' 
                onChange={({ target }) => setCategory(target.value)}
                required
                value={category}
              >
                <option value={""} disabled>Selecione a categoria</option>
                {categorys.map((category) => <option key={category} value={category}>{category}</option>)}
              </Select>

              <Input
                data-testid="item"
                label="Digite o  item"
                name="item"
                placeholder="Insira o texto aqui"
                onChange={({ target }) => setItem(target.value)}
                required
                type="text" 
                value={item}
              />

              <Input
                data-testid="value"
                label="Digite o valor (R$)"
                name="value"
                type="text" 
                onChange={({ currentTarget }) => setValue(formatCurrency(currentTarget.value))}
                required
                value={value}
              />

              <div className={`form-control ${stylesNewExpense.checkbox}`}>
                <Input
                  data-testid="has-installment"
                  label="Compra possui parcelas?"
                  name="has-installment"
                  checked={hasInstallment}
                  onChange={() => setHasInstallment(!hasInstallment)}
                  type="checkbox" 
                />
              </div>

              {hasInstallment && (
                <Input
                  data-testid="installment"
                  label="Quantidade"
                  name="installment"
                  onChange={({ currentTarget }) => setInstallments(Number(currentTarget.value))}
                  required
                  type="number" 
                  value={installments}
                />
              )}

              <input type="submit" value="Cadastrar" className="button button__primary" />
            </>
          )}
        </form>
      </div>
    </section>
  );
}
