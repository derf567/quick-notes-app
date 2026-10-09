import { createFileRoute } from '@tanstack/react-router';
import { Team } from '@/features/restaurant/admin';
import { pageHead } from '@/features/restaurant/metadata';
export const Route = createFileRoute('/team')({
 head: () => pageHead('Team Members', 'Manage local cashier, kitchen, and admin team profiles at The House Kitchen.'),
 component: Team,
});
