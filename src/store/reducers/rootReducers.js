import { combineReducers } from 'redux';
import artigoReducer from './artigo';
import routesReducer from './routes';


const rootReducers = combineReducers({
    routes: routesReducer,
    artigo: artigoReducer,
});


export default rootReducers
