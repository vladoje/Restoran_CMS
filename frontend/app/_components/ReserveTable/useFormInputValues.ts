import { useState } from 'react';
import { createRezervacija } from '@/app/_lib/createRezervacija';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Restoran } from '@/app/_lib/Interfaces';
export function useFormInputValues(isAdmin:boolean,restoran:Restoran) {

  const router = useRouter();

  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [table, setTable] = useState<number | null>(null);
  const [tableId, setTableId] = useState<number | null>(null);
  const [capacity, setCapacity] = useState<number | null>(null);
  const [note, setNote] = useState<string>('');

  async function RezervisiTerminFormCall(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await createRezervacija(formData);
      toast.success('Uspjesno rezervisan termin');
      if (!isAdmin) {
        router.push(`/${restoran.slug}`);
      } else {
        router.refresh();
        setDate(null);
        setTime(null);
        setTable(null);
        setTableId(null);
        setCapacity(null);
        setNote('');
      }
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        toast.error('Greška');
      }
    }
  }
  return {
    date,
    setDate,
    time,
    setTime,
    table,
    setTable,
    tableId,
    setTableId,
    capacity,
    setCapacity,
    note,
    setNote,
    RezervisiTerminFormCall,
  };
}