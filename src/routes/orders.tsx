import { createFileRoute } from '@tanstack/react-router';
import { Orders } from '@/features/restaurant/orders';
import { pageHead } from '@/features/restaurant/metadata';
export const Route = createFileRoute('/orders')({
 head: () => pageHead('Order History', 'Track active and completed orders, review tickets, and export your restaurant order history.'),
 component: Orders,
});
