export type Status = 'new' | 'preparing' | 'ready' | 'completed' | 'cancelled';
export type Role = 'Cashier' | 'Kitchen' | 'Admin';
export type MenuItem = { id: string; name: string; description: string; category: string; price: number; available: boolean; image: string; popular?: boolean };
export type CartItem = { item: MenuItem; quantity: number; notes: string };
export type OrderLine = { id: string; name: string; price: number; quantity: number; notes: string };
export type Order = { id: string; number: string; status: Status; type: 'Dine-in' | 'Takeout'; table: string; notes: string; items: OrderLine[]; total: number; createdAt: string; history: { status: Status; at: string }[] };
export type TeamMember = { id: string; name: string; email: string; role: Role; active: boolean };
export type AppData = { menu: MenuItem[]; orders: Order[]; team: TeamMember[] };
export const categories = ['All items', 'Meals', 'Rice Meals', 'Snacks', 'Drinks', 'Desserts'];
export const money = (value: number) => new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', minimumFractionDigits: 2 }).format(value);
export const time = (value: string) => new Date(value).toLocaleTimeString('en-PH', { timeZone: 'Asia/Manila', hour: '2-digit', minute: '2-digit' });
export const statusNames: Record<Status, string> = {new:'New', preparing:'Preparing', ready:'Ready', completed:'Completed', cancelled:'Cancelled'};
export function cartTotal(cart: CartItem[]) { return cart.reduce((sum, line) => sum + line.item.price * line.quantity, 0); }
export function canTransition(from: Status, to: Status) { return (from === 'new' && (to === 'preparing' || to === 'cancelled')) || (from === 'preparing' && (to === 'ready' || to === 'cancelled')) || (from === 'ready' && to === 'completed'); }
export function addToCart(cart: CartItem[], item: MenuItem): CartItem[] {
 if (!item.available) return cart;
 const found = cart.find(line => line.item.id === item.id);
 return found ? cart.map(line => line.item.id === item.id ? {...line, quantity: Math.min(99, line.quantity + 1)} : line) : [...cart, {item, quantity: 1, notes: ''}];
}
export function snapshot(cart: CartItem[]): OrderLine[] { return cart.map(({item, quantity, notes}) => ({id: item.id, name: item.name, price: item.price, quantity, notes})); }
export function transition(order: Order, status: Status, at = new Date().toISOString()): Order {
 if (!canTransition(order.status, status)) return order;
 return {...order, status, history: [...order.history, {status, at}]};
}
export function minutesWaiting(order: Order, now: number) { return Math.max(0, Math.floor((now - Date.parse(order.createdAt)) / 60000)); }
export function nextOrderNumber(orders: Order[]) { const highest = orders.reduce((max, order) => Math.max(max, Number(order.number.replace('#', '')) || 0), 1040); return `#${highest + 1}`; }
