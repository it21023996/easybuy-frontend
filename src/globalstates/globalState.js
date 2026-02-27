const gloablState = {
    categoryId : null,
    listners : [],
    setCategoryId(value){
        this.categoryId = value;
        this.listners.forEach((listener)=> listener(value))
    },
    subcribe(listener){
        this.listners.push(listener);
        return ()=>{
            this.listners = this.listners.filter((l)=> l !== listener)
        }
    }
}
export default gloablState