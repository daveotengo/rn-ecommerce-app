
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colours';
import * as cartActions from '../../store/actions/cart';
const ProductDetailScreen = props => {
    console.log("printing props ProductDetailScreen");
    console.log(props);

    const productId = props.route.params.productId;
    const selectedProduct = useSelector((state) => state.products.availableProducts.find(prod => prod.id === productId));
    console.log("printing productId");
    console.log(productId);

    console.log("printing selectedProduct");
    console.log(selectedProduct);

    
    useEffect(() => {
        props.navigation.setOptions({
            title: selectedProduct.title,
            // headerStyle: {
            //     backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : 'white'
            // },

            headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,

        });
    }, [selectedProduct.title])
    const dispatch = useDispatch();

    return (
        // <View style={styles.screen} >
        //     <Text>{selectedProduct.title}</Text>
        // </View>

        <ScrollView>
            <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
            <View style={styles.actions}>
                <Button
                    color={Colors.maroon}
                    title="Add to Cart"
                    onPress={
                        //() => console.log(selectedProduct)
                        () => {dispatch(cartActions.addToCart(selectedProduct))}
                    }

                />
            </View>
            <Text style={styles.title}>{selectedProduct.title}</Text>
            <Text style={styles.price}>${selectedProduct.price}</Text>
            <Text style={styles.desc}>{selectedProduct.description}</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },


    image: {
        width: '100%',
        height: 300
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center' // So the button does not stretch in android.
        // width: '40%'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,

        textAlign: 'center',
        marginVertical: 2

    },

    price: {
        fontFamily: 'open-sans',
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20
    },
    desc: {
        fontFamily: 'open-sans',
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20
    }
});

export default ProductDetailScreen;