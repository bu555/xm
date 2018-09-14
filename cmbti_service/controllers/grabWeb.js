var http = require("http");  //http模块不能读取ssl加密的https页面，,需要使用request模块替代
var iconv = require('iconv-lite');  //网页非utf-8时，iconv根据网页chartset转码(解决乱码问题)
var cheerio = require('cheerio');  //使用cheerio，相当于使用jQuery操作页面
var request=require('request');  //针对https页面
var fs = require('fs');  
var path=require('path'); 
var myUtill = require('../models/utill')
var fm = require('formidable');
// var url = 'https://baike.baidu.com/item/%E6%AF%9B%E6%B3%BD%E4%B8%9C/113835' ;
// var url = 'https://baike.baidu.com/item/%E5%88%98%E5%BE%B7%E5%8D%8E/114923' ;

class GrabWeb{
    constructor(){

    }
    static http(){
        http.get(url, function(res){  
            var arrBuf = []; //存储文本数据 
            //监听data事件，传入的数据
            res.on("data", function(chunk){  
                arrBuf.push(chunk);  //存储响应的文本
            })  
            .on("end", function(){  //end事件，全部接收完就触发
                var chunkAll = Buffer.concat(arrBuf, bufLength); //Buffer的concat方法将一组Buffer对象合并为一个Buffer对象（bufLength可选参数，指定合并后Buffer对象的总长度）。  
                var strJson = iconv.decode(chunkAll,'gb2312');    //iconv根据网页chartset转码(解决乱码问题)
                var $ = cheerio.load(strJson);  //使用cheerio，相当于使用jQuery操作页面(相当于$(html))
                
                // var str = $('body a').text();
                // var date =$('.item').eq(2).children().eq(3).children('a').text()+'\n';
                // var buff1=new Buffer(str+date+"\n"); 
                // //写入文件
                // fs.appendFile(path.join(__dirname,'./txt'),buff1,function(){  
                //     console.log('写入完毕2');  
                // });  
            })
        });  
    }
    //爬取百度百科人物信息{name:'',url:''}
    static https(options){
        let _this = this
        return new Promise((resolve,reject)=>{
            let url
            // 根据url 或name
            if(options.url){
                url = options.url
            }else if(options.name) {
                url = 'https://baike.baidu.com/item/'+encodeURI(options.name)
            }else{
                resolve(null)
            }
            request.get({url:url,encoding:null},function(err,response,body){
                if(!err&&response.statusCode == 200){
                    // var buf =  iconv.decode(body, 'utf-8');  
                    var $=cheerio.load(body);  
                    // 注：不同页面会使用不同标签
                    var flag1 = $('body .polysemantList-header-title').text().replace(/[\s\r\n]/g,'').indexOf('是一个多义词，请在下列义项上选择浏览（共')
                    var flag2 = $('body .lemmaWgt-subLemmaListTitle').text().replace(/[\s\r\n]/g,'').indexOf('是一个多义词，请在下列义项上选择浏览（共')
                    // 如果是多义词
                    if( (flag1>-1 || flag2>-1) && !options.polysemantList){ //polysemantList:判定是否是多义词
                        let proList = []
                        let lis = ''
                        // 获取多义词a标签链接 （注：不同页面会使用不同标签，针对性处理）
                        if(flag1>-1){
                            lis = $('body .polysemantList-wrapper .item').children('a')  //flag1
                        }else if(flag2>-1){
                            lis = $('body .custom_dot .list-dot .para').children('a')
                        }
                        for(let i=0;i<lis.length;i++){
                            let url = $(lis[i]).attr('href')
                            if(url){
                                url = 'https://baike.baidu.com'+url
                                proList.push(_this.https({url:url,polysemantList:true}))
                            }
                        }
                        // 当前页数据
                        let currentData = getData($)
                        Promise.all(proList).then(data=>{
                            data.unshift(currentData)  //把当前数据添加到最前面
                            data = data.filter(function(val){ return val!==null }); //过滤空、无效数据
                            resolve(data)
                        })
                    // 不是多义词
                    }else{
                        resolve(getData($));
                    }
                    
                } 
            })
        })
        // 处理页面数据函数
        function getData($){
                let d = null
                let basicInfoName = $('body .basicInfo-item.name').text().replace(/[\s\r\n]+/g,'') 
                // 判断是否包含“国籍”，识别是否是人名  中文名国籍民族出生日期毕业院校参加工作时间籍贯学历/学位
                // if(basicInfoName.indexOf('国籍')==-1 || basicInfoName.indexOf('国籍')==-1){
                if(!/国籍|谥号|民族/.test(basicInfoName) ){
                    return d   //非人名词条，返回空
                }
                let name = $('body .lemmaWgt-lemmaTitle-title').children('h1').text()  //主名字
                let name1 = $('body .lemmaWgt-lemmaTitle-title').children('h2').text() //副名字
                let info = $('body .lemma-summary div').eq(0).text(); //简介信息
                if(info){
                    if(info.length<150){
                        info += $('body .lemma-summary div').eq(1).text().trim();
                        info = info.substr(0,180)+".....";   //截取简介信息长度
                    }else{
                        info += "....."
                    }
                }
                let imgURL = '';
                // 获取图片 （不同页面标签有差异）
                if($('body .summary-pic img').attr('src')){
                    imgURL = $('body .summary-pic img').attr('src');
                }else if($('body .album-wrap img').attr('src')){
                    imgURL = $('body .album-wrap img').attr('src');
                }
                if(imgURL && info && name){
                    d = {
                            imgURL:imgURL,
                            info:info,
                            name:name,
                            name1:name1?name1:'', //名字标题
                            tag: '', 
                            birth: '',
                            conste: '', //星座
                    }
                }
                return d
        }
    }
    //保存网络图片 {url:''，type:'avatar/example/article'}
    static downloadNetworkImage(options){
        // request(url).pipe(fs.createWriteStream(path.join(__dirname,'../','public','mzd.jpg')));
        // var writeStream=fs.createWriteStream('./mo/'+'error.jpg',{autoClose:true})
        return new Promise((resolve,reject)=>{
            // var hash = myUtill.randomString(1);
            // 构造文件夹名称
            var date = new Date()
            var year = date.getFullYear().toString().substr(2)
            var month = date.getMonth()+1
            month = month<10 ? '0'+String(month) : String(month)
            let type = 'other/'
            switch(options.type){
                case 'avatar':
                type = 'avatar/'
                break
                case 'example':
                type = 'example/'
                break
                case 'article':
                type = 'article/'
                break
                default:
                break
            }
            let dirName = '/upload/'+ type + year + month+'/'  // 目录名 /upload/type/1809/
            let fileName = Date.now().toString().substr(1)+'.jpg'  //文件名 539043200000.jpg
            fs.exists(path.join( process.cwd() , dirName ),function(exists){
                if(exists){
                    save()
                }
                if(!exists){
                    // 创建目录
                    fs.mkdir( path.join( process.cwd() , dirName ),function(err){
                        if (!err) {
                            save()
                        }else{
                            reject('创建文件目录失败')
                        }
                    });
                }
            })
            
            function save(){
                var writeStream = fs.createWriteStream(path.join( process.cwd() , dirName+fileName ),{autoClose:true})
                request(options.imgURL).pipe(writeStream);
                writeStream.on('finish',function(){
                    resolve(dirName+fileName) //返回图片路径
                })
            }
        })
    }
    //保存上传的文件\图片  {fileName:'8.jpg',req:req,type:'example/avatar/article'}
    static saveUploadFile({options}){
        return new Promise((resolve,reject)=>{
            let req = options.req
            let uploadDir = ''
            if(options.type==='avatar'){ //图片文件
                uploadDir = '/upload/avatar/' 
            }else{
                var date = new Date()
                var year = date.getFullYear().toString().substr(2)
                var month = date.getMonth()+1
                month = month<10 ? '0'+String(month) : String(month)
                let type = '/other'
                switch(options.type){
                    case 'example':
                    type = '/example'
                    break
                    case 'article':
                    type = '/article'
                    break
                    default:
                    break
                }
                uploadDir = '/upload'+ type + '/'+year + month  // 目录名 /upload/type/1809
            }            
            fs.exists(path.join( process.cwd() , uploadDir ),function(exists){
                if(exists){
                    save()
                }
                if(!exists){
                    // 创建目录
                    fs.mkdir( path.join( process.cwd() , uploadDir ),function(err){
                        if (!err) {
                            save()
                        }else{
                            reject('创建文件目录失败')
                        }
                    });
                }
            })
            function save(){
                var form = new fm.IncomingForm();
                form.uploadDir = uploadDir
                form.fileName = options.fileName
                form.parse(req);
                form.on('end',function(){
                    resolve(form.uploadDir+form.fileName) //返回路径
                })
                form.on('error',function(){
                    reject('处理失败！')
                })
                form.on('file',function(field,file){//file是上传的文件
                    fs.renameSync(file.path,path.join( process.cwd(),form.uploadDir,form.fileName))
                })
            }
        })
    }
    //上传文件
    static uploadFile(url){
        fs.createReadStream('file.json').pipe(request.put(url));
        // 将下载到的文件上传
        // request.get('http://google.com/img.png').pipe(request.put('http://mysite.com/img.png'))
    }
    //验证图片长宽
    static checkImg(url){
        let pro = new Promise((resolve,reject)=>{
            // 创建对象
            var img = new Image();
            // 改变图片的src
            img.src = url;
            // 加载完成执行
            img.onload = function(){
                // 打印
                if(img.width>img.height){
                    reject();
                }else{
                    resolve();
                }
            }
        })
        return pro;
    }
}
module.exports = GrabWeb;