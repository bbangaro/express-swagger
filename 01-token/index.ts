const padStart = (targetLength: number, padString: string, str: string): string => {
    return str.length >= targetLength ? str : new Array(targetLength - str.length + 1).join(padString) + str;
};

function getToken(count: number) {
    const result = padStart(count, '0', String(Math.floor(Math.random() * 10 ** count)));
    console.log('result', result);
}

getToken(6);
