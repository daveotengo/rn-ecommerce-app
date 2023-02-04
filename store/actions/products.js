import firebase from "../../firebase/firebase";
import Product from "../../models/product";
import Constants from '../../constants/Constants';

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
  console.log("calling fetch product api")
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;

    //const userId = "u1";
    try {
      const response = await fetch(
        `${Constants.baseUrl}/products.json`
      );

      if (!response.ok) {
        throw new Error(
          "Something went wrong with fetching the data from the server!"
        );
      }
      const resData = await response.json();

      console.log(resData);

      const loadedProducts = [];

      for (const key in resData) {
        console.log("===key===");
        console.log(key);

        console.log(resData[key].title);
        loadedProducts.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }
      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
        userProducts: loadedProducts.filter(prod => prod.ownerId === userId)
      });
    } catch (err) {
      console.log("printing  err response");

      console.log(err);
      // sent error to custom analytics server
      throw err;
    }
  };
};

export const deleteProduct = productId => {

  console.log("calling deleteProduct");

  console.log("printing productId");

  console.log( productId);

  // return {
  //   type: DELETE_PRODUCT,
  //   pid: productId
  // }
  return async (dispatch, getState) => {
    console.log("delete product dispatched");
    //const token = getState().auth.token;
    //?auth=${token}
    const response = await fetch(
      `${Constants.baseUrl}/${productId}.json`,
      {
        method: "DELETE"
      }
    );

    console.log("printing delete response from products actions ");
    console.log(response);

    if (!response.ok) {
      throw new Error(
        "Something went wrong with deleting the data on the server!"
      );
    }

    dispatch({
      type: DELETE_PRODUCT,
      pid: productId
    });
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  console.log(title+", "+ description+", "+imageUrl+", "+ price);
  // Note: Now also createProduct returns a Promise
// return {
//   type: CREATE_PRODUCT,
//   productData: {
//     id: new Date().getUTCMilliseconds(), // `name` is the key that Firebase gives to its ids...
//     title,
//     description,
//     imageUrl,
//     price,
//     ownerId: "u1"
//   }
// }
  //async code before dispatching the action...
  return async (dispatch, getState) => {

    // With redux thunk `createProduct` action returns a function. This func receives an argument
    // the `dispatch` func, which will be passed automatically by redux thunk.
    // Redux thunk will call this `dispatch` func.
    // But before that you can execute any `async` code you want...
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    console.log("printing userId")

    console.log(userId);
    //const userId = "u1";
    //?auth=${token}
    const response = await fetch(
      `${Constants.baseUrl}/products.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          // Note: Firebase uses alphabetical order...
          title,
          description,
          imageUrl,
          price,
          ownerId: userId
        })
      }
    );

    const resData = await response.json();

    // firebase.db
    //   .ref("prod/")
    //   .push()
    //   .set({
    //     title,
    //     description,
    //     imageUrl,
    //     price,
    //     ownerId: userId
    //   });

    // Redux thunk will call this `dispatch` func.
    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name, // `name` is the key that Firebase gives to its ids...
        title,
        description,
        imageUrl,
        price,
        ownerId: userId
      }
    });
  };
};
// add price to param if you want to update price
export const updateProduct = (id, title, description, imageUrl) => {
console.log("calling update Product")

console.log(title+", "+ description+", "+imageUrl);

  // return{
  //   type: UPDATE_PRODUCT,
  //   pid: id,
  //   productData: {
  //     title,
  //     description,
  //     imageUrl,
  //   }
  // }
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    // For token authentication check https://firebase.google.com/docs/database/rest/auth
    
    //?auth=${token}
    const response = await fetch(
      `${Constants.baseUrl}/products/${id}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          //price
        })
      }
    );

    if (!response.ok) {
      const resData = await response.json();
      
      console.log("print resData");
      console.log(resData);
    //   throw new Error(
    //     "Something went wrong with updating the data on the server!"
    //   );
    }

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl,
        //price
      }
    });
  };
};
