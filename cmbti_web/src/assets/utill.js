export default {
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
        reg:{
            tag:/<\/?.+?\/?>/, //替换标签
            iframe:/<\s?iframe[^>]*><\/iframe>/, //匹配指定标签 [^>] 排除
        }
} 