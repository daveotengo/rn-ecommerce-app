import PRODUCTS from '../../data/dummy-data'
import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, SET_PRODUCTS } from '../actions/products';
import Product from '../../models/product';
// availableProducts: PRODUCTS,
    // userProducts: PRODUCTS.filter(prod=>prod.ownerId==="u1"),
    // favoriteProducts: [],
const initialState= {
    
    availableProducts: [],
	userProducts: [],
	favoriteProducts: []

};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_PRODUCTS:
			console.log("printing action.products");
			console.log(action.products);
			return {
				...state,
				availableProducts: action.products,
				userProducts: action.userProducts
			};
		case DELETE_PRODUCT:

			console.log("printing action.pid in product reducers")

			console.log(action.pid)

			return {
				userProducts: state.userProducts.filter((product) => product.id !== action.pid),
				availableProducts: state.availableProducts.filter((product) => product.id !== action.pid),
				favoriteProducts: state.favoriteProducts.filter((product) => product.id !== action.pid)
			};
		case CREATE_PRODUCT:

			console.log(" =======printing action=====CREATE_PRODUCT");

			console.log(action);

			const newProduct = new Product(
				action.productData.id,
				action.productData.ownerId,
				action.productData.title,
				action.productData.imageUrl,
				action.productData.description,
				action.productData.price
			);
			return {
				...state,
				availableProducts: state.availableProducts.concat(newProduct),
				userProducts: state.userProducts.concat(newProduct)
			};
		case UPDATE_PRODUCT:
			console.log(" =======printing action=====UPDATE_PRODUCT");

			console.log(action);

            console.log("printing pid");
            console.log(action.pid);

			const productIndex = state.userProducts.findIndex((prod) => prod.id === action.pid);
            console.log("printing productIndex");
            console.log(productIndex);
			const updatedProduct = new Product(
				action.pid,
				state.userProducts[productIndex].ownerId,
				action.productData.title,
				action.productData.imageUrl,
				action.productData.description,
				state.userProducts[productIndex].price,

			);
			//"state.userProducts[productIndex].ownerId"
			//"state.userProducts[productIndex].price"

            console.log("printing updatedProduct");
            console.log(updatedProduct);

			const updatedUserProducts = [ ...state.userProducts ];
			updatedUserProducts[productIndex] = updatedProduct;

            console.log("printing updatedUserProducts");
            console.log(updatedUserProducts);

			const availableProductIndex = state.availableProducts.findIndex((prod) => prod.id === action.pid);
			const updatedAvailableProducts = [ ...state.availableProducts ];
			updatedAvailableProducts[availableProductIndex] = updatedProduct;

            console.log("printing updatedAvailableProducts");
            console.log(updatedAvailableProducts);

			const favoriteProductIndex = state.favoriteProducts.findIndex((prod) => prod.id === action.pid);
			const updatedFavoriteProducts = [ ...state.favoriteProducts ];
			updatedFavoriteProducts[favoriteProductIndex] = updatedProduct;

            console.log("printing updatedFavoriteProducts");
            console.log(updatedFavoriteProducts);

			return {
				...state,
				userProducts: updatedUserProducts,
				availableProducts: updatedAvailableProducts,
				favoriteProducts: updatedFavoriteProducts
			};
	}
	return state;
};