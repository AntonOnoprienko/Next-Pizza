import dynamic from 'next/dynamic';
import { NotificationToastSkeleton } from '../shared/notification-toast-skeleton';

type Props = {
  notification: string;
  isLoading: boolean;
  success: boolean;
  error?: boolean;
  className?: string;
};

const DynamicNotificationToastComponent = dynamic(
  () =>
    import('../shared/notification-toast').then((mod) => mod.NotificationToast),
  {
    ssr: false,
    loading: () => <NotificationToastSkeleton />,
  },
);

export const DynamicNotificationToast: React.FC<Props> = (props) => {
  return <DynamicNotificationToastComponent {...props} />;
};
