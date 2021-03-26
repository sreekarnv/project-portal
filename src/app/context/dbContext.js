import loki from 'lokijs';
import LokiIndexedAdapter from 'lokijs/src/loki-indexed-adapter';
import * as React from 'react';

export const DBContext = React.createContext();

const INDEX_IDENTIFIER = "project_portal";
const DB_IDENTIFIER = "projects.db";
const COLLECTION_NAME = "projects";

const DBContextProvider = ({children}) => {
    const [initComplete, setInitComplete] = React.useState(false);
    const [dbExists, setDbExists] = React.useState(false);
    const [projectCollection, setProjectCollection] = React.useState(null);
    const [db, setdb] = React.useState(null);

    const dbInit = () => {
        if(db) {
            const collection = db.getCollection(COLLECTION_NAME);
    
            if(collection) {
                setProjectCollection(collection);
                setDbExists(true);
            } else {
                setProjectCollection(db.addCollection(COLLECTION_NAME));
            }
            setInitComplete(true);
        }
    }

    const idbAdapter = new LokiIndexedAdapter(INDEX_IDENTIFIER);

    React.useEffect(() => {
        let tempDB = new loki(DB_IDENTIFIER, {
            adapter: idbAdapter,
            autoload: true,
        });
        
        setdb(tempDB);
    }, []);

    React.useEffect(dbInit, [db]);

    return (
        <DBContext.Provider value={{
            db,
            initComplete,
            dbExists,
            projectCollection
        }}>
            {children}
        </DBContext.Provider>
    );
};

export default DBContextProvider;