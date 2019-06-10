#yx-button


> 按钮组件

* 使用方法

    ```<yx-button :plain="false"
                      :disabled="false"
                      :loading="false"
                      text="按钮"
                      :btnStyle="{'background-color':'red'}"
                      :textStyle="{'font-size':'16px'}"
                      @click="onClickBtn"></yx-button>
    ```

---
* 参数

| 参数名 | 类型 | 是否必须 | 默认值 | 描述 |
| ---- |:----:|:---:|:-------:| :----------:|
|`plain`| `Boolean` | `N` | `false` | 是否镂空 |
|`disabled`| `Boolean` | `N` | `false` | 是否禁用 |
|`loading`| `Boolean` | `N` | `false` | 是否显示loading转圈  |
|`text`| `String` | `N` | `确认` | 按钮文字 |
|`btnStyle`| `Object` | `N` | `{}` | 按钮样式 |
|`textStyle`| `Object` | `N` | `{}` | 按钮文字样式 |
|`click`| `EventHandle` | `N` | `-` | 点击事件 |

---

 
