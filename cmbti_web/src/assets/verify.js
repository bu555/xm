const verify = {
    // 验证用户名
    userName(name){
        if(name){
            if(/\s/.test(name)){
                console.log('空白')
                return false;
            }else if(/\d/.test(name)){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    },
    // 验证密码
    password(pwd){
        if(pwd){
            return true;
        }else{
            return false;
        }
    },
    // 验证
}

export default verify