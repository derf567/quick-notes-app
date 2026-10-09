import { createFileRoute } from "@tanstack/react-router";
import { POS } from '@/features/restaurant/pos';
import { pageHead } from '@/features/restaurant/metadata';
export const Route = createFileRoute("/")({
  head: () => pageHead('Point of Sale', 'Take restaurant orders, customize meals, and send tickets to your local Tableflow kitchen workspace.'),
  component: POS,
});
