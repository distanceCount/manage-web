<template>
    <!--注意：template下只有一个div-->
    <div>

            <v-layout row wrap>
                <v-flex xs6>
                    <v-btn color="primary" round>品牌添加</v-btn>
                </v-flex>

                <v-flex xs6>
                    <v-text-field
                            label="搜索"
                            prepend-icon="search"
                            v-model="searchKey"
                    ></v-text-field>
                </v-flex>

            </v-layout>
        <!--
            :headers: 表格的表头属性
            :items: 表格的数据内容（获取一个数组）
            :pagination: 分页条
            :total-items： 总记录数
            :loading: 加载进度条
        -->
        <v-data-table
                :headers="headers"
                :items="desserts"
                :pagination.sync="pagination"
                :total-items="totalDesserts"
                :loading="loading"
                class="elevation-1"
        >
            <template v-slot:items="props">
                <td class="text-xs-center">{{ props.item.id }}</td>
                <td class="text-xs-center">{{ props.item.name }}</td>
                <td class="text-xs-center"><img :src="props.item.image"/></td>
                <td class="text-xs-center">{{ props.item.letter }}</td>
            </template>
        </v-data-table>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                totalDesserts: 0,
                desserts: [],
                loading: true,
                pagination: {},
                headers: [
                    { text: '品牌编号', align:'center', value: 'id' },
                    { text: '品牌名称', align:'center', value: 'name' , sortable:false},
                    { text: '品牌图片', align:'center', value: 'image' , sortable:false},
                    { text: '品牌首字母', align:'center',  value: 'letter', sortable:false },
                ],
                searchKey:''//搜索关键词
            }
        },
        //监控属性
        watch:{
            //搜索关键词的变化
            "searchKey":{
                handler(){
                    //调用查询品牌数据
                    this.loadBrandData();
                }
            },
            //监控分页数据的变化
            "pagination":{
                deep:true,//注意：如果监控的是一个对象的属性，那么必须开启深度监控：deep:true
                handler(){
                    //调用查询品牌数据
                    this.loadBrandData();
                }
            }
        },

        mounted () {
            //调用查询品牌数据
            this.loadBrandData();
        },
        methods: {
            //查询品牌分页列表
            loadBrandData(){

                //发送异步请求获取数据
                this.$http.get('/item/brand/page',{
                    params:{
                        page:this.pagination.page,
                        rows:this.pagination.rowsPerPage,
                        key:this.searchKey,
                        sortBy:this.pagination.sortBy,
                        desc:this.pagination.descending
                    }
                }).then(resp=>{
                    //数据填充
                    //数据列表
                    this.desserts = resp.data.items;
                    //总记录数
                    this.totalDesserts = resp.data.total;
                    //进度条取消
                    this.loading=false;
                }).catch(e=>{
                    console.log('品牌数据加载失败');
                });
            }
        }
    }
</script>