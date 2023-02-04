// We use this rupper navigator in order to use Redux...
// And because in startUpScreen we can not navigate to the authScreen.
import React, { useEffect, useRef } from "react";
import { useSelector,useDispatch } from "react-redux";
//import { NavigationActions, createAppContainer } from "react-navigation";
import { NavigationContainer,StackActions,createNavigationContainerRef } from '@react-navigation/native';
import ShopNavigator from "./ShopNavigator";
//import * as RootNavigation from '../utils/RootNavigation';

const NavigationContainerNavigator = props => {

  
  // !! to force it to be true/false
  const isAuth = useSelector(state => !!state.auth.token);
  //const navRef = useRef();
   const navigationRef = createNavigationContainerRef()

  //  const initNavigator = (
   
  // )
  console.log("navRef===");
  console.log(navigationRef);

  console.log("props*****====");
  console.log(props);
const dispatch = useDispatch();
  // useEffect(() => {
  //   if (!isAuth) {
  //     navRef.current.dispatch(
  //       props.navigation.navigate({ routeName: "Auth" })
  //     );
  //   }
  // }, [isAuth]);

  useEffect(() => {
    console.log(isAuth);
    
    if (!isAuth) {

      console.log("entered isAuth");
      console.log(isAuth);

      console.log("navigationRef");

      console.log(navigationRef);
      console.log(navigationRef.isReady())
      //if(navRef.current){
       
        // dispatch(
        //   //RootNavigation.navigate('Auth')
        //   navigationRef.navigate('Auth')

        //   //createNavigationContainerRef.navigate({ name: "Auth" }
          
        // );
      // }else{
      //   console.log("not current======");
      // }
    }

    if (navigationRef.isReady()) {
      console.log("navigationRef isReady");
      console.log(navigationRef.current.getRootState());

      //navigationRef.dispatch();
      navigationRef.navigate("Auth");
   }
  }, [isAuth,navigationRef]);
  return (
    <NavigationContainer ref={navigationRef}>
    <ShopNavigator  />
  </NavigationContainer>
   
  );
};

export default NavigationContainerNavigator;

//const AppContainer = createAppContainer(ShopNavigator);
