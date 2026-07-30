import { getClients } from '@/app/actions/dashboard/clients';
import ClientsGrid from '@/components/services/clients/ClientsGrid';

export const revalidate = 3600;

export default async function ClientsPage() {
  const clients = await getClients();

  return <ClientsGrid clients={clients} />;
}
