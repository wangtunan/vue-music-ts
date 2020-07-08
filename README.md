# vue-music-ts
## 安装
```
# 依赖依赖
npm install

# 本地开发
npm run serve

# 打包
npm run build

# 自动化测试
npm run test:unit

# 代码格式检查/修正
npm run lint
```
## 前言
项目使用主要`TypeScript`+`Jest`重构`Vue-Music`音乐app，所以重点在于对`TypeScript`、`Jest`的使用。本篇文章并不会花大量的篇幅去说明如何抓取接口，布局以及撰写CSS等方面的知识。也不会全面、系统的去介绍`TypeScript`或者`Jest`方面的基础知识，如果你对这两方面还不是很了解的话，你可以访问下面的链接去学习：<br/>
[TypeScript官网](https://www.typescriptlang.org/)<br/>
[Jest官网](https://jestjs.io/)<br/>
 [Vue-Test-Utils官网](https://vue-test-utils.vuejs.org/zh/guides/)<br/>

如果你想具体看`Vue-Music`是如何实现的，你可以观看正版视频[Vue2.0开发企业级移动端音乐Web App](https://coding.imooc.com/class/107.html)。

如果你想看本篇文章的源码，可以点击[源码仓库](https://github.com/wangtunan/vue-music-ts)，觉得写得不错，请给一个Star。

## 技术栈/工具
* `normalize.css`：重置样式。
* `good-storage`: 基于`localStorage`本地缓存封装的库。
* `jsonp`：发送`jsonp`请求的库。
* `vue-lazyload`：图片懒加载。
* `vue-property-decorator`：依赖于`vue-class-component`的库。
* `axios`：`http`请求库。
* `sass`：`css`预处理器。
* `better-scroll`：一个处理移动端滚动事件的库。
* `lyric-parser`：歌词解析库。
* `jest`：一个前端自动化测试工具。
* `vue-test-utils`：`vue`单元测试工具，可以配合`Jest`或者其他测试框架使用。
* `postcss-px-to-viewport`：移动端自动适配工具。
* `typescript`：`JavaScript`超集，提供静态类型检查。
* `js-base64`：提供`Base64`加密和解密。
* `vuex-class`：提供一种Vuex的包裹写法，方便在`vue-class-component`中使用。
* `vue-router`：路由

## 环境搭建

### 脚手架生成项目
我们使用`Vue-Cli4.0+`来新建我们的项目，执行如下命令：
```sh
# 创建项目
$ vue create vue-music-ts
```
并选择自定义配置
```sh
? Please pick a preset
  default (babel, eslint)  
> Manually select features 
```
随后勾选我们需要用到的功能：
```sh
? Check the features needed for your project
 (*) Babel
 (*) TypeScript
 ( ) Progressive Web App (PWA) Support        
 (*) Router
 (*) Vuex
 (*) CSS Pre-processors
 (*) Linter / Formatter
>(*) Unit Testing
 ( ) E2E Testing
```
按回车后，随后会询问我们，我们进行如下选择：
```sh
? Use class-style component syntax? Yes
? Use Babel alongside TypeScript (required for modern mode, auto-detected polyfills, transpiling JSX)? Yes
? Use history mode for router? (Requires proper server setup for index fallback in production) No
```
紧接着，`CSS`预处理器我们选择了`Scss`，单元测试工具我们选择了`Jest`。安装完毕后，我们需要将项目目录改造成下面这样：
```sh
|-- src
|   |-- api               # 存放请求目录 
|   |-- assets            # 资源目录
|   |   |-- fonts         # 字体
|   |   |-- images        # 图片
|   |   |-- js            # js
|   |   |-- styles        # 样式
|   |-- components        # 公共组件
|   |-- router            # 路由
|   |-- store             # vuex
|   |-- types             # 类型定义
|   |-- utils             # 工具函数
|   |-- views             # 页面
|   |   |-- recommend     # 推荐页面
|   |   |-- singer        # 歌手页面
|   |-- App.vue           # 入口Vue文件
|   |-- main.ts           # 入口ts文件
|   |-- shims-tsx.d.ts    # 支持jsx语法
|   |-- shims-vue.d.ts    # 使ts支持识别.vue文件
```
其中`src/views/recommend/index.vue`的代码如下：
```ts
<template>
  <div class="recommend">recommend</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class Recommend extends Vue {
}
</script>
```

路由部分如下所示：
```ts
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
const Recommend = () => import('@/views/recommend/index.vue')
const Singer = () => import('@/views/singer/index.vue')
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    name: 'Recommend',
    component: Recommend
  },
  {
    path: '/singer',
    name: 'Singer',
    component: Singer
  }
]

const router = new VueRouter({
  routes
})

export default router
```
随后我们，使用下面的命令启动我们的项目：
```sh
$ npm run serve
```
启动完毕后，你将会看到`recommend`页面的内容，至此我们使用脚手架搭建项目就完毕了，下一步我们将安装一些工具。

**注意：** 项目中需要使用到的图片、字体、以及样式等相关的东西需要自己去引入。


### 安装移动端适配工具
由于原版`Vue-Music`课程并没有做移动端适配，那么可以自主选择一种移动端适配方案，关于移动端适配方案有很多，我们选择了`postcss-px-to-viewport`。

在安装之前，需要我们先在`public/index.html`里添加一段代码：
```html
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no,viewport-fit=cover">
```
添加完毕后，使用下面的命令安装：
```sh
# 安装
$ npm install postcss-px-to-viewport -D
```
随后在根目录下新建`postcss.config.js`，并配置如下：
```js
module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-px-to-viewport': {
      unitToConvert: 'px',
      viewportWidth: 375,   // 对应视觉稿，750的视觉稿就写750 
      unitPrecision: 8,     // px转vm的过程中，最多保留的小数位数
      propList: ['*'],
      viewportUnit: 'vw',   // 转换后的单位
      fontViewportUnit: 'vw',
      selectorBlackList: [],
      minPixelValue: 1,
      mediaQuery: false,
      replace: true,
      exclude: /(\/|\\)(node_modules)(\/|\\)/,
      landscape: false,
      landscapeUnit: 'vw',
      landscapeWidth: 667
    }
  }
}
```


### 安装Axios及Axios拦截
同样的道理，使用如下命令去安装`axios`及其类型定义文件
```sh
# 安装axios到dependencies
$ npm install axios --save

# 安装axios类型定义文件到devDependencies
$ npm install @types/axios -D
```
安装完毕后，我们需要对`axios`做一下简单的封装，在封装之前我们约定所有的请求响应结构如下所示：
```json
// 1.code为0代表请求成功，number类型且必须存在
// 2.data可以为任意类型且必须存在
// 3.message为可选字段，约定为string类型。
{
  "code": 0,
  "data": {},
  "message": ""
}
```
根据我们约定的响应结构，我们首先需要在`src/api`目录下新建`config.js`文件：
```js
// 0代表请求成功
export const ERR_OK = 0
```
随后需要在`src/types`目录下新建`index.ts`，并添加如下代码：
```js
export interface MusicResponse {
  code: number;
  data: any;
  message?: string;
}
```

紧接着在`src/utils`目录下新建`axios.ts`，并添加如下代码：
```ts
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
const service = axios.create({
  timeout: 10000,
  baseURL: ''
})

// 请求拦截
service.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    return config
  }
)

// 响应拦截
service.interceptors.response.use(
  (response: AxiosResponse): Promise<AxiosResponse> => {
    const { status, data } = response
    if (status === 200) {
      return data
    } else {
      return Promise.reject(new Error('服务器异常!'))
    }
  },
  (error: AxiosError): Promise<AxiosResponse> => {
    return Promise.reject(error.message)
  }
)

export default service
```

最后，我们需要在`src/api`目录下去撰写我们的请求接口，这里以`song.ts`代码为例：
```ts
import axios from '@/utils/axios'
import { MusicResponse } from '@/types/index'
export function getLyric (mid: string): Promise<MusicResponse> {
  const url = '/api/lyric'
  const params = Object.assign({}, commonParams, {
    songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date(),
    format: 'json'
  })
  return axios.get(url, { params })
}
```
指定`getLyric()`方法的返回数据格式后，我们就可以在组件中正确的推导出返回数据的类型：
```ts
const mid = 'SDMODNTJ12323123SDS'
getLyric(mid).then(res => {
  console.log(res.code)
  console.log(res.data)
  console.log(res.message)
})
```

### Jest单元测试
我们脚手架创建项目后，会在根目录下生成`tests`文件夹，它包含一个简单的测试用例：
```ts
import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
```

在撰写测试用例之前，我们需要进行一些必要的改造。

首先，我们需要把`tests`目录改造成下面这样：
```sh
|-- tests
|   |-- unit                
|   |   |-- components       # 组件测试目录
|   |   |-- utils            # 工具函数测试目录
```

随后，需要我们进行`Jest`配置，根目录下`jest.config.js`：
```js
module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  // 别名配置
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  // 组件快照
  snapshotSerializers: ['jest-serializer-vue'],
  // 测试文件
  testMatch: [
    '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
  ],
  // 测试覆盖率相关
  collectCoverageFrom: [
    'src/components/**/*.vue',
    'src/utils/**/*.ts',
    '!src/utils/axios.ts'
  ],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/tests/unit/coverage'
}
```
紧接着删除`example.spec.ts`文件，并新建`tab.spec.ts`，我们`tab`组件为例，其完整代码如下：
```vue
<template>
  <div class="m-tab">
    <div class="tab-container">
      <router-link
        tag="div"
        class="tab-item"
        v-for="(tab, index) in list"
        :key="index"
        :to="tab.path"
        @click.native="handleTabClick(index)"
      >
        <span class="tab-name">
          {{tab.name}}
        </span>
      </router-link>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Tab } from '@/types/index'
@Component
export default class MTab extends Vue {
  private activeIndex = 0
  @Prop({ type: Array, default () { return [] } }) list!: Tab[]

  public handleTabClick (index: number) {
    this.activeIndex = index
  }
}
</script>
```
根据`@/components/tab/index.vue`的代码，我们在`tab.spec.ts`撰写如下测试代码：
```ts
import { shallowMount, Wrapper } from '@vue/test-utils'
import { tabList } from '@/assets/js/data'
import Tab from '@/components/tab/index.vue'

describe('tab.vue', () => {
  let wrapper: Wrapper<Vue>
  beforeEach(() => {
    wrapper = shallowMount(Tab, {
      propsData: {
        list: tabList
      },
      stubs: ['router-link']
    })
  })
  it('match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
  it('passed props.list', () => {
    expect(wrapper.props('list').length).toBe(tabList.length)
  })
  it('default activeIndex', () => {
    expect(wrapper.vm.$data.activeIndex).toBe(0)
  })
  it('no passed props.list', () => {
    wrapper = shallowMount(Tab, {
      stubs: ['router-link']
    })
    expect(wrapper.props('list').length).toBe(0)
  })
  it('render success props.list', () => {
    const tabItems = wrapper.findAll('.tab-item')
    expect(tabItems.length).toBe(tabList.length)
  })
  it('change index after click', () => {
    wrapper.findAll('.tab-item').at(1).trigger('click')
    expect(wrapper.vm.$data.activeIndex).toBe(1)
  })
})
```

测试代码说明：
* `beforeEach`：会在每一个`it`测试用例运行开始之前执行，上面的代码的意思是：在每一个测试用例开始之前去挂载组件，一方面避免多个测试用例互相影响，另一方面节省代码量，不需要再在每个测试用例去重复挂载组件。
* `shallowMount`：浅渲染，还有一个`mount`。二者的区别是，`shallowMount`不会去渲染子组件，如果有子组件的话仅仅只是在父组件中占位，不影响父组件的功能。显而易见，如果我们要单独测试某一个组件，而不希望受其子组件影响的话，就需要使用`shallowMount`去挂载组件。
* `stubs`：意思是存根，如果我们的组件中存在`router-link`或者`router-view`，则需要在挂载组件的时候手动撰写对应的存根，否则会报错。
* `toMatchSnapshot`：组件快照，使用快照后既意味着将当前组件的UI快照保存起来，如果下一次`tab`组件改动了，那么两次的快照会不匹配，从而导致`match snapshot`测试用例不通过。如果你是误改动，可以依据此提示信息进行还原，如果确认是最新的改动可以更新快照，更新后测试用例通过。

**注意**：如果我们的`Prop`传递的字段是对象或者数组，而我们又提供了其`default`，根据`Vue`规定`default`必须为一个函数：
```js
// list default
default () {
  return []
}
```
而在`Jest`中，这属于一个`Function`，如果我们没有测试到这个函数：既本例中不传递`list`参数，它会影响最后的`% Funcs`覆盖率，因此`it('no passed props.list')`测试用例不能少。`


`VSCode`插件，在使用`VSCode`编辑器撰写`Jest`测试用例的时候，我们可以按照`Jest`插件。安装完毕后，它可以在我们不运行`npm run test:unit`的情况就提示测试用例是否通过。
![Jest插件](https://user-gold-cdn.xitu.io/2020/6/29/172feefae987bdcc?w=1192&h=642&f=png&s=105692)

最后，我们使用如下命令去运行测试用例：
```sh
# 运行测试用例
$ npm run test:unit
```
由于我们配置了测试覆盖率，运行此命令后你可以在终端上看到类似下面的输出结果：
![测试覆盖率](https://user-gold-cdn.xitu.io/2020/6/29/172fef339db3536b?w=1177&h=1014&f=png&s=166491)

## TypeScript准备知识
**注意**：此部分只涉及项目中已经使用过的知识，更多内容请阅读其官方文档。
### 基本类型
### 字符串字面量
### 联合类型
### 接口
### 函数的类型
### 类型断言
### 枚举
### 类


## Vue组件的TS写法
**注意**：此部分只涉及项目中已经使用过的知识，更多内容请阅读其官方文档。
### 生命周期
生命周期的写法非常简单，唯一一点值得注意的地方就是需要在生命周期函数前面添加`private`修饰符，将其生命周期标记为私有的，其它修饰符还有`public`和`protected`：
```ts
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class HelloWorld extends Vue {
  private created () {
    // TDD
  }
  private mounted () {
    // TDD
  }
  private activated () {
    // TDD
  }
}
```
### 响应式变量和普遍变量
在不使用`TS`写`Vue`组件之前，我们可以把不需要响应式的变量直接挂在到`this`上，而不是全部都写在`data`上：
```ts
export default {
  data () {
    return {
      // name 和 age为响应式变量，其值更新后会触发视图更新
      name: 'AAA',
      age: 21
    }
  },
  created () {
    // addres为普通变量，其值改变不会触发视图更新
    this.address = '广东省'
  },
  mounted () {
    console.log(this.address) // 广东省
  }
}
```

在使用`TS`写`Vue`组件时，如果我们为其提供一个默认值那么他会被定义为响应式变量，相反不提供默认值则为非响应式变量：
```ts
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class HelloWorld extends Vue {
  private name = 'AAA'
  private age = 21
  private address!: string

  private created () {
    this.address = '广东省'
  }
  private mounted () {
    console.log(this.address) // 广东省
  }
}
```
如果你使用`devtools`观察`HelloWorld.vue`组件的话，它的`data`里面只有`name`和`age`两个变量，这是十分符合我们的预期的。
### Prop和PropSync
在使用`TS`写`Vue`组件时，我们使用`Prop`和`PropSync`来分别处理不带`.sync`和带`.sync`的参数：
```ts
import { Component, Prop, PropSync, Vue } from 'vue-property-decorator'
@Component
export default class Recommend extends Vue {
  @Prop({ type: String, default: '' }) name!: string
  @Prop({ type: Number, default: 0 }) age!: number
  @PropSync('active', { type: Number, default: 0 }) activeIndex!: number
}
```
以上代码用相当于：
```js
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    age: {
      type: Number,
      default: 0
    },
    active: {
      type: Number,
      default: 0
    }
  },
  computed: {
    activeIndex: {
      get () {
        return this.active
      },
      set (val) {
        this.$emit('update:active', val)
      }
    }
  }
}
```
### 组件注册
`@Component`可以接受参数，我们可以在其中传入`Components`，我们以`App.vue`为例：
```ts
import MHeader from '@/components/header/index.vue'
import MTab from '@/components/tab/index.vue'
import Player from '@/components/player/index.vue'
import { Component, Vue } from 'vue-property-decorator'
@Component({
  components: {
    MHeader,
    MTab,
    Player
  }
})
export default class App extends Vue {
}
```
### 计算属性
如果你对`class`有一点了解的话，那么你会非常容易理解计算属性的写法，这里以`@/components/player/index.vue`组件代码为例：
```ts
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class MPlayer extends Vue {
  private get percent () {
    return this.currentTime / this.currentSong.duration
  }
  private set percent (percent: number) {
    this.currentTime = percent * this.currentSong.duration
    this.currentLyric && this.currentLyric.seek(this.currentTime * 1000)
  }

  private get playIcon () {
    return this.playing ? 'icon-pause' : 'icon-play'
  }
  private get miniPlayIcon () {
    return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
  }
}
```
根据以上代码我们可以发现：
* `percent`、`playIcon`和`miniPlayIcon`都定义了属性的`get`方法，当访问属性的时候触发此属性的`get`方法，然后返回此方法的返回值。
* `percent`除了`get`，还定义了`set`。一般而言我们不用去定义计算属性的`set`，上面代码定义`set`是为了处理其他业务逻辑。其中`set`里面的逻辑完全可以使用`Watch('percent')`去改写：
```js
import { Component, Vue, Watch } from 'vue-property-decorator'
@Component
export default class MPlayer extends Vue {
  @Watch('percent')
  onPercentChange (percent: number) {
    this.currentTime = percent * this.currentSong.duration
    this.currentLyric && this.currentLyric.seek(this.currentTime * 1000)
  }
  private get percent () {
    return this.currentTime / this.currentSong.duration
  }
  private get playIcon () {
    return this.playing ? 'icon-pause' : 'icon-play'
  }
  private get miniPlayIcon () {
    return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
  }
}
```
### 获取Getters和属性监听
可以使用`@Watch`来监听某一个变量，这里依然以`@/components/player/index.vue`组件代码为例：
```ts
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Getter} from 'vuex-class'
@Component
export default class MPlayer extends Vue {
  @Getter('playing') playing!: boolean
  @Watch('playing')
  onPlayingChange (playing: boolean) {
    playing ? this.audio.play() : this.audio.pause()
  }
}
```
以上代码相当于：
```js
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['playing']),
  },
  watch: {
    playing (playing) {
      playing ? this.audio.play() : this.audio.pause()
    }
  }
}
```
### 获取Mutations和Actions
获取`Mutation`和`Action`与获取`Getters`形式类似，以`@/components/player/index.vue`组件代码为例：
```ts
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Mutation, Action} from 'vuex-class'
@Component
export default class MPlayer extends Vue {
  @Mutation('player/SET_FULL_SCREEN') setFullScreen!: (fullscreen: boolean) => void
  @Mutation('player/SET_CURRENT_INDEX') setCurrentIndex!: (index: number) => void
  @Action('history/setPlayHistory') setPlayHistory!: (song: Song) => void
}
```
以上代码相当于：
```js
import { mapMutations, mapActions } from 'vuex'
export default {
  methods: {
    ...mapMutations({
      setFullScreen: 'player/SET_FULL_SCREEN',
      setCurrentIndex: 'player/SET_CURRENT_INDEX'
    })
    ...mapActions({
      setPlayHistory: 'history/setPlayHistory'
    })
  }
}
```
### 组件Mixin
组件`mixin`有2种方式，第一种可以在`@Component`里面传递`mixins`参数，第二种可以使用`Mixins`装饰器，然后让组件去`extends`，以`@views/search/index.vue`代码为例：
```ts
import Search from '@/assets/js/search'
import PlayList from '@/assets/js/playList'
import { Component, Mixins, Vue } from 'vue-property-decorator'
@Component({
  mixins: [Search, PlayList]
})
export default class MSearch extends Vue {
}
// 省略其它代码
```
**注意**：这种`mixin`方式，可以正常运行，但是`TypeScript`可能会提示找不到`mixins`模块里面的某个方法或者属性，我们更推荐使用第二种方式。

```ts
import Search from '@/assets/js/search'
import PlayList from '@/assets/js/playList'
import { Component, Mixins } from 'vue-property-decorator'
@Component
export default class MSearch extends Mixins(Search, PlayList) {
  // 省略其它代码
}
```
### Ref类型
`vue-property-decorator`提供了`Ref`装饰器，我们可以使用这个装饰器来获取`refs`，这里以`src/views/search/index.vue`组件为例：
```js
import { Component, Mixins, Ref } from 'vue-property-decorator'
@Component
export default class MSearch extends Mixins(Search, PlayList) {
  @Ref('search') readonly searchRef!: HTMLElement
  @Ref('searchBox') readonly searchBoxRef!: SearchBox
  @Ref('searchScroll') readonly searchScrollRef!: Scroll
  @Ref('searchSuggestion') readonly searchSuggestionRef!: Suggestion
  @Ref('searchSuggestionBox') readonly searchSuggestionBoxRef!: HTMLElement
  
  // 省略其它
}
```
以上代码相当于：
```js
export default {
  mounted () {
    this.searchRef = this.$refs.search
    this.searchBoxRef = this.$refs.searchBox
    this.searchScrollRef = this.$refs.searchScroll
    this.searchSuggestionRef  = this.$refs.searchSuggestion
    this.searchSuggestionBoxRef = this.$refs.searchSuggestionBox
  }
  // 省略其它
}
```
当然如果你的组件及其简单，不用担心命名冲突问题的话，可以不给`Ref`传递参数，例如：
```js
import { Component, Ref, Vue } from 'vue-property-decorator'
@Component
export default class Search extends Vue {
  @Ref() readonly button!: HTMLButtonElement  
  // 省略其它
  private mounted () {
    console.log(this.button)
  }
}
```



## Jest和Vue-Test-Utils准备知识
**注意**：此部分只涉及项目中已经使用过的知识，更多内容请阅读其官方文档。

## 重难点功能分析
### 推荐页面
### 歌手页面
### 搜索页面
### 播放器页面
### 个人中心页面


## 后序计划
* 骨架屏Skeleton
* 换肤
* Vue3.0重构
