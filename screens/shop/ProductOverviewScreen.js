import React from 'react';
import {ScrollView,View,Text,StyleSheet,FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';


const ProductOverviewScreen = props => {
    const products = useSelector( state => state.products.availableProducts);

    return(
       
        <FlatList data={products} 
        keyExtractor={item => item.id} 
        renderItem={itemData => <ProductItem 
        image={itemData.item.imageUrl} 
        title={itemData.item.title} 
        price={itemData.item.price} 
        onViewDetail={()=>{
            props.navigation.navigate({name: 'ProductDetail',
             params:{productId: itemData.item.id}}
             )
            
        }} 
        onAddToCart={()=>{}}  />}

        />
       
    );
}

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default ProductOverviewScreen;