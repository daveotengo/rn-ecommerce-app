import React, { useState, useEffect, useCallback, useReducer } from "react";
import {
  View,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  Alert
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import CustomHeaderButton from "../../components/UI/HeaderButton";
import * as productsActions from "../../store/actions/products";
import Input from "../../components/UI/Input";
import Colours from "../../constants/Colours";
import { useIsFocused } from "@react-navigation/native";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  console.log("printing action-value");
  console.log(action.value);
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const EditProductScreen = props => {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const prodId = props.route.params.productId;
  const editedProduct = useSelector(state =>
    state.products.userProducts.find(prod => prod.id === prodId)
  );

  console.log("=====editedProduct=====");
  console.log(editedProduct);

  const dispatch = useDispatch();

  const state = {
    inputValues: {
      title: editedProduct ? editedProduct.title : "",
      imageUrl: editedProduct ? editedProduct.imageUrl : "",
      description: editedProduct ? editedProduct.description : "",
      price:""
      //price: editedProduct ? editedProduct.price : "",
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false
    },
    formIsValid: editedProduct ? true : false
  };
  const [formState, dispatchFormState] = useReducer(formReducer, state);
  const isFocused = useIsFocused();


    
  const submitHandler = useCallback(async () => {
    // if (!formState.formIsValid) {
    //   Alert.alert("Wrong input!", "Please check the errors in the form.", [
    //     { text: "Okay" }
    //   ]);
    //   return;
    // }
    setError(null);
    setIsLoading(true);
    try {

      console.log("values from form");
      console.log(formState.inputValues.title);
      console.log(formState.inputValues.description);
      console.log(formState.inputValues.imageUrl);
      console.log(+formState.inputValues.price);

      if (editedProduct) {
        console.log("editing product");
       
        console.log(formState.inputValues.prodId);

       await dispatch(
          productsActions.updateProduct(
           prodId,
           formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl,
            //+formState.inputValues.price

          )
        );
      } else {
        
        console.log("add product");

        await dispatch(
          productsActions.createProduct(
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl,
            +formState.inputValues.price
          )
        );
      }
      props.navigation.goBack();
    } catch (err) {
      console.log("print err")
      console.log(err);
      setError(err.message);
    }
    setIsLoading(false);
  }, [prodId, formState,editedProduct,dispatch]);

  // const getInitiate = async () => {
  //   submitHandler
  // } 

  useEffect(() => {
    //if(isFocused){ 
      props.navigation.setParams({ submit: submitHandler });
    //}
  }, [submitHandler]);
  // const [imageUrl, setImageUrl] = useState(
  //   editedProduct ? editedProduct.imageUrl : "",
  // );

  // const [title, setTitle] = useState(
  //   editedProduct ? editedProduct.title : "",
  // );

  // const [price, setPrice] = useState(
  //    "",
  // );

  // const [description, setDescription] = useState(
  //   editedProduct ? editedProduct.description : "",
  // );
  


  // useEffect(
  // 	() => {
  // 		const willFocusEvent = props.navigation.addListener('willFocus', submitHandler);
  // 		return () => willFocusEvent.remove();
  // 	},
  // 	[ submitHandler ]
  // );

  useEffect(() => {
    console.log("printing props__");
    console.log(props);
    console.log(props.route.params);
    //const submitFn =props.route.params.submit;
    //const submitFn = navData.navigation.getParam("submit");
    props.navigation.setOptions({
      headerTitle: prodId==="none"
        ? "Add Product"
        : "Edit Product",
        headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Save"
            iconName={
              Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
            }
            onPress={()=>{
               if(props.route.params!=undefined){
                        props.route.params.submit()
                    }
            }}
          />
        </HeaderButtons>
      )
    });
   
  }, [props.route.params])

  useEffect(() => {
    if (error) {
      Alert.alert("Error occurred!", error, [{ text: "OK" }]);
    }
  }, [error]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      console.log("printing inputValue");

      console.log(inputValue);
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colours.chocolate} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            label="Title"
            errorText="Please enter a valid title!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler
             
              //text=>setTitle(text)
              }
            //onTextChange={text=>setTitle(text)}
            //value={title}
            //editable={true}
            
            initialValue={editedProduct ? editedProduct.title : ""}
            initiallyValid={!!editedProduct}
            required
          />
          <Input
            id="imageUrl"
            label="Image Url"
            errorText="Please enter a valid image url!"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}

            
            initialValue={editedProduct ? editedProduct.imageUrl : ""}

          //  onChangeText={(text)=>{
             
          //   console.log(text)
          //    }}
          //   value={"imageUrl"}

            initiallyValid={!!editedProduct}
            required
          />
          {editedProduct ? null : (
            <Input
              id="price"
              label="Price"
              errorText="Please enter a valid price!"
              keyboardType="decimal-pad"
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              // initialValue={editedProduct ? editedProduct.price : ""}
              // initiallyValid={!!editedProduct}

              //onTextChange={text=>setPrice(text)}
              required
              min={0.1}
            />
           )} 
          <Input
            id="description"
            label="Description"
            errorText="Please enter a valid description!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.description : ""}

            //onTextChange={text=>setDescription(text)}
            //value={description}
            initiallyValid={!!editedProduct}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// EditProductScreen.navigationOptions = navData => {
//   const submitFn = navData.navigation.getParam("submit");
//   return {
//     headerTitle: navData.navigation.getParam("productId")
//       ? "Edit Product"
//       : "Add Product",
//     headerRight: (
//       <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
//         <Item
//           title="Save"
//           iconName={
//             Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
//           }
//           onPress={submitFn}
//         />
//       </HeaderButtons>
//     )
//   };
// };

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default EditProductScreen;
