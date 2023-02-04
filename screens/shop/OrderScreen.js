import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, Platform, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';
import Colours from '../../constants/Colours';
import * as ordersActions from '../../store/actions/orders';

const OrdersScreen = (props) => {
	const [ isLoading, setIsLoading ] = useState(false);
	const dispatch = useDispatch();
	const orders = useSelector((state) => state.orders.orders);

	// const fetchOrders = async () => {
	// 	setIsLoading(true);
	// 	await dispatch(ordersActions.fetchOrders());
	// 	setIsLoading(false);
	// };

	useEffect(() => {
		setIsLoading(true);
		dispatch(ordersActions.fetchOrders()).then(() => {
		  setIsLoading(false);
		});
	  }, [dispatch]);


	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="large" color={Colours.chocolate} />
			</View>
		);
	}

	if (!isLoading && orders.length === 0) {
		return (
			<View style={styles.centered}>
				<Text>No orders found!</Text>
			</View>
		);
	}

	return (
		<FlatList
			data={orders}
			keyExtractor={(item) => item.id}
			renderItem={(itemData) => {
				return (
					<OrderItem
						amount={itemData.item.totalAmount}
						date={itemData.item.readableDate}
						items={itemData.item.items} // for the OrderItem
					/>
				);
			}}
		/>
	);
};

OrdersScreen.navigationOptions = (navData) => {
	return {
		headerTitle: 'Your Orders',
		headerLeft: (
			<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
				<Item
					title="card"
					iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
					onPress={() => navData.navigation.toggleDrawer()}
				/>
			</HeaderButtons>
		)
	};
};

const styles = StyleSheet.create({
	centered: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default OrdersScreen;
