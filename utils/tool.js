import split from 'lodash/split';
import join from 'lodash/join';
import round from 'lodash/round';

export const relativePath = (path) => {
    const list = split(path, ',');
    const paths = [];
    for (let index in list) {
        let item = list[index]
        paths.push(item.replace(/^http(s)?:\/\/(.*?)\//, ''));
    }
    return join(paths, ',');
};

export const toDecimal = (number, bit = 2) => {
    let f = parseFloat(number);
    if (isNaN(f)) {
        return '';
    }
    f = round(number * Math.pow(10, bit)) / Math.pow(10, bit);
    let s = f.toString();
    let rs = s.indexOf('.');
    if (rs < 0) {
         rs = s.length;
         s += '.';
    }

    while (s.length <= rs + bit) {
         s += '0';
    }

    return s;
}

export const validPhone = (phone) => {
	return /^1\d{10}/.test(phone);
};