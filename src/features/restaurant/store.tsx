import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { toast } from 'sonner';
import { createInitialData, initialMenu } from './data';
import { addToCart, cartTotal, nextOrderNumber, snapshot, transition, type AppData, type CartItem, type MenuItem, type Order, type Role, type Status, type TeamMember } from './model';
const KEY='tableflow.frontend.v1';
type Store = { data:AppData; cart:CartItem[]; role:Role; setRole:(role:Role)=>void; hydrated:boolean; add:(item:MenuItem)=>void; quantity:(id:string,delta:number)=>void; itemNotes:(id:string,notes:string)=>void; clearCart:()=>void; submit:(type:Order['type'],table:string,notes:string)=>Order|null; updateStatus:(id:string,status:Status)=>void; saveMenu:(item:MenuItem)=>void; saveMember:(member:TeamMember)=>void; reset:()=>void; now:number };
const Context=createContext<Store|null>(null);
export function RestaurantProvider({children}:{children:ReactNode}) {
 const [data,setData]=useState<AppData>({menu:initialMenu,orders:[],team:[]});
 const [cart,setCart]=useState<CartItem[]>([]);
 const [role,setRole]=useState<Role>('Cashier');
 const [hydrated,setHydrated]=useState(false);
 const [now,setNow]=useState(0);
 const submitLock=useRef(false);
 useEffect(()=>{
  let initial=createInitialData();
  try {const stored=localStorage.getItem(KEY); if(stored) {const parsed=JSON.parse(stored); if(Array.isArray(parsed.menu)&&Array.isArray(parsed.orders)&&Array.isArray(parsed.team)) initial=parsed;}} catch {toast.error('Saved data could not be read. Sample orders have been restored.');}
  setData(initial); setNow(Date.now()); setHydrated(true);
  const interval=setInterval(()=>setNow(Date.now()),1000);
  const sync=(event:StorageEvent)=>{if(event.key!==KEY||!event.newValue)return; try{const updated=JSON.parse(event.newValue) as AppData;setData(previous=>{updated.orders.forEach(order=>{if(order.status==='ready'&&previous.orders.find(i=>i.id===order.id)?.status!=='ready')toast.success(`Order ${order.number} is ready to serve`);});return updated;});}catch{/* Ignore invalid external storage. */}};
  window.addEventListener('storage',sync);
  return()=>{clearInterval(interval);window.removeEventListener('storage',sync);};
 },[]);
 useEffect(()=>{if(!hydrated)return;try{localStorage.setItem(KEY,JSON.stringify(data));}catch{toast.error('Browser storage is full. Keep this tab open to preserve your orders.');}},[data,hydrated]);
 const add=(item:MenuItem)=>{setCart(previous=>addToCart(previous,item));};
 const quantity=(id:string,delta:number)=>setCart(previous=>previous.map(line=>line.item.id===id?{...line,quantity:Math.min(99,line.quantity+delta)}:line).filter(line=>line.quantity>0));
 const itemNotes=(id:string,notes:string)=>setCart(previous=>previous.map(line=>line.item.id===id?{...line,notes}:line));
 const clearCart=()=>{setCart([]);submitLock.current=false;};
 const submit=(type:Order['type'],table:string,notes:string):Order|null=>{
  if(submitLock.current||cart.length===0)return null;
  if(cart.some(line=>!data.menu.find(item=>item.id===line.item.id)?.available)){toast.error('An item is no longer available. Remove it before submitting.');return null;}
  submitLock.current=true;
  const at=new Date().toISOString();
  const order:Order={id:crypto.randomUUID(),number:nextOrderNumber(data.orders),status:'new',type,table:type==='Dine-in'?table:'',notes,items:snapshot(cart),total:cartTotal(cart),createdAt:at,history:[{status:'new',at}]};
  setData(previous=>({...previous,orders:[order,...previous.orders]}));setCart([]);
  toast.success(`Order ${order.number} sent to the kitchen`);
  queueMicrotask(()=>{submitLock.current=false;});
  return order;
 };
 const updateStatus=(id:string,status:Status)=>{const order=data.orders.find(o=>o.id===id);if(!order)return;const updated=transition(order,status);if(updated===order){toast.error('That status change is not allowed.');return;}setData(previous=>({...previous,orders:previous.orders.map(o=>o.id===id?updated:o)}));toast.success(status==='ready'?`Order ${order.number} is ready to serve`:`Order ${order.number} marked ${status}`);};
 const saveMenu=(item:MenuItem)=>{setData(previous=>({...previous,menu:previous.menu.some(i=>i.id===item.id)?previous.menu.map(i=>i.id===item.id?item:i):[...previous.menu,item]}));};
 const saveMember=(member:TeamMember)=>setData(previous=>({...previous,team:previous.team.some(i=>i.id===member.id)?previous.team.map(i=>i.id===member.id?member:i):[...previous.team,member]}));
 const reset=()=>{setData(createInitialData());setCart([]);toast.success('Sample workspace restored');};
 return <Context.Provider value={{data,cart,role,setRole,hydrated,add,quantity,itemNotes,clearCart,submit,updateStatus,saveMenu,saveMember,reset,now}}>{children}</Context.Provider>;
}
export function useRestaurant(){const store=useContext(Context);if(!store)throw new Error('RestaurantProvider is required');return store;}
