import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue';//引入ant-design-vue所有组件

import App from './App.vue'
import router from './router'

import './assets/main.css'

import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

import { i18n } from './locales/index';
import './assets/style/index.less'


const app = createApp(App)

app.use(createPinia())
app.use(Antd)
app.use(router)
app.use(VXETable)
app.use(i18n)

app.mount('#app')
