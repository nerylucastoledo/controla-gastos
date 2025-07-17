import CreateAccountForm from '@/components/login/create-account';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Controla gastos | Criar conta",
  description: "Crie uma conta no Controla gastos para conseguir entender para onde o seu dinheiro esta indo e ter maior controle sobre ele."
}

export default function Register() {
  return (
    <>
      <h1 className="title">Crie uma conta</h1>
      <p className="subtitle">Por favor, preencha os dados abaixo para criar sua conta.</p>

      <CreateAccountForm />
    </>
  )
}