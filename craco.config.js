// 使用less插件
const path = require('path')
const CracoLessPlugin = require('craco-less')

module.exports = {
    webpack: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        // 修改主题色
                        modifyVars: { '@primary-color': '#1890ff' }, //#1DA57A
                        javascriptEnabled: true
                    }
                }
            }
        }
    ],
    babel: {
        // 支持装饰器模式语法
        plugins: [
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            ['@babel/plugin-proposal-class-properties', { loose: true }],
            [
                'import',
                {
                    libraryName: 'antd',
                    libraryDirectory: 'es',
                    style: true //设置为true即是less
                }
            ]
        ]
    }
}
