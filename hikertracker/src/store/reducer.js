
const initialState = {
    hikingHistory:[],
    isAuthenticated: false,

}

const reducer = (state = initialState, action)=>{

    switch(action.type){
        case 'ON_AUTHENTICATED':
        return{
            ...state,
            isAuthenticated: action.token != null ? true : false
        }
        case 'LOGOUT':
            return{
                ...state,
                isAuthenticated: false
            }
        case 'FETCHED_HIKES':
            return{
                ...state,
                hikingHistory: action.value
            }
        case 'NEW_HIKE':
            return{
                ...state,
                hikingHistory: state.hikingHistory.concat( action.value)
            }
        default:
        return state
    }

}

export default reducer