/*
 * @Author: yucongcong lxydft@163.com
 * @Date: 2022-12-06 16:15:34
 * @LastEditors: yucongcong lxydft@163.com
 * @LastEditTime: 2022-12-06 17:40:28
 * @FilePath: \cesiumDemo\src\main.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
import ReactDOM from 'react-dom'
import RouteAuth from '@/routes/RouteAuth'
import { StoreProvider } from '@/store'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN';
import './main.less'
import "cesium/Build/Cesium/Widgets/widgets.css"

// window.CESIUM_BASE_URL = '@/static/Cesium';

// 生产开启严格模式
const ReactMode = import.meta?.env?.PROD
  ? React.StrictMode
  : React.Fragment

ReactDOM.render(
  <ReactMode>
    <StoreProvider>
      <ConfigProvider locale={zhCN}>
        <RouteAuth />
      </ConfigProvider>
    </StoreProvider>
  </ReactMode>,
  document.getElementById('root')
)
