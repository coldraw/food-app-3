import Product from '../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

// FETCH PRODUCTS

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const token = getState().auth.token;

    try {
      const response = await fetch(
        `https://yum-lo-1.firebaseio.com/products.json?auth=${token}`
      );

      if (!response.ok) {
        throw new Error('Something went wrong with data retrieval!');
      }

      const resData = await response.json();
      const loadedProducts = [];

      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            resData[key].sellerId,
            resData[key].title,
            resData[key].description,
            resData[key].price,
            resData[key].minOrder,
            resData[key].isMeatProduct,
            resData[key].isGlutenFreeProduct,
            resData[key].isVegetarianProduct,
            resData[key].prepTime,
            resData[key].imageString,
          )
        );
      }

      dispatch({ type: SET_PRODUCTS, products: loadedProducts })
      console.log('Products loaded, user ID:', userId);
    } catch (err) {
      // eg. send to analytics server
      throw err;
    }
  };
};

export const deleteProduct = productId => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://yum-lo-1.firebaseio.com/products/${productId}.json?auth=${token}`,
      {
        method: 'DELETE',
      }
    );
    if (!response.ok) {
      throw new Error('Something went wrong');
    };
    dispatch({ type: DELETE_PRODUCT, pid: productId });
  }
};

// CREATE PRODUCT

export const createProduct = (sellerId, title, description, price, minOrder, isMeatProduct, isGlutenFreeProduct, isVegetarianProduct, prepTime, image) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const sellerId = getState().auth.userId;
    const imageString = image;

    // DISPATCH TO FIREBASE

    const response = await fetch(`https://yum-lo-1.firebaseio.com/products.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sellerId,
          title,
          description,
          price,
          minOrder,
          isMeatProduct,
          isGlutenFreeProduct,
          isVegetarianProduct,
          prepTime,
          imageString
        })
      }
    );

    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        sellerId,
        title,
        description,
        price,
        minOrder,
        isMeatProduct,
        isGlutenFreeProduct,
        isVegetarianProduct,
        prepTime,
        imageString,
      }
    });
    console.log('item CREATED!');
  }
};

// UPDATE PRODUCT

export const updateProduct = (id, title, description, minOrder, isMeatProduct, isGlutenFreeProduct, isVegetarianProduct, prepTime, image) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const imageString = image;

    // DISPATCH TO FIREBASE

    const response = await fetch(
      `https://yum-lo-1.firebaseio.com/products/${id}.json?auth=${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          minOrder,
          isMeatProduct,
          isGlutenFreeProduct,
          isVegetarianProduct,
          prepTime,
          imageString
        })
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong! NOT WORKING');
    };

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        minOrder,
        isMeatProduct,
        isGlutenFreeProduct,
        isVegetarianProduct,
        prepTime,
        imageString: imageString,
      }
    });
    console.log(userId, 'has updated a product');
  };
};