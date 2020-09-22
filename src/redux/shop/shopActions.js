import ShopActionTypes from './shopActionTypes';
export const updateCollections = (collections) => ({
  type: ShopActionTypes.UPDATE_COLLECTIONS,
  payload: collections
})
