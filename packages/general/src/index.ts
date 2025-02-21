import { createFetchHandler } from '@alilc/lowcode-datasource-fetch-handler';
// import CodeGenPlugin from '@alilc/lowcode-plugin-code-generator';
import CodeEditorPlugin from '@felce/lowcode-plugin-code-editor';
import * as LowcodeEngine from '@felce/lowcode-engine';
import { init, plugins } from '@felce/lowcode-engine';
import UndoRedoPlugin from '@felce/lowcode-plugin-undo-redo';
import ZhEnPlugin from '@felce/lowcode-plugin-zh-en';
// import DataSourcePanePlugin from '@felce/lowcode-plugin-datasource-pane';
import SchemaPlugin from '@felce/lowcode-plugin-schema';
import ManualPlugin from '@felce/lowcode-plugin-manual';
import OutlinePlugin from '@felce/lowcode-plugin-outline-pane';
import ComponentPanelPlugin from '@felce/lowcode-plugin-components-pane';
import SimulatorResizerPlugin from '@felce/lowcode-plugin-simulator-select';
import SetRefPropPlugin from '@felce/lowcode-plugin-set-ref-prop';
import InjectPlugin from '@felce/lowcode-plugin-inject';
// import LoadIncrementalAssetsWidgetPlugin from './plugins/plugin-load-incremental-assets-widget';
import DefaultSettersRegistryPlugin from './plugins/plugin-default-setters-registry';
import EditorInitPlugin from './plugins/plugin-editor-init';
import SaveSamplePlugin from './plugins/plugin-save-sample';
import PreviewSamplePlugin from './plugins/plugin-preview-sample';
import CustomSetterSamplePlugin from './plugins/plugin-custom-setter-sample';
import LogoSamplePlugin from './plugins/plugin-logo-sample';
// import SimulatorLocalePlugin from './plugins/plugin-simulator-locale';
// import lowcodePlugin from './plugins/plugin-lowcode-component';
import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import ReactDOM from 'react-dom';
import appHelper from './appHelper';

import '@felce/lowcode-engine/dist/engine-core.css';
import './global.scss';

import packageJson from '../package.json';

window.React = React;
window.ReactDOM = ReactDOM;
window.moment = moment;
window._ = _;
(window as any).AliLowCodeEngine = LowcodeEngine;

async function registerPlugins() {
  await plugins.register(InjectPlugin, null, { autoInit: true, override: true });

  await plugins.register(EditorInitPlugin, {
    scenarioName: 'general',
    displayName: '综合场景',
    info: {
      urls: [
        {
          key: '设计器',
          value: 'https://github.com/fe-lce/lowcode-demo/tree/main/demo-general',
        },
        // {
        //   key: 'fusion-ui 物料',
        //   value: 'https://github.com/fe-lce/lowcode-materials/tree/main/packages/fusion-ui',
        // },
        // {
        //   key: 'fusion 物料',
        //   value:
        //     'https://github.com/fe-lce/lowcode-materials/tree/main/packages/fusion-lowcode-materials',
        // },
      ],
    },
  });

  // 注册大纲树插件
  await plugins.register(OutlinePlugin, {}, { autoInit: true });

  // 设置内置 setter 和事件绑定、插件绑定面板
  await plugins.register(DefaultSettersRegistryPlugin);

  await plugins.register(LogoSamplePlugin);

  await plugins.register(ComponentPanelPlugin);

  await plugins.register(SchemaPlugin, { isProjectSchema: false });

  await plugins.register(ManualPlugin);

  // 注册回退/前进
  await plugins.register(UndoRedoPlugin);

  // 注册中英文切换
  await plugins.register(ZhEnPlugin);

  await plugins.register(SimulatorResizerPlugin);

  // await plugins.register(LoadIncrementalAssetsWidgetPlugin);

  // 插件参数声明 & 传递，参考：https://lowcode-engine.cn/site/docs/api/plugins#%E8%AE%BE%E7%BD%AE%E6%8F%92%E4%BB%B6%E5%8F%82%E6%95%B0%E7%89%88%E6%9C%AC%E7%A4%BA%E4%BE%8B
  // await plugins.register(DataSourcePanePlugin, {
  //   importPlugins: [],
  //   dataSourceTypes: [
  //     {
  //       type: 'fetch',
  //     },
  //     {
  //       type: 'jsonp',
  //     },
  //   ],
  // });

  await plugins.register(CodeEditorPlugin);

  // 注册出码插件
  // await plugins.register(CodeGenPlugin);

  await plugins.register(SaveSamplePlugin);

  await plugins.register(PreviewSamplePlugin);

  await plugins.register(CustomSetterSamplePlugin);

  // 设计器区域多语言切换
  // await plugins.register(SimulatorLocalePlugin);

  // await plugins.register(lowcodePlugin);

  await plugins.register(SetRefPropPlugin);
}

(async function main() {
  await registerPlugins();

  init(document.getElementById('lce-container')!, {
    locale: 'zh-CN',
    enableCondition: true,
    enableCanvasLock: true,
    // 默认绑定变量
    supportVariableGlobally: true,
    requestHandlersMap: {
      fetch: createFetchHandler(),
    },
    simulatorUrl: [
      'https://registry.npmmirror.com/@felce/lowcode-react-simulator-renderer/beta/files/dist/react-simulator-renderer.umd.js',
      'https://registry.npmmirror.com/@felce/lowcode-react-simulator-renderer/beta/files/dist/react-simulator-renderer.css',
    ],
    appHelper,
    enableContextMenu: true,
  });
})();

console.log(
  `%c AliLowCodeEngineDemo %c v${packageJson.version}`,
  'padding: 2px 1px; border-radius: 3px 0 0 3px; color: #fff; background: #b37feb; font-weight: bold;',
  'padding: 2px 1px; border-radius: 0 3px 3px 0; color: #fff; background: #42c02e; font-weight: bold;',
);
