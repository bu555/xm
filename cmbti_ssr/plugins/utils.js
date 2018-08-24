import Cookie from 'js-cookie'
export default {
    // 聰 单位轉換  {satoshi:聰數量，Bitcoin:{quotes:價格，currency:幣種名稱}
    fMoney(satoshi,Bitcoin){
        if(Bitcoin){
            let quotes=Bitcoin.quotes
            let currency=Bitcoin.currency
            // currency = currency==='USD'?"US$":currency
            // currency = currency==='CNY'?"CN¥":currency
            let negative = ''  //如果為負數
            if(satoshi<0){
                negative = '-'
                satoshi = -1*satoshi
            }
            let reg = /(^0$)|(^[1-9]+\d*(\.\d+)?$)|(^0\.\d+$)/  //匹配0 整數 小數
            if( !reg.test(satoshi) ) return ''
            // if( satoshi==0 ) return '0聰(~'+currency+'0)'
            if(quotes){
                if( !reg.test(quotes) ) return ''
            }else{
                return ''
            }
            let money = satoshi/100000000 * quotes
            satoshi = satoshi.toLocaleString()
            // return '<span style="font-size:15px">'+satoshi+'</span><span style="font-size:12px">sBTC ≈ '+fPoint(money,2)+currency+'</span>'
            // return satoshi+'<sub style="bottom:-.1em;margin-left:.2em">sBTC ≈ '+fPoint(money,2)+currency+'</sub>'
            return `<ul style="display:flex;margin:0;justify-content: center;">
                <li style=";text-align:center">${negative+satoshi}<sub style="bottom:-.1em;margin-left:.1em">sBTC</sub>
                </li>
                <li style=";text-align:center;padding:0 .4em">≈</li>
                <li style=";text-align:center">${negative+fPoint(money,2)}<sub style="bottom:-.1em;margin-left:.1em">${currency}</sub>
                </li>
            </ul>`
        }else if(satoshi||satoshi==0){
            // return satoshi.toLocaleString()+'sBTC'+'<i class="el-icon-loading"></i>'
            return `<ul style="display:flex;margin:0;justify-content: center;">
                <li style="flex:100;text-align:center">${satoshi.toLocaleString()}<sub style="bottom:-.1em;margin-left:.1em">sBTC <i class="el-icon-loading"></i></sub>
                </li>
            </ul>`
        }
        // 千位逗號分割+向下取整+小數保留  params: 數量，保留小數
        function fPoint(num,decimal=2){
                // num = num.toFixed(decimal)
                let coef = Math.pow(10,decimal) 
                num = (Math.round(num*coef)/coef).toFixed(decimal)   //向下取整
                num = parseFloat(num)
                num = num.toLocaleString();
                if(num.indexOf('.')<0){
                    num = num+'.00'
                }else{
                    num = num.split('.')[1].length<decimal ? num+'0':num
                }
                return num;
        }
    },
    // 去除两端空白 中间空白合并..
    strTrim(str){
        if(str && typeof(str)==='string'){
            str = str.replace(/[\s\r\n]+/g,' ')
            return str.trim()
        }else{
            return str +''
        }
    },
    // 判断字节数(utf8)
    strLength(s) { 
        var totalLength = 0; 
        var charCode; 
        for (let i = 0; i < s.length; i++) { 
            charCode = s.charCodeAt(i); 
            if (charCode <= 127) { 
                totalLength = totalLength + 1; 
            } else if ((charCode>127) && (charCode <= 2047)) { 
                totalLength += 2; 
            } else if ((charCode>2047) && (charCode <= 65535)) { 
                totalLength += 3; 
            } else if ((charCode>65535) && (charCode <= 2097152)) { 
                totalLength += 4; 
            }  
        } 
        return totalLength; 
    } ,
    // 超出字节数裁剪 params [string,number]
    tooLongTrim(s,num) { 
        var totalLength = 0; 
        var charCode; 
        for (let i = 0; i < s.length; i++) { 
            charCode = s.charCodeAt(i); 
            if (charCode <= 127) { 
                totalLength = totalLength + 1; 
            } else if ((charCode>127) && (charCode <= 2047)) { 
                totalLength += 2; 
            } else if ((charCode>2047) && (charCode <= 65535)) { 
                totalLength += 3; 
            } else if ((charCode>65535) && (charCode <= 2097152)) { 
                totalLength += 4; 
            }  
            if(totalLength>num){
                return s.substr(0,i)
            }
        } 
        return s; 
    } ,
    // 获取cookie（注：在req的上下文中使用  加>目的:Ticket内容包含有==，替换后存储，取出再替换） 
    getCookie(key,req){
        if(process.client){
            return Cookie.get(key) ? Cookie.get(key).replace(/>/g,'=') : ''
        }else if(process.server){
            let service_cookie = {};
            req && req.headers.cookie && req.headers.cookie.split(';').forEach(function (val) {
                let parts = val.split('=');
                service_cookie[parts[0].trim()] = (parts[1] || '').trim();
            });
            return service_cookie[key]  ? service_cookie[key].replace(/>/g,'='):''
        }
    },
    // 设置Ticket
    setCookie(key,value){
        value = value&&(typeof value==='string') ? value.replace(/=/g,'>'):''
        console.log('VVVV',value);
        Cookie.set(key,value)
    }
} 