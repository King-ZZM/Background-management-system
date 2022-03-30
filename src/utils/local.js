// 封装localStorage

export default {
    set(key,val){
        localStorage.setItem(key,JSON.stringify(val))
    },
    get(key){
        return JSON.parse(localStorage.getItem(key))
    },
    clear(){
        localStorage.clear()
    },
    remove(key){
        localStorage.removeItem(key)
    }
}