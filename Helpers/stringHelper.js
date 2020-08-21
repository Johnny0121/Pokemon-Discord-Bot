var toPascalCase = function(string){
    return string.replace(/\w+/g, function (w) { return w[0].toUpperCase() + w.slice(1).toLowerCase(); });
}

var isValidJson = function (str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

module.exports = {
    toPascalCase: toPascalCase,
    isValidJson: isValidJson
};