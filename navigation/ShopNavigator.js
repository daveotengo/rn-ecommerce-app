import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import Colors from '../constants/Colours';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import ShopDrawer from '../navigation/ShopDrawer';
import OrderScreen from '../screens/shop/OrderScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import AuthNavigator from '../navigation/AuthNavigator';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import StartUpScreen from '../screens/StartUpScreen';


import Home from '../screens/shop/Home';

const Stack = createStackNavigator();

function ShopNavigator() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = useSelector((state) => state.auth.token);
  
  console.log("printing token");
  console.log(token);
  // if(token!=null){
  //   setIsLoggedIn(true)
  // }

  return (
    //  <NavigationContainer>
    <Stack.Navigator>
      {/* {token==null ? ( */}
        <Stack.Group>

        <Stack.Screen name="StartUp"
          component={StartUpScreen}
          //initialRouteName="ShopDrawer"
          options={{
            headerTintColor: 'black',
            //headerStyle: { backgroundColor: Colors.cyan },
            headerShown: false,

          }}
        />

        <Stack.Screen name="Auth"
          component={AuthNavigator}
          //initialRouteName="ShopDrawer"
          options={{
            headerTintColor: 'black',
            //headerStyle: { backgroundColor: Colors.cyan },
            headerShown: false,

          }}
        />

        


{/* <Stack.Screen name="Shop"
  component={ShopDrawer}
  //initialRouteName="ShopDrawer"
  options={{
    headerTintColor: 'black',
    //headerStyle: { backgroundColor: Colors.cyan },
    headerShown: false,

  }}
/> */}
</Stack.Group>
      {/* ) :
        ( */}
          <Stack.Group>

             <Stack.Screen name="Shop"
              component={ShopDrawer}
              //initialRouteName="ShopDrawer"
              options={{
                headerTintColor: 'black',
                //headerStyle: { backgroundColor: Colors.cyan },
                headerShown: false,

              }}
            /> 



            <Stack.Screen name="Order"
              component={OrderScreen}
              //initialRouteName="Categories"
              options={{
                headerTintColor: 'black',
                // headerStyle: { backgroundColor: Colors.cyan },
                //headerShown: false
              }}
            />


            <Stack.Screen name="EditProduct"
              component={EditProductScreen}
              //initialRouteName="Categories"
              options={{
                headerTintColor: 'black',
                // headerStyle: { backgroundColor: Colors.cyan },
                //headerShown: false
              }}
            />


            <Stack.Screen name="ProductDetail"
              component={ProductDetailScreen}
              //initialRouteName="ProductDetail"
              options={{
                headerTintColor: 'black',
                //headerStyle: { backgroundColor: Colors.cyan },
              }}
            />

            <Stack.Screen name="Cart"
              component={CartScreen}
              //initialRouteName="Cart*"
              options={{
                headerTintColor: Colors.primaryColor,
                //headerStyle: { backgroundColor: Colors.cyan },
              }}
            />

          </Stack.Group>
        {/* )} */}



      <Stack.Group screenOptions={{ presentation: 'modal' }}>

        <Stack.Screen name="ProductOverview"
          component={ProductOverviewScreen}
          //initialRouteName="Categories"
          options={{
            headerTintColor: 'black',
            //headerStyle: { backgroundColor: Colors.cyan },
            //headerShown: false
          }}
        />


      </Stack.Group>

    </Stack.Navigator>

  );
}


export default ShopNavigator;