import { IPublicModelPluginContext } from '@felce/lowcode-types';
import CustomSetter from './setters/custom-setter';

// 自定义setter
const CustomSetterSamplePlugin = (ctx: IPublicModelPluginContext) => {
  return {
    async init() {
      const { setters } = ctx;

      setters.registerSetter('CustomSetter', CustomSetter);
    },
  };
};
CustomSetterSamplePlugin.pluginName = 'CustomSetterSamplePlugin';
export default CustomSetterSamplePlugin;
