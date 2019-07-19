React提供了create-react-app的快速构建工具, 但是面对复杂的项目, 入门级的构建工具, 是远远不够的, 我们这里从零开始, **用webpack, 手动配置一个独立的React开发环境** , 开发环境完成后, 支持自动构建, 自动刷新, sass语法 等功能...

#### 一、初始化环境
```
mkdir react-webpack-demo
cd react-webpack-demo
npm init -y
```

**安装所需的软件包**
```
npm install react react-dom webpack webpack-cli webpack-dev-server html-webpack-plugin -D
npm install babel-core babel-loader babel-plugin-transform-runtime -D
npm install babel-preset-env babel-preset-stage-0 babel-preset-react -D
# 识别html转换为jsx语法
npm install babel-preset-react -D
```

#### 二、html静态文件

##### 1.在根目录下新建文件夹src, 在src内加入index.html  index.js

##### 2.在根目录下新建webpack.config.js

##### 3.在webpack.config.js中加入如下配置
```
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 负责将html文档虚拟到根目录下
let htmlWebpackPlugin = new HtmlWebpackPlugin({
    // 虚拟的html文件名 index.html
    filename: 'index.html',
    // 虚拟html的模板为 src下的index.html
    template: path.resolve(__dirname, './src/index.html')
})

module.exports = {
    // 开发模式
    mode: 'development',
    // 配置入口文件
    entry: './src/index.js',
    // 出口文件目录为根目录下dist, 输出的文件名为main
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    // 配置开发服务器, 并配置自动刷新
    devServer: {
        // 根目录下dist为基本目录
        contentBase: path.join(__dirname, 'dist'),
        // 自动压缩代码
        compress: true,
        // 服务端口为1208
        port: 1208,
        // 自动打开浏览器
        open: true
    },
    // 装载虚拟目录插件
    plugins: [htmlWebpackPlugin],
}
```

##### 4. 在package.json内scripts中添加"dev": "webpack-dev-server"

##### 5.在src/index.html中添加内容
##### 6.在命令行内运行npm run dev, 即可看到刚添加的index.html内容
##### 7.接下来我们配置babel对es6语法的支持, 以及对jsx语法的支持

#### 三、添加对js高级语法的支持

##### 1.在项目根目录, 添加.babelrc配置文件 presets为语法配置,plugins为插件配置
```
{
    "presets": ["env", "stage-0", "react"],
    "plugins": ["transform-runtime"]
}
```

##### 2.在webpack.config.js中添加module字段, 进行插件loader配置
```
// webpack.config.js
module.exports = {
    ...
    // 配置loader
    module: {
        // 根据文件后缀匹配规则
        rules: [
            // 配置js/jsx语法解析
            { test: /\.js|jsx$/, use: 'babel-loader', exclude: /node_modules/ }
        ]
    }
};
```

##### 3.在src/index.html中加入id为root的div节点
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>react-webpack-demo</title>
</head>
<body>

    react-webpack-demo
    <hr>
    高堂明镜悲白发, 朝如青丝暮成雪
    <hr>
    <div id="root"></div>
</body>
</html>
```

##### 4.在src/index.js中加入包含jsx语法的react组件
```
import React from 'react';
import ReactDOM from 'react-dom';


class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { number: 0 };
        this.decrease = this.decrease.bind(this);
        this.increase = this.increase.bind(this);
    }
    // 加1
    increase() {
        let self = this;
        self.setState({ number: self.state.number + 1 })
    }
    // 减一
    decrease() {
        let self = this;
        self.setState({ number: self.state.number - 1 })

    }


    render() {
        return ( 
            <div>
                <input type = "button" value = "减1"onClick = { this.decrease }/> 
                <span> { this.state.number } </span>
                <input type = "button" value = "加1" onClick = { this.increase }/> 
            </div> )
    }
}

ReactDOM.render(<Counter /> , document.getElementById('root'))
```

#### 四、可以添加语法的支持，例如sass

##### 1.安装sass相关的loader
```
npm install style-loader css-loader node-sass sass-loader -D
```

##### 2.在webpack.config.js内新增规则
```
// webpack.config.js
module.exports = {
    ...
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                "style-loader", // creates style nodes from JS strings
                "css-loader", // translates CSS into CommonJS
                "sass-loader" // compiles Sass to CSS
            ]
        }]
    }
};
```

####3.在src内新增.scss文件，并在对应的js文件中import引入

接下来我们就可以自己进行开发啦~~~~