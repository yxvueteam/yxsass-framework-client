#yx-checkbox-group


> 多选框组

* 使用方法

    ``` <yx-checkbox-group :value="checkList"
                              :optList="optList"
                              direction="row"
                              :isShowCheckAll="true"
                              size="big"
                              checkedColor="red"
                              unCheckedColor="grey"
                              checkedIcon="icon-kulian"
                              unCheckedIcon="icon-arrow-left"
                              marginTop="20px"
                              width="100px"
                              @change="onCheckboxChange"></yx-checkbox-group>
    ```

---
* 参数

| 参数名 | 类型 | 是否必须 | 默认值 | 描述 |
| ---- |:----:|:---:|:-------:| :----------:|
|`value`| `Array` | `Y` | `[]` | 已选项数组 |
|`optList`| `Array` | `Y` | `[]` | 选项数组 |
|`direction`| `String` | `N` | `row` |选项排列方向 row column|
|`isShowCheckAll`| `Boolean` | `N` | `false` | 是否显示全选 |
|`size`| `String` | `N` | `normal` | 大小样式：`big`/`normal`/`small`|
|`checkedColor`| `String` | `N` | `#409eff` | 选中颜色 |
|`unCheckedColor`| `String` | `N` | `#5f5f5f` | 未选中颜色 |
|`checkedIcon`| `String` | `N` | `icon-circle-check` | 选中图标 |
|`unCheckedIcon`| `String` | `N` | `icon-circle-check1` | 未选中图标 |
|`marginTop`| `String` | `N` | `10px` | 每一项离上边的间距 |
|`width`| `String` | `N` | `80px` | 每项的宽度 |
|`change`| `EventHandle` | `N` | `-` | 监听选项改变事件 |

---

 
