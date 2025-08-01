import LoginForm from '@/components/login/login-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Controla gastos | Login",
  description: "Faça o login no Controla gastos para conseguir entender para onde o seu dinheiro esta indo e ter maior controle sobre ele."
}

export default function Page() {
  return (
    <>
      <h1 className="title">Controla gastos</h1>
      <p className="subtitle">Gerencie suas finanças com inteligência</p>

      <LoginForm />
    </>
  )
}