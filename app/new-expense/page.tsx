"use client"

import { useUser } from "../context/user";
import { useState } from "react";
import useSWR from "swr";

import styles from "../styles/pages/home.module.scss";
import stylesNewExpense from "../styles/pages/new-expense.module.scss";

import { categorys, fetcher, fetcherPost, formatCurrency, months, years } from "../utils";

import { Input } from "../components/input/input";
import { Select } from "../components/select/select";
import { Toast } from "../components/toast/toast";

import { ICard, IPeople } from "../utils/types";

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

  const { data: peopleData, error: peopleError, mutate: mutatePeole } = useSWR<IData>(`http://localhost:4000/api/peoples/${username}`, fetcher);
  const { data: cardData, error: cardError, mutate: mutateCard } = useSWR<IData>(`http://localhost:4000/api/cards/${username}`, fetcher);

  const handleFetch = () => {
    mutatePeole();
    mutateCard()
  }

  const handleToast = (error: boolean, message: string) => {
    setToastCustom({ error, message })
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2000);
  }

  const resetOptions = () => {
    setPeople("")
    setCard("")
    setCategory("")
    setItem("")
    setValue("R$ 0,00")
    setHasInstallment(false)
    setInstallments(1)
  }

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
      const response = await fetcherPost<IBody, { message: string }>(
        "http://localhost:4000/api/expenses", 
        "POST", 
        body
      );
      handleToast(true, response.message)
      resetOptions()
    } catch (err) {
      handleToast(false, (err as Error).message);
    }
  }

  if (peopleError || cardError ) {
    return (
      <div className={styles.container_home}>
        <div className={styles.container_home_error}>
          <h1>Tivemos um problema para carregar seus dados! Você pode clicar no botão abaixa e tentar novamente :)</h1>
          <button className="button" onClick={handleFetch}>Recarregar</button>
        </div>
      </div>
    )
  }

  if (!cardData?.data || !peopleData?.data) return;

  return (
    <section className={`container ${stylesNewExpense.new_expense}`}>
      {showToast && (
        <Toast message={toastCustom.message} success={toastCustom.error} />
      )}
      <div className={styles.container_home}>
        <form onSubmit={handleSubmit}>
          {!cardData.data.length ? (
            <p className={"empty"}>Você precisa cadastrar um cartão para continuar</p>
          ) : (
            <>
              <h1 className="title">Cadastre o novo gasto</h1>
              <p className="subtitle">Assim que você inserir o gasto ele irá aparecer na sua tela inicial e você conseguirá entender para onde ele está indo</p>
              <div className={stylesNewExpense.date}>
                <Select 
                  data-testid="month-select" 
                  defaultValue={month} 
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
                  defaultValue={year}
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
