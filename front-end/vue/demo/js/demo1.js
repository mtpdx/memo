/* 
过滤器: 格式化日期, name首字母大写
自定义指令: 获取表单焦点
计算属性: 统计英雄数量
侦听器: 验证英雄是否存在
生命周期: 英雄数据处理
*/

Vue.filter('format_d', function (value, format) {
    return dateFormat(value, format);
});
Vue.filter('format_n', function (value) {
    return value.charAt(0).toUpperCase() + value.slice(1)
});

// 全局自定义指令
// Vue.directive('focus', {
//     inserted : function(el){
//         el.focus();
//     }
// });

var vm = new Vue({
    el: "#app",
    data: {
        title: '<span style="color:#fd6363">Legendre</span>',
        id: '',
        name: '',
        flag: false,
        submitFlag: false,
        heroes: [],
    },
    methods: {
        del_hero: function (id) {
            console.log(id);

            this.heroes = this.heroes.filter((hero) => {
                return hero.id != id
            })
        },
        submit: function () {
            if (this.flag) {
                if (this.name == '') {
                    alert('name is null');
                    return
                }
                this.heroes.some((item) => {
                    if (item.id == this.id) {
                        item.name = this.name
                        return true
                    }
                })
                this.flag = false
            } else {
                if (this.id == '' || this.name == '') {
                    alert('id or name is null');
                    return
                }

                if (this.heroes.some((item) => { return this.id == item.id })) {
                    alert('id repeat')
                    return
                }
                this.heroes.push({
                    id: this.id,
                    name: this.name,
                    date: new Date()
                });
            }

            this.id = ''
            this.name = ''

        },
        modify_hero: function (id) {
            this.flag = true
            hero_list = this.heroes.filter((item) => {
                return item.id == id
            })
            if (hero_list.length > 0) {
                this.id = hero_list[0].id
                this.name = hero_list[0].name
            }

        }
    },
    directives: {
        focus: {
            inserted: function (el) {
                el.focus();
            }
        }
    },
    computed: {
        total: function () {
            return this.heroes.length;
        }
    },
    watch: {
        name: function (val) {
            console.log(val);

            var f = this.heroes.some((item) => {
                return val == item.name;
            });
            console.log(f);

            this.submitFlag = f;
        }
    },
    mounted: function () {
        var data = [
            {
                id: 1,
                name: 'Fiora',
                date: 2525609975000
            },
            {
                id: 2,
                name: 'Riven',
                date: 2525609975000
            },
            {
                id: 3,
                name: 'Liqing',
                date: 2525609975000
            },
        ];
        this.heroes = data;
    }
});

