/*
 * @Author: yucongcong lxydft@163.com
 * @Date: 2022-12-07 09:52:09
 * @LastEditors: yucongcong lxydft@163.com
 * @LastEditTime: 2022-12-19 16:16:44
 * @FilePath: \cesiumDemo\src\static\js\eyeMap.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * @description: 二维鹰眼地图功能
 * @param {*}
 * @return {*}
 */
import * as Cesium from "cesium";

export default class HawkEye2DMap {
    constructor(viewer) {
        // 主图
        this._viewer = viewer;
        // 鹰眼图
        this._hawkEyeMap = null;
    }

    // 初始化函数
    _init() {
        this._divInit();
        this._mapInit();
    }

    // 动态创建div,及div初始化
    _divInit() {
        let hawkEyeDiv = document.createElement("div");
        hawkEyeDiv.setAttribute('id', "hawkEye2dMap");
        hawkEyeDiv.style.cssText = "position:absolute;right:10px;top:10px;height:100px;width:160px;overflow: hidden;border: 1px solid #002FA7;z-index:99"
        document.getElementById("cesiumContainer").appendChild(hawkEyeDiv);
    };

    // 初始化地图
    _mapInit() {
        let _hawkEyeMap = new Cesium.Viewer("hawkEye2dMap", {
            animation: false,
            baseLayerPicker: false,
            fullscreenButton: false,
            geocoder: false,
            homeButton: false,
            sceneModePicker: false,
            selectionIndicator: false,
            timeline: false,
            navigationHelpButton: false,
            infoBox: false,
            navigationInstructionsInitiallyVisible: false,
          });

          let credit2 = _hawkEyeMap.cesiumWidget.creditContainer;
          credit2.style.display = "none";

         
        // this._hawkEyeMap.scene.backgroundColor = Cesium.Color.TRANSPARENT;

              //2、设置鹰眼图中球属性
            let control = _hawkEyeMap.scene.screenSpaceCameraController;
            control.enableRotate = false;
            control.enableTranslate = false;
            control.enableZoom = false;
            control.enableTilt = false;
            control.enableLook = false;

            let viewer = this._viewer
            this._viewer.entities.add({
                position: Cesium.Cartesian3.fromDegrees(0, 0),
                label: {
                  text: new Cesium.CallbackProperty(function () {
                    console.log()
                    _hawkEyeMap.camera.flyTo({
                        destination: viewer.camera.position,
                        orientation: {
                          heading: viewer.camera.heading,
                          pitch: viewer.camera.pitch,
                          roll: viewer.camera.roll,
                        },
                        duration: 0.0,
                      });
                    return "";
                  }, true),
                },
              });

            
    }
}
