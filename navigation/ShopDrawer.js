import { createDrawerNavigator,DrawerItem,DrawerContentScrollView,DrawerItemList } from '@react-navigation/drawer';
//import FavoritesScreen from '../screens/FavoritesScreen';
import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
//import ShopNavigator from '../navigation/ShopNavigator'
import OrderScreen  from '../screens/shop/OrderScreen';
import CartScreen  from '../screens/shop/CartScreen';
import DrawerContent from '../navigation/DrawerContent'
import UserProductsScreen  from '../screens/user/UserProductsScreen';
import * as authActions from '../store/actions/auth'

import {Fragment} from 'react'
import { useSelector, useDispatch } from 'react-redux';

//import { NavigationContainer } from '@react-navigation/native';

function ShopDrawer() {

  const dispatch = useDispatch();
const Drawer = createDrawerNavigator();
const logoutHandler = (props) => {
  dispatch(authActions.logout());
  props.navigation.navigate("Auth");
}
  //const dispatch = useDispatch();
  return (
    //  <NavigationContainer>
    <Drawer.Navigator
    //  screenOptions={{
    //     headerShown: false,
    //   }}
      //drawerContent={DrawerContent}

      drawerContent={props => {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem label="Logout" 
        onPress={() => logoutHandler(props)}
       
         />
      </DrawerContentScrollView>
    )
  }}
    >


{/* <Drawer.Screen name="MyStack" component={MyStack} /> */}
  {/* <Drawer.Screen name="ShopNavigator" component={ShopNavigator}
//options={{ headerShown: false }}
 />   */}
      <Drawer.Screen name="ProductOverview" component={ProductOverviewScreen} /> 

      <Drawer.Screen name="OrderScreen" component={OrderScreen} /> 

      <Drawer.Screen name="UserProductsScreen" component={UserProductsScreen} /> 

     

    
    </Drawer.Navigator>
  );
}

export default ShopDrawer;