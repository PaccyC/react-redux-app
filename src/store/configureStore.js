//  import { createStore } from 'redux'
//  import { devToolsEnhancer } from 'redux-devtools-extension'
import {configureStore,getDefaultMiddleware} from '@reduxjs/toolkit'
 import reducer from './reducer'
 import logger from './middlewares/logger'
 import func from './middlewares/func'
 import toast from './middlewares/toast'

import api from './middlewares/api'

export default function configureAppStore(){
 return configureStore({  reducer,
           middleware:[...getDefaultMiddleware(),logger,toast,api] }
  )
      
}