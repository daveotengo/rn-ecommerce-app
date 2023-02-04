import React, { useEffect,useState,useCallback } from 'react';
import { ScrollView, View, Text, StyleSheet, FlatList, Platform,Button,ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart'
import IoniconsHeaderButton from '../../components/UI/HeaderButton';
import { HeaderButton, Item, HeaderButtons } from 'react-navigation-header-buttons';
import Colors from '../../constants/Colours'
import * as productsActions from '../../store/actions/products'
import { useIsFocused } from "@react-navigation/native";


const ProductOverviewScreen = props => {
    const isFocused = useIsFocused();

    const products = useSelector(state => state.products.availableProducts);

    const [ isLoading, setIsLoading ] = useState(false);
	const [ onRefreshing, setOnRefreshing ] = useState(false);
	const [ error, setError ] = useState(false);

    const dispatch = useDispatch();


    const loadProducts = useCallback(
		async () => {

            console.log("calling loadProducts");
			// Note multiple set-states get batched together by React!
			setError(null);
			setOnRefreshing(true);
			try {
				await dispatch(productsActions.fetchProducts());
			} catch (err) {
				setError(err.message);
			}
			setOnRefreshing(false);
		},
		[ dispatch ]
	);

	// useEffect(
	// 	() => {
    //         console.log("printing loadProducts in useEffect Product Overview");
	// 		console.log(loadProducts);
	// 	},
	// 	[ loadProducts ]
	// );

    // useEffect(
	// 	() => {
	// 		const willFocusEvent = props.navigation.addListener('willFocus', loadProducts);
    //         console.log("printing willFocusEvent")

    //         console.log(willFocusEvent)
	// 		//return () => willFocusEvent.remove();
	// 	},
	// 	[ loadProducts ]
	// );

    useEffect(() => {
        console.log("called");
 
        // Call only when screen open or when back on screen 
        if(isFocused){ 
            loadProducts;
        }
    }, [props, isFocused]);

	// This is also needed to fire loadProducts initially!
	useEffect(
		() => {
			setIsLoading(true);
			loadProducts().then(() => setIsLoading(false));
		},
		[ dispatch, loadProducts ]
	);

    useEffect(() => {
        props.navigation.setOptions({
            title: "All Products",
            headerStyle: {
                backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
            },

            headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,

            headerRight: () => (<HeaderButtons HeaderButtonComponent={IoniconsHeaderButton} >
                <Item title="save" iconName={Platform.OS === "ios" ? "ios-cart" : "md-cart"} onPress={() => {
                    //props.route.params.save()
                    props.navigation.navigate({
                        name: 'Cart',
                        // params: {
                        //     mealId: itemData.item.id,
                        //     mealTitle: itemData.item.title,
                        //     isFav: isFavorite
                        // }

                    });


                }} />

            </HeaderButtons>)

        });
    }, []);

    const selectItemHandler = (id, title) => {
		props.navigation.navigate('ProductDetail', {
			productId: id,
			productTitle: title
		});
	};

    if (error) {
		return (
			<View style={styles.centered}>
				<Text>An error occurred!</Text>
				<Button title="Try again" onPress={loadProducts} color={Colors.chocolate} />
			</View>
		);
	}

	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="large" color={Colors.chocolate} />
			</View>
		);
	}

	if (!isLoading && products.length === 0) {
		return (
			<View style={styles.centered}>
				<Text>No products found!</Text>
			</View>
		);
	}
    console.log("++++loadProducts++++");

    console.log(loadProducts);

    return (
        //props.route.key
        <FlatList
        	onRefresh={loadProducts}
            data={products}
        	refreshing={onRefreshing}
            keyExtractor={item => item.id}
            renderItem={itemData => <ProductItem
                image={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}

                onSelect={() => selectItemHandler(itemData.item.id, itemData.item.title)}

                  >

                <Button
                    color={Colors.maroon}
                    title="View Details"
                    onPress={() => selectItemHandler(itemData.item.id, itemData.item.title)}
                />
                <Button
                    color={Colors.maroon}
                    title="To Cart"
                    onPress={() => dispatch(cartActions.addToCart(itemData.item))}
                />

            </ProductItem>}

        />

    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default ProductOverviewScreen;