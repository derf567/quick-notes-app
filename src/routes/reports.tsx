import { createFileRoute } from '@tanstack/react-router';
import { Reports } from '@/features/restaurant/admin';
import { pageHead } from '@/features/restaurant/metadata';
export const Route = createFileRoute('/reports')({
 head: () => pageHead('Service and Sales Reports', 'Review completed sales, best-selling dishes, and preparation times in your Tableflow workspace.'),
 component: Reports,
});
