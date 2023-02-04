import React from 'react';
import { DrawerContentScrollView, DrawerContentComponentProps, DrawerItem } from '@react-navigation/drawer';
import { Text, View } from 'react-native';
import OrderScreen  from '../screens/shop/OrderScreen';
//import ProductOverviewScreen  from '../screens/shop/ProductOverviewScreen';


const DrawerContent = props => {
  const { navigation } = props;
// console.log("printing props drawer content");
// console.log(props);
  const goTo = screen => {
    navigation.navigate(screen);
  };

  return (
    <DrawerContentScrollView {...props}>
      <Text>Menu</Text>
      <View>

      {/* <DrawerItem
          label="Home"
          onPress={() => {
            goTo('home');
          }}
        /> */}

         <DrawerItem
          label="Home"
          onPress={() => {
            goTo('ProductOverview');
          }}
        /> 
        <DrawerItem
          label="Order"
          onPress={() => {
            goTo('Order');
          }}
        />
        {/* <DrawerItem
          label="Pickups"
          onPress={() => {
            goTo('pickups');
          }}
        />
        <DrawerItem
          label="Deliveries"
          onPress={() => {
            goTo('deliveries');
          }}
        /> */}
      </View>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;