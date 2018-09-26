import immutablePersistenceTransform from '../Services/ImmutablePersistenceTransform'
import { AsyncStorage } from 'react-native';
import localStorage from 'react-native-sync-localstorage';
import storage from 'redux-persist/lib/storage'


// More info here:  https://shift.infinite.red/shipping-persistant-reducers-7341691232b1
const REDUX_PERSIST = {
  active: true,
  reducerVersion: '1.0',
  storeConfig: {
    key: 'primary',
    storage: AsyncStorage,
    // Reducer keys that you do NOT want stored to persistence here.
    blacklist: ['register', 'search', 'nav'],
    // Optionally, just specify the keys you DO want stored to persistence.
    // An empty array means 'don't store any reducers' -> infinitered/ignite#409
    whitelist: ['login'],
    transforms: [immutablePersistenceTransform]
  }
}

export default REDUX_PERSIST
