
module.exports =  {
        // 随机字符串
        randomString : function(num) {
            var possibleCode = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
            var randStr = "";
            for( var i = 0; i < num; i++ )  randStr += possibleCode.charAt(Math.floor(Math.random() * possibleCode.length));
            
            return randStr;
        },
        // 验证用户名
        verifyEemail(email){
            return email && /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email) ? true:false;
        },
        // 验证密码
        verifyPassword(password){
                if(!password) return false;
                //验证密码强度
                var regArr = [];
                var count = 0;
                regArr.push(/[\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F]/); //匹配半角符号
                regArr.push(/[a-z]/);
                regArr.push(/[A-Z]/);
                regArr.push(/[0-9]/);
                regArr.forEach((v,i)=>{
                    if(v.test(password)){
                        count++;
                    }
                })
                if((password.length<6 || password.length>24) || count<2) {
                    return false;
                } else {
                    return true;
                }
        },
        // 生成用户角色名
      getRoleName(){
            var word = '';
            var number = '';
            for(var i=0;i<2;i++){
                var ranNum = Math.ceil(Math.random() * 25); //生成一个0到25的数字
                word += (String.fromCharCode(97+ranNum)); //65=A
            }
            for(var i=0;i<7;i++){
                number += Math.ceil(Math.random()*9); //65=A
            }
            return  word + number;
      },
      //检测vote是否符合格式
      testVote(vote){
            let reg = /^[ei][sn][tf][jp]$/
            return vote && reg.test(vote) ? true:false
      }

}