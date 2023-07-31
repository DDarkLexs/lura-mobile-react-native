import { combineReducers } from 'redux';
import artigoReducer from './artigo';
import setorReducer from './setor';
import userReducer from './usuario';
import validadeReducer from './validade';
import routesReducer from './routes';


const rootReducers = combineReducers({
    routes: routesReducer,
    artigo: artigoReducer,
    usuario: userReducer,
    setor: setorReducer,
    validade: validadeReducer,

});


export default rootReducers
