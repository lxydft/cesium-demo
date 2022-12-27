/*
 * @Author: yucongcong lxydft@163.com
 * @Date: 2022-12-06 16:15:34
 * @LastEditors: yucongcong lxydft@163.com
 * @LastEditTime: 2022-12-19 17:20:50
 * @FilePath: \cesiumDemo\src\pages\Kanban\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import IntegrationTable, {
  IntegrationTableProps,
} from "@/components/IntegrationTable";
import { DynamicFormItem } from "@/components/DynamicForm";
import React, { useEffect } from "react";
import { TableColumnProps } from "antd";
import * as Cesium from "cesium";
import HawkEye2DMap from "../../static/js/eyeMap2.js";

let viewer: any = null;

// @page 看板
const Kanban: React.FC = () => {
  // 组件是否已经卸载
  let isUnMounted = false;

  const initmap = () => {
    // 天地图影像
    let image_Source = new Cesium.WebMapTileServiceImageryProvider({
      url: "http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=cd14e0324802703aa775d2a7dea50936",
      layer: "img",
      style: "default",
      format: "tiles",
      tileMatrixSetID: "w",
      credit: new Cesium.Credit("天地图全球影像服务"),
      subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
      maximumLevel: 18,
    });


      viewer = new Cesium.Viewer("cesiumContainer", {
        animation: false, //是否显示动画控件
        shouldAnimate: true,
        baseLayerPicker: false, //是否显示图层选择控件
        imageryProvider: image_Source,
        geocoder: false, //是否显示地名查找控件
        timeline: false, //是否显示时间线控件
        sceneModePicker: false, //是否显示投影方式控件
        navigationHelpButton: false, //是否显示帮助信息控件
        infoBox: false, //是否显示点击要素之后显示的信息
        selectionIndicator: false,
        homeButton: false,
        fullscreenButton: false,
        terrainProvider: Cesium.createWorldTerrain(),
        // terrainProvider: terrain,
        // requestRenderMode:true,
      });
  
      //去除版权信息
      let credit: any = viewer.cesiumWidget.creditContainer;
      credit.style.display = "none";
  
      // 设置相机位置
      viewer.camera.setView({
        // 设置相机位置
        destination: {
          x: -9059039.372940129,
          y: 23278188.485525128,
          z: 18051780.062683452,
        },
        orientation: {
          // 初始视角
          heading: 6.283185307179586,
          pitch: -1.5685143667935928,
          roll: 0,
        },
      });
  
      getClickPointAdd();
  
      // 鹰眼地图初始化
      let hawkEyeMap = new HawkEye2DMap(viewer);
      hawkEyeMap._init();
      
  };

  const getClickPointAdd = () => {
    // 注册屏幕点击事件
    let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction((event: any) => {
      // 转换为不包含地形的笛卡尔坐标
      let clickPosition = viewer.scene.camera.pickEllipsoid(event.position);
      // 转经纬度（弧度）坐标
      let radiansPos = Cesium.Cartographic.fromCartesian(clickPosition);
      // 转角度
      console.log(
        "经度：" +
          Cesium.Math.toDegrees(radiansPos.longitude) +
          ", 纬度：" +
          Cesium.Math.toDegrees(radiansPos.latitude)
      );
      console.log(viewer.camera.position);
      console.log(viewer.camera.heading);
      console.log(viewer.camera.pitch);
      console.log(viewer.camera.roll);
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  };

  // 初始化加载数据
  useEffect(() => {
    initmap();
    return () => {
      isUnMounted = true;
    };
  }, []);

  return (
      <div
        id="cesiumContainer"
        style={{ width: "100%", height: 700, position: "relative",backgroundColor:'red' }}
      >
      </div>
  );
};

export default Kanban;
