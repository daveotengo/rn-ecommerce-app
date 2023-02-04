export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

import Order from '../../models/order';

import Constants from '../../constants/Constants'

export const fetchOrders = () => {

	// return {
	// 	type: SET_ORDERS,
	// 	orders: loadedOrders
	// }
	return async (dispatch, getState) => {
		const userId = getState().auth.userId;
		//const userId = "u1";

		console.log('userId', userId);
		
		try {
			const response = await fetch(`${Constants.baseUrl}/orders/${userId}.json`);

			if (!response.ok) {
				throw new Error('Something went wrong with fetching the data from the server!');
			}
			const resData = await response.json();
			const loadedOrders = [];

			for (const key in resData) {
				loadedOrders.push(
					new Order(
						key,
						resData[key].cartItems,
						resData[key].totalAmount,
						// Just resData[key].date works too, but we need to get an object (!?)
						new Date(resData[key].date),
					)
				);
			}
			dispatch({
				type: SET_ORDERS,
				orders: loadedOrders
			});
		} catch (err) {
			// sent error to custom analytics server
			throw err;
		}
	};
};

export const addOrder = (cartItems, totalAmount) => {
	

	// const date = new Date();
	// return{
	// 	type: ADD_ORDER,
	// 	orderData: {
	// 		//id: resData.name,
	// 		id: new Date().getUTCMilliseconds(),
	// 		items: cartItems,
	// 		amount: totalAmount,
	// 		date: date.toISOString()
	// 	}
	// }
	return async (dispatch, getState) => {
		const token = getState().auth.token;
		//?auth=${token}
		const userId = getState().auth.userId;
		//const userId = "u1";

		const date = new Date();
		const response = await fetch(`${Constants.baseUrl}/orders/${userId}.json?auth=${token}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				cartItems,
				totalAmount,
				date: date.toISOString()
			})
		});

        if(!response.ok) {
            throw new Error('Something went wrong with adding the order on the server!')
        }
		const resData = await response.json();
		dispatch({
			type: ADD_ORDER,
			orderData: {
				id: resData.name,
				//id: "order1",
				items: cartItems,
                amount: totalAmount,
                date: date
			}
		});
	};
};
