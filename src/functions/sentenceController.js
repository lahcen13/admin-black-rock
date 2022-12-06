module.exports = 
sentenceController = (string) => {
    var table = string.split(" ")
    var string = "";
    for (let index = 0; index < table.length; index++) {
        var countingUppercase = 0;
        table[index].split("").forEach(element => {
            if (element == element.toUpperCase()) {
                countingUppercase++;
               }
        });
        if (countingUppercase<=1){
            string +=table[index].charAt(0).toUpperCase() + table[index].slice(1).toLowerCase() + " "
        }else {
            string +=table[index]+ " "
        }
    }
    return string.trim();
}