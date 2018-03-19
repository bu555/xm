
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
      testVote(vote){
            if(vote.length!==4){
                return false;
            }else{
                for(let i=0;i<4;i++){
                    if(/[eisntfjp*]/.test(vote.charAt(i))===false){
                        return false;
                    }
                }
                return true;
            }
      }

}