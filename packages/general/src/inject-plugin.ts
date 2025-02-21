import { Message } from '@alifd/next';
import { IPublicModelPluginContext, IPublicTypePlugin } from '@felce/lowcode-types';

let InjectedPlugin: any;
let injected = false;

function InjectPlugin(ctx: IPublicModelPluginContext, options: IOptions = {}) {
  const { plugins } = ctx;

  const originalRegister = plugins.register;
  plugins.register = async function (plugin: IPublicTypePlugin, pluginOptions: any, options: any) {
    let pluginName = plugin.pluginName;
    if (!pluginName) {
      const pluginConfig = plugin(ctx, pluginOptions);
      // 兼容逻辑
      pluginName = (pluginConfig as any).name;
    }

    if (InjectedPlugin?.pluginName === pluginName) {
      injected = true;
      return originalRegister
        .call(
          this,
          InjectedPlugin,
          pluginOptions,
          Object.assign(options || {}, {
            overriders: true,
          }),
        )
        .then(() => {
          Message.success(`${pluginName} 注入成功`);
        });
    } else {
      return originalRegister.call(this, plugin, pluginOptions, options);
    }

    // const injectedSameNamePlugin = await getInjectedPlugin(pluginName, ctx);
    // if (injectedSameNamePlugin) {
    //   injectedPluginConfigMap[pluginName] = null;
    //   return originalRegister.call(this, injectedSameNamePlugin, pluginOptions, options);
    // } else {
    //   return originalRegister.call(this, plugin, pluginOptions, options);
    // }
  };

  return {
    async init() {
      try {
        const InjectedPluginContent = await import('http://localhost:4173/src/index.ts' as any);
        InjectedPlugin = InjectedPluginContent?.default;
      } catch (err) {
        console.error('Inject plugin load error', err);
      }
      setTimeout(async () => {
        if (!injected && InjectedPlugin) {
          await plugins.register(InjectedPlugin, { autoInit: true }, { autoInit: true });
        }
      }, 1000);
    },
  };
}

InjectPlugin.pluginName = 'InjectPlugin';

InjectPlugin.meta = {
  dependencies: [],
  preferenceDeclaration: {
    title: '注入资源的主机地址',
    properties: [
      {
        key: 'injectServerHost',
        type: 'string',
        description: '注入资源的主机地址',
      },
    ],
  },
};

export default InjectPlugin;
