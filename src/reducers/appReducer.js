import initialState from './initialState';
import * as actions from '../actionTypes';

const reducer = (state = initialState.app, action) => {
    switch (action.type) {

        case actions.LOADING_OPERATION: {
            return {
                ...state,
                loading: action.payload
            }
        }

        case actions.STORE_CUSTOMER_CIRCLE: {
            return {
                ...state,
                pincode: action.payload
            }
        }

        case actions.STORE_CUSTOMER_DELIVERY: {
            return {
                ...state,
                custLocalAdd: action.payload
            }
        }

        case actions.STORE_CUSTOMER_PERMANENT: {
            return {
                ...state,
                custPermAdd: action.payload
            }
        }

        case actions.STORE_SELECTED_DOCOBJECT: {
            return {
                ...state,
                selectedDocObject: action.payload
            }
        }

        case actions.STORE_SELECTED_DOCPOAOBJECT: {
            return {
                ...state,
                selectedDocPOAObject: action.payload
            }
        }

        case actions.STORE_LIST_POA: {
            return {
                ...state,
                poaList: action.payload
            }
        }

        case actions.STORE_ORN: {
            return {
                ...state,
                ORN: action.payload
            }
        }

        case actions.STORE_INIT_DATA : {
            return {
                ...state,
                lstGrpMS: action.lstGrpMS,
                lstAuth_Config : action.lstAuth_Config,
                guid : action.guid
            }
        }

        case actions.STORE_CUSTOMER_NUMBER: {
            return {
                ...state,
                custNumber: action.payload
            }
        }

        case actions.STORE_CUSTOMER_OUTSTATION: {
            return {
                ...state,
                isOutstation: action.payload
            }
        }

        

        

        

        
    }
}

export default reducer;