import { RootState } from "@/store/store";

/**
 * Base selector
 */
export const selectProductsState = (state: RootState) => state.products;

/**
 * Data selectors
 */
export const selectProducts = (state: RootState) =>
  selectProductsState(state).items;

export const selectProductsLoading = (state: RootState) =>
  selectProductsState(state).loading;

export const selectProductsError = (state: RootState) =>
  selectProductsState(state).error;