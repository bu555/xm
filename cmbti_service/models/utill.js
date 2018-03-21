
module.exports =  {
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
            if(vote.length!==4){ //4位
                return false;
            }else{
                if(vote === '****'){
                    return false;
                }
                if( /[ei*]/.test(vote[0]) && /[sn*]/.test(vote[1]) && /[tf*]/.test(vote[2]) && /[jp*]/.test(vote[3]) ){
                    return true;
                }
                
                return false;
                // for(let i=0;i<4;i++){  //只可是指定的字符
                //     if(/[eisntfjp*]/.test(vote.charAt(i))===false){
                //         return false;
                //     }
                // }
                // return true;
            }
      }

}