import { createFileRoute } from '@tanstack/react-router';
import { Kitchen } from '@/features/restaurant/kitchen';
import { pageHead } from '@/features/restaurant/metadata';
export const Route = createFileRoute('/kitchen')({
 head: () => pageHead('Kitchen Display', 'Manage new, preparing, and ready restaurant orders in your local Tableflow kitchen workspace.'),
 component: Kitchen,
});
