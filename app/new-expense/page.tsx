"use client"

import styles from "../styles/pages/home.module.scss";
import stylesNewExpense from "../styles/pages/new-expense.module.scss";

import { IoFastFoodOutline } from 'react-icons/io5'

import { categorys, fetcher, fetcherPost, formatCurrency, months, years } from "../utils";

import { Input } from "../components/input/input";
import { Select } from "../components/select/select";
import Link from "next/link";
import useSWR from "swr";
import { useUser } from "../context/user";
import { useState } from "react";
import Toast from "../components/toast/toast";
import LoadingNewExpense from "./loading";

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

interface NewExpense {
  username: string;
  date: string;
  people: string;
  category: string;
  value: string;
  item: string;
  card: string;
  installments: number;
}

export default function NewExpense() {
  const [month, setMonth] = useState(months[new Date().getMonth()]);
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const { username } = useUser();
  const [people, setPeople] = useState("");
  const [card, setCard] = useState("");
  const [category, setCategory] = useState("");
  const [value, setValue] = useState("R$ 0,00");
  const [item, setItem] = useState("")
  const [hasInstallment, setHasInstallment] = useState(false);
  const [installments, setInstallments] = useState(1)
  const [toastCustom, setToastCustom] = useState({ error: true, message: ""});
  const [showToast, setShowToast] = useState(false);

  const { data: peopleData, error: peopleError, isLoading: isLoadingPeople, mutate: mutatePeole } = useSWR<People[]>(`http://localhost:4000/api/peoples/${username}`, fetcher);
  const { data: cardData, error: cardError, isLoading: isLoadingCard, mutate: mutateCard } = useSWR<Card[]>(`http://localhost:4000/api/cards/${username}`, fetcher);

  const handleFetch = () => {
    mutatePeole();
    mutateCard()
  }

  const handleToast = (error: boolean, message: string) => {
    console.log("chamei toast")
    setToastCustom({ error, message })
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2000);
  }

  const resetOptions = () => {
    setPeople("")
    setCard("")
    setCategory("")
    setValue("")
    setHasInstallment(false)
    setInstallments(1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const body = {
        username,
        "date": `${month}${year}`,
        people,
        category,
        value, 
        item, 
        card, 
        installments
      }
      const response = await fetcherPost<NewExpense, { message: string }>(
        "http://localhost:4000/api/expensases", 
        "POST", 
        body
      );
      handleToast(true, response.message)
      resetOptions()
    } catch (err) {
      handleToast(false, (err as Error).message);
    }
  }

  if (isLoadingPeople && isLoadingCard) return <LoadingNewExpense />;

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

  console.log(peopleData, cardData)

  return (
    <section className={`container ${stylesNewExpense.new_expense}`}>
      {showToast && (
        <Toast success={toastCustom.error} message={toastCustom.message} />
      )}
      <div className={styles.container_home}>
        <Link href={"/"}>
					<IoFastFoodOutline size={60}/>
				</Link>

        <form onSubmit={handleSubmit}>
          {!cardData.length ? (
            <p className={"empty"}>Você precisa cadastrar um cartão para continuar</p>
          ) : (
            <>
              <h1>Cadastre o novo gasto</h1>
              <p>Assim que você inserir o gasto ele irá aparecer na sua tela inicial e você conseguirá entender para onde ele está indo</p>
              <div className={stylesNewExpense.date}>
                <Select 
                  label={"mês"} 
                  id={"month"}
                  data-testid="month-select" 
                  defaultValue={month} 
                  onChange={({ target }) => setMonth(target.value)}
                >
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month === "Marco" ? "Março" : month}
                    </option>
                  ))}
                </Select>

                <Select 
                  label={"ano"} 
                  id={"year"}
                  data-testid="year-select" 
                  defaultValue={year}
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
                id='people' 
                label='pessoa' 
                className={"modal-form__select"}
                data-testid="people-select" 
                value={people}
                onChange={({ target }) => setPeople(target.value)}
                required
              >
                <option value={""} disabled>Selecione a pessoa</option>
                <option value={"Eu"}>Eu</option>
                {peopleData.length && peopleData.map((people) => (
                  <option key={people.name} value={people.name}>
                      {people.name}
                  </option>
                ))}
              </Select>

              <Select
                id='card' 
                label='cartão' 
                className={"modal-form__select"}
                data-testid="card-select" 
                value={card}
                onChange={({ target }) => setCard(target.value)}
                required
              >
                <option value={""} disabled>Selecione o cartão</option>
                {cardData.length && cardData.map((card) => (
                  <option key={card.name} value={card.name}>
                    {card.name}
                  </option>
                ))}
              </Select>

              <Select 
                id='category' 
                label='Categoria' 
                className={"modal-form__select"}
                data-testid="category-select" 
                value={category}
                onChange={({ target }) => setCategory(target.value)}
                required
              >
                <option value={""} disabled>Selecione a categoria</option>
                {categorys.map((category) => <option key={category} value={category}>{category}</option>)}
              </Select>

              <Input
                label="Digite o  item"
                placeholder="Insira o texto aqui"
                type="text" 
                name="item"
                data-testid="item"
                value={item}
                onChange={({ target }) => setItem(target.value)}
                required
              />

              <Input
                label="Digite o valor (R$)"
                type="text" 
                name="value"
                data-testid="value"
                value={value}
                onChange={({ currentTarget }) => setValue(formatCurrency(currentTarget.value))}
                required
              />

              <div className={`form-control ${stylesNewExpense.checkbox}`}>
                <Input
                  label="Compra possui parcelas?"
                  type="checkbox" 
                  name="has-installment"
                  data-testid="has-installment"
                  onChange={() => setHasInstallment(!hasInstallment)}
                />
              </div>

              {hasInstallment && (
                <Input
                  label="Quantidade"
                  type="number" 
                  name="installment"
                  data-testid="installment"
                  value={installments}
                  onChange={({ currentTarget }) => setInstallments(Number(currentTarget.value))}
                  required
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
