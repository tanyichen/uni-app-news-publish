function Id(length){
    var length=length || 15;
    var str=parseInt(Math.random()*999977);
    return (new Date()).getTime()+''+str;
     
}

export default{Id}
