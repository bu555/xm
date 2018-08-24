
class Bitcoin {
    constructor (axios){
        this.axios = axios
    }
    // 获取最新的比特币兑换价 Currency=CNY 或 Currency=USD
    getBitcoinPrice(data){
        return this.axios.get('/api/Bitcoin/Convert',{params:data})
    }

}
export default Bitcoin