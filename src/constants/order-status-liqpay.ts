import { OrderStatus } from '@prisma/client';

export function mapLiqpayStatus(status: string): OrderStatus {
  switch (status) {
    case 'success':
    case 'subscribed':
    case 'sandbox':
      return 'SUCCEEDED';

    case 'failure':
    case 'error':
    case 'unsubscribed':
    case 'reversed':
      return 'CANCELLED';

    case 'wait_accept':
      return 'PENDING';

    default:
      return 'CANCELLED';
  }
}
