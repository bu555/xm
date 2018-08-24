
class User {
    constructor (axios){
        this.axios = axios
    }
    //用戶注冊
    register(data = {}) {
        if (data || Object.keys(data).length) {
        return this.axios.post('/api/User/SignUp', data)
        } else {
        console.log('参数不规范')
        }
    }

    // 用戶登錄
    login(data = {}) {
        if (data || Object.keys(data).length) {
        return this.axios.post('/api/Index/Login', data)
        } else {
        console.log('参数不规范')
        }
    }

    // 登錄后獲取用戶信息
    login_user_info(data = {}) {
        if (data || Object.keys(data).length) {
        return this.axios.get('/api/User/UserInfo', {params: data})
        } else {
        console.log('参数不规范')
        }
    }

    // 忘記密碼 / 發送郵箱驗證碼
    send_email_code(data = {}) {
        if (data || Object.keys(data).length) {
        return this.axios.post('/api/User/RetrievePasswordSendMail', data)
        } else {
        console.log('参数不规范')
        }
    }

    // 忘記密碼 / 驗證郵箱驗證碼
    verify_email_code(data = {}) {
        if (data || Object.keys(data).length) {
        return this.axios.post('/api/User/verifyEmail', data)
        } else {
        console.log('参数不规范')
        }
    }
    // 重置密碼
    reset_email_code(data = {}) {
        if (data || Object.keys(data).length) {
        return this.axios.post('/api/User/RetrievePassword', data)
        } else {
        console.log('参数不规范')
        }
    }
    // 登出接口
    login_out(data = {}) {
        if (data || Object.keys(data).length) {
        return this.axios.post('/api/Index/Logout', data)
        } else {
        console.log('参数不规范')
        }
    }



}
export default User