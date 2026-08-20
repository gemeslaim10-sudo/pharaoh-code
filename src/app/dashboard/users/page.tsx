import { getRegisteredUsersAction } from '@/app/actions/dashboard/users';
import UsersManagementClient from '@/components/dashboard/users/UsersManagementClient';

export const metadata = {
  title: 'المستخدمون والعملاء المسجلين | لوحة التحكم',
};

export default async function DashboardUsersPage() {
  const result = await getRegisteredUsersAction();

  return (
    <UsersManagementClient
      initialUsers={result.users || []}
      initialStats={
        result.stats || {
          totalUsers: 0,
          adminCount: 0,
          memberCount: 0,
          activeRecentCount: 0,
        }
      }
    />
  );
}
