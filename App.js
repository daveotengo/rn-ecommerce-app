import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button,LogBox ,YellowBox} from 'react-native';
import {createStore,combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import productReducer from './store/reducers/products';
import ShopNavigator from './navigation/ShopNavigator';
//import AppLoading  from 'expo-app-loading';
import * as Font from 'expo-font';
import React, {useState,useEffect,useCallback,createRef} from 'react';
import * as SplashScreen from 'expo-splash-screen';
import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/orders';
import ShopDrawer from './navigation/ShopDrawer';
//import { NavigationContainer } from '@react-navigation/native';
import ReduxThunk from 'redux-thunk';
import authReducer from './store/reducers/auth';
import StartUpScreen from './screens/StartUpScreen';
import NavigationContainerNavigator from './navigation/NavigationContainer';


const rootReducer=combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer,
});

const store = createStore(rootReducer,applyMiddleware(ReduxThunk));

const fetchFonts = () => {
	return Font.loadAsync({
		'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
		'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
	});
};
export default function App() {

  // const [ fontLoaded, setFontLoaded ] = useState(false);
	// if (!fontLoaded) {
	// 	return <AppLoading startAsync={fetchFonts} 
  //   onFinish={() => setFontLoaded(true)}
  //   onError={(error)=> console.warn(error)}
    
  //    />;
	// }

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        await fetchFonts();
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  const containerRef = createRef();
  //ref={containerRef}

  //LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  //LogBox.ignoreAllLogs();//Ignore all log notifications
  LogBox.ignoreLogs(['Sending...']);
  LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);
  // YellowBox.ignoreWarnings([
  //   // See: https://github.com/react-navigation/react-navigation/issues/7839
  //   'Sending \`onAnimatedValueUpdate\` with no listeners registered.',
  // ]);
  
  return (
    <Provider store={store}>
    <View style={styles.container} onLayout={onLayoutRootView}>
    <NavigationContainerNavigator />
     {/* <ShopNavigator/>  */}
   {/* <ShopDrawer />  */}

   
  
    </View>
     
  
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   
  },
});
