import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer ,getFocusedRouteNameFromRoute} from '@react-navigation/native';
import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import Colors from '../constants/Colours';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'

const Stack = createStackNavigator();

function ShopNavigator() {
    return (
      <NavigationContainer>
      <Stack.Navigator>
    
        <Stack.Screen name="ProductOverview"
         component={ProductOverviewScreen}
         initialRouteName="Categories"
        options={{
            headerTintColor: 'black',
            headerStyle: { backgroundColor: Colors.cyan },
        }}
         />

        <Stack.Screen name="ProductDetail"
         component={ProductDetailScreen}
         initialRouteName="ProductDetail"
        options={{
            headerTintColor: 'black',
            headerStyle: { backgroundColor: Colors.cyan },
        }}
         />
      </Stack.Navigator>
  
      </NavigationContainer>
    );
  }


  export default ShopNavigator;