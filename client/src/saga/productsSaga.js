import { call,put, takeLatest } from 'redux-saga/effects';
import axios from 'axios'
import config from '../config/config';
import { fetchProductsRequest,fetchProductsSuccess,fetchProductsFailure,searchProductsFailure,searchProductsSuccess,searchProductsRequest } from '../features/shoppingSlice';

function* fetchProductsSaga(){
    try{
        const response=yield call(axios.get,`${config.baseUrl}/products`)
        console.log(response.data)
        yield put(fetchProductsSuccess(response.data));
    }
    catch(error) {
        yield put(fetchProductsFailure(error.message)); 
    }

}

function* searchProductsSaga(action){
    try{
        const query = action.payload;
        const response=yield call(axios.get,`${config.baseUrl}/products/search?q=${query}`)
        yield put(searchProductsSuccess(response.data))
    }catch(error){
        yield put(searchProductsFailure(error.message))
    }
}

export default function*productsRootSaga(){
    yield takeLatest(fetchProductsRequest.type,fetchProductsSaga);
    yield takeLatest(searchProductsRequest.type, searchProductsSaga);
}