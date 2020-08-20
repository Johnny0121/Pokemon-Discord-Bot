var toPascalCase = function(string){
    return string.replace(/\w+/g, function (w) { return w[0].toUpperCase() + w.slice(1).toLowerCase(); });
}

module.exports = {
    toPascalCase: toPascalCase
};