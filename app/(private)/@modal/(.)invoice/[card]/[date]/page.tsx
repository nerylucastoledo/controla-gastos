import { billGet } from '@/actions/bill';
import InvoiceModal from '@/components/home/invoice-modal/invoiceModal'
import { BillDTOInputByDateAndCard } from '@/dto/billDTO';
import React from 'react'

type InvoiceProps = {
  card: string;
  date: string;
}

export default async function Invoice({ params }: { params: Promise<InvoiceProps> }) {
  const { card, date } = await params;
  
  const data: BillDTOInputByDateAndCard[] = await billGet(`expenses/${date}/${card}`)

  return (
    <InvoiceModal data={data} card={card} />
  )
}
