import UsersManagementClient from '@/components/dashboard/users/UsersManagementClient';

export const metadata = {
  title: 'المستخدمون والعملاء المسجلين | لوحة التحكم',
};

export default function DashboardUsersPage() {
  return (
    <UsersManagementClient
      initialUsers={[]}
      initialStats={
        {
          totalUsers: 0,
          adminCount: 0,
          memberCount: 0,
          activeRecentCount: 0,
        }
      }
    />
  );
}
