import LoginForm from '@/app/components/login/login-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Controla gastos | Login",
  description: "Faça o login no Controla gastos para conseguir entender para onde o seu dinheiro esta indo e ter maior controle sobre ele."
}

export default function Page() {
  return (
    <>
      <h1 className="title">Bem-vindo de volta</h1>
      <p className="subtitle">Por favor, faça login na sua conta.</p>

      <LoginForm />
    </>
  )
}