var padStart = function (targetLength, padString, str) {
    return str.length >= targetLength ? str : new Array(targetLength - str.length + 1).join(padString) + str;
};
function getToken(count) {
    var result = padStart(count, '0', String(Math.floor(Math.random() * Math.pow(10, count))));
    console.log('result', result);
}
getToken(6);
