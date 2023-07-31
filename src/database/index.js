import {knex as con, RNSqliteDialect} from 'knex-react-native-sqlite';
import moment from 'moment';

const knexConfig = con({
    client: RNSqliteDialect,
    connection: {
        name: 'luraDB.db',
        location: 'Library',
        readOnly:true,
    },
    useNullAsDefault:true
});

export class LuraDB {
    constructor() {
        this.knex = knexConfig 
    }
}

// Create the tables if they don't exist
