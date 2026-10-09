import chicken from '@/assets/chicken.jpg';
import sisig from '@/assets/sisig.jpg';
import grilled from '@/assets/grilled-chicken.jpg';
import burger from '@/assets/burger.jpg';
import fries from '@/assets/fries.jpg';
import tea from '@/assets/iced-tea.jpg';
import type { AppData, MenuItem, Order } from './model';
export const foodImages = { chicken, sisig, grilled, burger, fries, tea };
export const initialMenu: MenuItem[] = [
 {id:'chicken',name:'Crispy Chicken Meal',description:'Golden fried chicken, rice & gravy',category:'Meals',price:149,available:true,image:chicken,popular:true},
 {id:'sisig',name:'Sizzling Pork Sisig',description:'Our house favorite with steamed rice',category:'Rice Meals',price:179,available:true,image:sisig,popular:true},
 {id:'grilled',name:'Chicken Inasal',description:'Flame-grilled chicken & garlic rice',category:'Rice Meals',price:169,available:true,image:grilled},
 {id:'burger',name:'Classic Cheeseburger',description:'Beef patty, cheddar & house sauce',category:'Snacks',price:119,available:true,image:burger},
 {id:'fries',name:'Golden French Fries',description:'Crispy, lightly salted & made to share',category:'Snacks',price:69,available:true,image:fries},
 {id:'tea',name:'House Iced Tea',description:'Freshly brewed with a squeeze of lemon',category:'Drinks',price:49,available:true,image:tea},
 {id:'chicken-double',name:'2-Piece Chicken Meal',description:'Twice the crunch, rice & gravy',category:'Meals',price:229,available:true,image:chicken},
 {id:'burger-double',name:'Double Cheeseburger',description:'Two beef patties & double cheddar',category:'Snacks',price:189,available:false,image:burger},
 {id:'tea-large',name:'Large House Iced Tea',description:'Your favorite refreshment, supersized',category:'Drinks',price:69,available:true,image:tea},
];
export function createInitialData(): AppData {
 const now = Date.now();
 const make = (n: number, minutes: number, status: Order['status'], ids: string[], type: Order['type'], table: string, notes=''): Order => {
  const items = ids.flatMap(id => {const item = initialMenu.find(i=>i.id===id); return item ? [{id:item.id,name:item.name,price:item.price,quantity:1,notes:''}] : [];});
  const at = new Date(now - minutes*60000).toISOString();
  return {id:`sample-${n}`,number:`#${n}`,status,type,table,notes,items,total:items.reduce((s,i)=>s+i.price*i.quantity,0),createdAt:at,history:[{status:'new',at},...(status!=='new'?[{status,at:new Date(now-(minutes-2)*60000).toISOString()}]:[])]};
 };
 return {menu:initialMenu,orders:[make(1041,12,'preparing',['chicken','tea'],'Dine-in','04','Gravy on the side, please.'),make(1042,8,'preparing',['sisig','fries'],'Takeout',''),make(1043,5,'ready',['burger','tea'],'Dine-in','02'),make(1044,2,'new',['grilled','tea'],'Dine-in','06'),make(1045,1,'new',['chicken','fries'],'Takeout',''),make(1040,35,'completed',['chicken','tea'],'Dine-in','03')],team:[{id:'alex',name:'Alex Reyes',email:'alex@example.com',role:'Cashier',active:true},{id:'mia',name:'Mia Santos',email:'mia@example.com',role:'Kitchen',active:true},{id:'sam',name:'Sam Cruz',email:'sam@example.com',role:'Admin',active:true}]};
}
