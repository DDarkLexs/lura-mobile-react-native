import { combineReducers } from 'redux';
import artigoReducer from './artigo';
import userReducer from './usuario';
import routesReducer from './routes';


const rootReducers = combineReducers({
    routes: routesReducer,
    artigo: artigoReducer,
    usuario: userReducer,
});


export default rootReducers
