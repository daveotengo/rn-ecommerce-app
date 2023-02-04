import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer ,getFocusedRouteNameFromRoute} from '@react-navigation/native';
import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import Colors from '../constants/Colours';

import AuthScreen from '../screens/user/AuthScreen';

import Home from '../screens/shop/Home';

const Stack = createStackNavigator();

function AuthNavigator() {

    console.log("AuthNavigator entered");

    return (
    //  <NavigationContainer>
      <Stack.Navigator>

         <Stack.Screen name="AuthIn"
         component={AuthScreen}
         //initialRouteName="Categories"
        options={{
            headerTintColor: 'black',
            //headerStyle: { backgroundColor: Colors.cyan },
             headerShown: false
        }}
         />

         
      </Stack.Navigator>

    );
  }


  export default AuthNavigator;