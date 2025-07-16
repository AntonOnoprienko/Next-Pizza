import { prisma } from '@/prisma/prisma-client';
import { ProfileForm } from '@/src/components/shared';
import { getUserSession } from '@/src/lib';
import { redirect } from 'next/navigation';

const ProfilePage = async () => {
  const session = await getUserSession();
  if (!session) {
    return redirect('/not-auth');
  }
  const user = await prisma.user.findUnique({
    where: {
      id: Number(session?.id),
    },
  });

  if (!user) {
    return redirect('/not-found');
  }

  return <ProfileForm data={user} />;
};

export default ProfilePage;
