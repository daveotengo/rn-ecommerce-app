import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, FlatList, Button, Platform, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import Colours from '../../constants/Colours';
import * as productsActions from '../../store/actions/products';
import IoniconsHeaderButton from '../../components/UI/HeaderButton';


const UserProductsScreen = (props) => {
	const [ isLoading, setIsLoading ] = useState(false);
	const [ error, setError ] = useState(false);

	const dispatch = useDispatch();
	const userProducts = useSelector((state) => state.products.userProducts);

	useEffect(
		() => {
			if (error) {
				Alert.alert('Error occurred!', error, [ { text: 'OK' } ]);
			}
		},
		[ error ]
	);

	const editProductHandler = (id) => {
		props.navigation.navigate('EditProduct', { productId: id });
	};

	const deleteHandler = (id) => {
		Alert.alert('Delete product!', 'Are you sure you want to delete this product?', [
			{ text: 'NO', style: 'default' },
			{
				text: 'YES',
				style: 'destructive',
				onPress: async () => {
					setError(null);
					setIsLoading(true);
					try {
						//await 
						await dispatch(productsActions.deleteProduct(id));
					} catch (err) {
						setError(err.message);
					}
					setIsLoading(false);
				}
			}
		]);
	};


    useEffect(() => {
        props.navigation.setOptions({
            title: "Admin",
            headerStyle: {
                backgroundColor: Platform.OS === 'android' ? Colours.primaryColor : ''
            },

            headerTintColor: Platform.OS === 'android' ? 'white' : Colours.primaryColor,

            headerRight: () => (<HeaderButtons HeaderButtonComponent={IoniconsHeaderButton} >
                <Item title="save" iconName={Platform.OS === "ios" ? "ios-add" : "md-add"} onPress={() => {
                    //props.route.params.save()
                    props.navigation.navigate({
                        name: 'EditProduct',
                        params: {
                            productId: "none",
                           
                        }

                    });


                }} />

            </HeaderButtons>)

        });
    }, [])

	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="large" color={Colours.chocolate} />
			</View>
		);
	}
	if (!isLoading && userProducts.length === 0) {
		return (
			<View style={styles.centered}>
				<Text>No products found!</Text>
			</View>
		);
	}

	return (
		<FlatList
			data={userProducts}
			keyExtractor={(item) => item.id}
			renderItem={(itemData) => (
				<ProductItem
					image={itemData.item.imageUrl}
					title={itemData.item.title}
					price={itemData.item.price}
					onSelect={() => editProductHandler(itemData.item.id)}
				>
					<Button color={Colours.maroon} title="Edit" onPress={() => editProductHandler(itemData.item.id)} />
					<Button
						color={Colours.maroon}
						title="Delete"
						onPress={deleteHandler.bind(this, itemData.item.id)}
					/>
				</ProductItem>
			)}
		/>
	);
};

// UserProductsScreen.navigationOptions = (navData) => {
// 	return {
// 		headerTitle: 'Your Products',
// 		headerLeft: (
// 			<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
// 				<Item
// 					title="card"
// 					iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
// 					onPress={() => navData.navigation.toggleDrawer()}
// 				/>
// 			</HeaderButtons>
// 		),
// 		headerRight: (
// 			<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
// 				<Item
// 					title="card"
// 					iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
// 					onPress={() => navData.navigation.navigate('EditProduct')}
// 				/>
// 			</HeaderButtons>
// 		)
// 	};
// };

const styles = StyleSheet.create({
	centered: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default UserProductsScreen;
