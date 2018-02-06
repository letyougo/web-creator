<template>
    <div class="teacher">

        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/school_list' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>考试办列表</el-breadcrumb-item>

        </el-breadcrumb>
        <br/>


        <el-form :inline="true" class="demo-form-inline" :loading="loading" size="mini">

            <el-form-item label="姓名">
                <el-input v-model="search" placeholder="输入姓名查询"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button-group>
                    <el-button type="primary" @click="fetch" size="mini">查询</el-button>
                    <el-button @click="add_form.visible=true" size="mini">增加考试办</el-button>

                </el-button-group>
            </el-form-item>

        </el-form>


        <el-table
                :data="list"
                style="width: 100%"
                border
                size="mini"
                v-loading="loading"
        >


            <el-table-column label="序号">
                <template scope="scope">
                    {{scope.$index+(page_num-1)*page_size+1}}
                </template>
            </el-table-column>

            
            
            <el-table-column prop="id" label="id"></el-table-column>
            
            
            
            <el-table-column prop="name" label="name"></el-table-column>
            
            
            
            <el-table-column prop="phone" label="phone"></el-table-column>
            
            
            
            <el-table-column prop="province" label="province"></el-table-column>
            
            
            
            <el-table-column prop="location" label="location"></el-table-column>
            
            
            
            <el-table-column prop="idcard" label="idcard"></el-table-column>
            
            
            
            <el-table-column prop="sex" label="sex"></el-table-column>
            
            
            
            <el-table-column prop="bankcard" label="bankcard"></el-table-column>
            
            
            
            <el-table-column prop="school_id" label="school_id"></el-table-column>
            
            
            
            <el-table-column prop="id_card" label="id_card"></el-table-column>
            
            

            <el-table-column label="操作" width="190">
                <template scope="scope">
                    <el-button-group>
                        <el-button type="danger" @click="remove(scope.row)" size="mini">删除</el-button>
                        <el-button @click="open_edit(scope.row)" size="mini">编辑</el-button>
                    </el-button-group>

                </template>
            </el-table-column>
        </el-table>


        <el-dialog title="新增" :visible.sync="add_form.visible"
        >
            <el-form class="demo-form-inline" label-width="100px" :model="add_form" status-icon size="mini"
                     ref="add_form">

                
                
                <el-table-column prop="id" label="id"></el-table-column>
                <el-form-item label="id" prop="id">
                    
                        <el-input v-model="add_form.id"></el-input>
                    
                </el-form-item>
                
                
                
                <el-table-column prop="name" label="name"></el-table-column>
                <el-form-item label="name" prop="name">
                    
                        <el-input v-model="add_form.name"></el-input>
                    
                </el-form-item>
                
                
                
                <el-table-column prop="phone" label="phone"></el-table-column>
                <el-form-item label="phone" prop="phone">
                    
                        <el-input v-model="add_form.phone"></el-input>
                    
                </el-form-item>
                
                
                
                <el-table-column prop="province" label="province"></el-table-column>
                <el-form-item label="province" prop="province">
                    
                        <el-input v-model="add_form.province"></el-input>
                    
                </el-form-item>
                
                
                
                <el-table-column prop="location" label="location"></el-table-column>
                <el-form-item label="location" prop="location">
                    
                        <el-input v-model="add_form.location"></el-input>
                    
                </el-form-item>
                
                
                
                <el-table-column prop="idcard" label="idcard"></el-table-column>
                <el-form-item label="idcard" prop="idcard">
                    
                        <el-input v-model="add_form.idcard"></el-input>
                    
                </el-form-item>
                
                
                
                <el-table-column prop="sex" label="sex"></el-table-column>
                <el-form-item label="sex" prop="sex">
                    
                        <el-input v-model="add_form.sex"></el-input>
                    
                </el-form-item>
                
                
                
                <el-table-column prop="bankcard" label="bankcard"></el-table-column>
                <el-form-item label="bankcard" prop="bankcard">
                    
                        <el-input v-model="add_form.bankcard"></el-input>
                    
                </el-form-item>
                
                
                
                <el-table-column prop="school_id" label="school_id"></el-table-column>
                <el-form-item label="school_id" prop="school_id">
                    
                        <el-input v-model="add_form.school_id"></el-input>
                    
                </el-form-item>
                
                
                
                <el-table-column prop="id_card" label="id_card"></el-table-column>
                <el-form-item label="id_card" prop="id_card">
                    
                        <el-input v-model="add_form.id_card"></el-input>
                    
                </el-form-item>
                
                

            </el-form>


            <span slot="footer" class="dialog-footer">
          <el-button @click="add_form.visible=false" size="mini">取 消</el-button>
          <el-button type="primary" @click="add" size="mini">确 定</el-button>
        </span>
        </el-dialog>


        <el-dialog title="编辑" :visible.sync="edit_form.visible"
        >
            <el-form class="demo-form-inline" label-width="100px" :model="edit_form" status-icon size="mini"
                     ref="edit_form">

                
                

                <el-form-item label="id" prop="id">
                    
                    <el-input v-model="add_form.id"></el-input>
                    
                </el-form-item>
                
                
                

                <el-form-item label="name" prop="name">
                    
                    <el-input v-model="add_form.name"></el-input>
                    
                </el-form-item>
                
                
                

                <el-form-item label="phone" prop="phone">
                    
                    <el-input v-model="add_form.phone"></el-input>
                    
                </el-form-item>
                
                
                

                <el-form-item label="province" prop="province">
                    
                    <el-input v-model="add_form.province"></el-input>
                    
                </el-form-item>
                
                
                

                <el-form-item label="location" prop="location">
                    
                    <el-input v-model="add_form.location"></el-input>
                    
                </el-form-item>
                
                
                

                <el-form-item label="idcard" prop="idcard">
                    
                    <el-input v-model="add_form.idcard"></el-input>
                    
                </el-form-item>
                
                
                

                <el-form-item label="sex" prop="sex">
                    
                    <el-input v-model="add_form.sex"></el-input>
                    
                </el-form-item>
                
                
                

                <el-form-item label="bankcard" prop="bankcard">
                    
                    <el-input v-model="add_form.bankcard"></el-input>
                    
                </el-form-item>
                
                
                

                <el-form-item label="school_id" prop="school_id">
                    
                    <el-input v-model="add_form.school_id"></el-input>
                    
                </el-form-item>
                
                
                

                <el-form-item label="id_card" prop="id_card">
                    
                    <el-input v-model="add_form.id_card"></el-input>
                    
                </el-form-item>
                
                



            </el-form>


            <span slot="footer" class="dialog-footer">
          <el-button @click="edit_form.visible=false" size="mini">取 消</el-button>
          <el-button type="primary" @click="edit" size="mini">确 定</el-button>
        </span>
        </el-dialog>


        <br>
        <div style="display: inline-block;float: right">
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="total"
                    @current-change="(p)=>page_num=p"
                    :current-page="page_num"
                    :page-size="page_size"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>


    import Promise from 'bluebird'

    export default {

        name: 'aaa',
        data() {
            return {
                rules: rules,
                list: [],
                total: 0,
                search: '',
                page_size: 10,
                page_num: 1,
                loading: false,
                add_form: {
                    
                        id:'',
                        name:'',
                        phone:'',
                        province:'',
                        location:'',
                        idcard:'',
                        sex:'',
                        bankcard:'',
                        school_id:'',
                        id_card:'',
                    },
                edit_form: {
                
                    id:'',
                    name:'',
                    phone:'',
                    province:'',
                    location:'',
                    idcard:'',
                    sex:'',
                    bankcard:'',
                    school_id:'',
                    id_card:'',
                },
            }
        },

        watch: {
            page_num() {
                this.fetch()
            }
        },

        methods: {
            change_page(p) {
                console.log(p)
            },
            open_edit(data) {
                console.log(data)
                var change_password = this.edit_form.change_password
                data.visible = true

                this.edit_form = {
                
                    id:data.id,
                    name:data.name,
                    phone:data.phone,
                    province:data.province,
                    location:data.location,
                    idcard:data.idcard,
                    sex:data.sex,
                    bankcard:data.bankcard,
                    school_id:data.school_id,
                    id_card:data.id_card,
            }
            },
            async fetch() {

                var page_size = this.page_size,
                    page_num = this.page_num,
                    search = this.search,
                    that = this
                this.loading = true
                var response = await request.get('http://123.56.3.23:8888/func/aaa/', {
                    params: {
                        page_size,
                        page_num,
                        search
                    }
                })
                this.list = response.data.list
                    var
                page = response.data.page
                this.page_num = page.page_num
                this.page_size = page.page_size
                this.total = page.total
                this.loading = false
            },
            async add() {

                try {
                    await this.su_validate('add_form')
                    var add_form = this.add_form
                    var response = await request.post('http://123.56.3.23:8888/func/aaa/', add_form)
                    this.add_form.visible = false
                    this.$message({
                        type: 'success',
                        message: '添加数据成功'
                    });
                    this.fetch()
                } catch (e) {
                    this.$message({
                        type: 'error',
                        message: e.error
                    });
                }

            },
            async remove(data) {

                try {
                    await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    })
                    var response = await request.delete('http://123.56.3.23:8888/func/aaa/' + data.id + '/')

                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.fetch()
                } catch (e) {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                }

            },
            async edit() {
                try {
                    await this.su_validate('edit_form')
                    var edit_form = this.edit_form
                    var id = edit_form.id
                    this.$message({
                        type: 'success',
                        message: '修改信息成功!'
                    });
                    var response = await request.put('http://123.56.3.23:8888/func/aaa/' + id + '/', edit_form)
                    this.edit_form.visible = false
                    this.fetch()
                } catch (e) {
                    this.$message({
                        type: 'error',
                        message: e.error
                    });
                }
            }
        },
        mounted() {
            this.fetch()
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
