#!/usr/bin/env node
const inquirer = require('inquirer')
const path = require('path')
const fs = require('fs')
const CFonts = require('cfonts');
const shell = require('shelljs');
const process = require('progress')
const yn = require('yn');
const request = require('axios')
const _ = require('underscore')
const ejs = require('ejs')



async function main() {
    var api_source = await inquirer.prompt({
        type:'input',
        name:'api_source',
        message:'请输入数据源?'
    })
    api_source = api_source.api_source

    var res =await request.get(api_source)

    var data = res.data


    var data_root = await inquirer.prompt({
        type:'list',
        name:'root',
        message:'请选择数据根节点',
        choices:_.keys(data)
    })

    var data_root = data_root.root

    var data_list = data[data_root]

    var data_keys = _.keys(data_list[0])

    var data_map = []

    async function get_select() {
        var select = []
        async function logic() {
            var goon = await inquirer.prompt({
                type:'confirm',
                message:'是否添加option ?',
                name:'goon',
                default:true
            })
            goon = goon.goon
            if(goon){
                var value = await inquirer.prompt(
                    {
                        type:'input',
                        message:'请输入这个option的vaule',
                        name:'value'
                    }
                )
                value = value.value

                var label = await inquirer.prompt(
                    {
                        type:'input',
                        message:'请输入这个option的label',
                        name:'label',
                        default:value
                    }
                )
                label = label.label

                select.push({
                    value:value,
                    label:label,
                })
                await logic()
            }
        }
        await logic()
        return select
    }
    
    async function get_checkbox() {
        var checkbox = []
        async function logic() {
            var goon = await inquirer.prompt({
                type:'confirm',
                message:'是否添加checkbox label ?',
                name:'goon',
                default:true
            })
            goon = goon.goon
            if(goon){


                var label = await inquirer.prompt(
                    {
                        type:'input',
                        message:'请输入这个checkbox的label',
                        name:'label',
                    }
                )
                label = label.label
                checkbox.push({
                    label,
                })
                await logic()
            }
        }
        await logic()
        return checkbox
    }
    
    async function get_radio() {
        var radio = []
        async function logic() {
            var goon = await inquirer.prompt({
                type:'confirm',
                message:'是否添加checkbox label ?',
                name:'goon',
                default:true
            })
            goon = goon.goon
            if(goon){


                var label = await inquirer.prompt(
                    {
                        type:'input',
                        message:'请输入这个checkbox的label',
                        name:'label',
                    }
                )
                label = label.label
                radio.push({
                    label,
                })
                await logic()
            }
        }
        await logic()
        return radio
    }
    





    for(var i=0;i<  data_keys.length;i++){


        var type = await inquirer.prompt({
            type:'list',
            name:'type',
            message:'请选择数据'+ data_keys[i]+ '类型',
            default:'input',
            choices:['input','select','checkbox','switch','radio','hidden',]
        })
        


        var label = await inquirer.prompt({
            type:'input',
            name:'label',
            message:'请输入数据'+ data_keys[i]+ ' label',
            default:data_keys[i]
        })
        
        var obj = {
            name:data_keys[i],
            label:label.label,
            type:type.type
        }
        if(obj.type == 'select'){
            obj.select =await get_select()
        }
        if(obj.type == 'checkbox'){
            obj.checkbox = await get_checkbox()
        }
        if(obj.type == 'radio'){
            obj.radio = await get_radio()
        }
        data_map.push(obj)
    }
    console.log(data_map)
    var filename = api_source.split('/').filter(function (item) {
        return !!item
    })
    ejs.renderFile(path.join(__dirname,'vue_template.ejs'),
        {
            data_keys:data_keys,
            data_root :data_root,
            api_source:api_source,
            data_map:data_map,
            name:filename[filename.length-1]
        },{},
        function (err, str) {
            console.log(err)
            filename = filename[filename.length-1]+'.vue'
            fs.writeFileSync(path.join(__dirname,filename),str)
        }
    )

}

main()