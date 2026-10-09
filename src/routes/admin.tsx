import { createFileRoute } from '@tanstack/react-router';
import { Admin } from '@/features/restaurant/admin';
import { pageHead } from '@/features/restaurant/metadata';
export const Route = createFileRoute('/admin')({
 head: () => pageHead('Restaurant Overview', 'Review today’s orders, kitchen activity, and completed sales at The House Kitchen.'),
 component: Admin,
});
