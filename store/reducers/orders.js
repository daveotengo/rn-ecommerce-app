import { ADD_ORDER, SET_ORDERS } from '../actions/orders';
import Order from '../../models/order';

const initialState = {
	orders: []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_ORDERS:
			console.log("printing action.order");
			console.log(action.orders);
			return {
				orders: action.orders
			};
		case ADD_ORDER:
			console.log("printing action.order");
			console.log(action.orderData);
			const newOrder = new Order(
				action.orderData.id,
				action.orderData.items,
				action.orderData.amount,
				action.orderData.date
			);
			
			console.log("printing newOrder");

			console.log(newOrder);

			return {
				...state,
				orders: state.orders.concat(newOrder)
			};
	}

	return state;
};
