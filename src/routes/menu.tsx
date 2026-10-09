import { createFileRoute } from '@tanstack/react-router';
import { MenuManagement } from '@/features/restaurant/admin';
import { pageHead } from '@/features/restaurant/metadata';
export const Route = createFileRoute('/menu')({
 head: () => pageHead('Menu Management', 'Manage dishes, prices, categories, and availability in your Tableflow restaurant menu.'),
 component: MenuManagement,
});
