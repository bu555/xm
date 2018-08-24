export default {
    email(email){
        return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email) ? true:false;
    },
    password(password){
            if(!password) return false;
            //验证密码强度
            var reg = /^(\d|\w|[\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F]){8,24}$/
            if(!(reg.test(password))) return false;
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
            if(count<3) {
                return false;
            } else {
                return true;
            }
    },
    phone(phone){
        return (/^\+{1}[0-9]{5,}/.test(phone))? true:false;
    }
    
}