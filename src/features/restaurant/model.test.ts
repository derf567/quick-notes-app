import {describe,it,expect} from 'vitest';
import {addToCart,canTransition,cartTotal,nextOrderNumber,snapshot,transition,money,type MenuItem,type Order} from './model';
const item:MenuItem={id:'chicken',name:'Chicken',description:'',category:'Meals',price:149,available:true,image:''};
const order:Order={id:'1',number:'#1041',status:'new',type:'Dine-in',table:'2',notes:'',items:[],total:0,createdAt:'2026-10-09T15:00:00Z',history:[]};
describe('Restaurant order rules',()=>{
 it('does not add unavailable items',()=>expect(addToCart([], {...item,available:false})).toEqual([]));
 it('calculates item price times quantity in pesos',()=>{const cart=addToCart(addToCart([],item),item);expect(cartTotal(cart)).toBe(298);expect(money(298)).toBe('₱298.00');});
 it('allows only NEW → PREPARING → READY → COMPLETED',()=>{expect(canTransition('new','preparing')).toBe(true);expect(canTransition('preparing','ready')).toBe(true);expect(canTransition('ready','completed')).toBe(true);expect(canTransition('new','ready')).toBe(false);expect(canTransition('completed','preparing')).toBe(false);});
 it('preserves cancelled orders and status history',()=>{const updated=transition(order,'cancelled','2026-10-09T15:01:00Z');expect(updated.id).toBe('1');expect(updated.history).toEqual([{status:'cancelled',at:'2026-10-09T15:01:00Z'}]);expect(canTransition('cancelled','new')).toBe(false);});
 it('retains historical names and prices after a menu edit',()=>{const cart=addToCart([],item);const lines=snapshot(cart);cart[0].item={...item,name:'New chicken',price:200};expect(lines[0].name).toBe('Chicken');expect(lines[0].price).toBe(149);});
 it('generates a new order number above all existing orders',()=>expect(nextOrderNumber([order,{...order,number:'#1045'}])).toBe('#1046'));
});
