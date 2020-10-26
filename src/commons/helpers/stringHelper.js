export const getEllipsisValueObj = (str, limit) => {
    let strLength = 0;
    let strTitle = '';
    let strPiece = '';

    let isEllipsis = false;
    if (str) {
        for (let i = 0; i < str.length; i++) {
            let code = str.charCodeAt(i);
            const ch = str.substr(i, 1).toUpperCase();
            strPiece = str.substr(i, 1);
            code = parseInt(code, 10);
            if ((ch < '0' || ch > '9') && (ch < 'A' || ch > 'Z') && ((code > 255) || (code < 0))) {
                strLength += 3;
            } else {
                strLength += 1;
            }
            if (strLength > limit) { // 제한 길이 확인
                strTitle += ' ... ';
                isEllipsis = true;
                break;
            } else {
                strTitle += strPiece; // 제한길이 보다 작으면 자른 문자를 붙여준다.
            }
        }
    }

    return {
        originalValue: str,
        ellipsisValue: strTitle,
        isEllipsis,
    };
};

export const getEllipsisValue = (str, limit) => {
    const ellipsisValueObj = getEllipsisValueObj(str, limit);
    const { ellipsisValue } = ellipsisValueObj;
    return ellipsisValue;
};

export const replaceAll = (str, searchStr, replaceStr) => {
    return str.split(searchStr).join(replaceStr);
};

export const stck = (str, limit) => {
    let o;
    let d;
    let p;
    let n = 0;
    const l = limit === null ? 4 : limit;

    for (let i = 0; i < str.length; i++) {
        const c = str.charCodeAt(i);
        p = o - c;
        n = p === d ? n + 1 : 0;
        if (i > 0 && p > -2 && p < 2 && n > l - 3) {
            return false;
        }

        d = p;
        o = c;
    }

    return true;
};

export const comparator = (_as, _bs) => {
    // let a;
    // let b;
    let a1;
    let b1;
    let i = 0;
    let n;
    // let L;
    const rx = /(\.\d+)|(\d+(\.\d+)?)|([^\d.]+)|(\.\D+)|(\.$)/g;
    if (_as === _bs) return 0;
    const as = _as || '';
    const bs = _bs || '';
    const a = as.toLowerCase().match(rx);
    const b = bs.toLowerCase().match(rx);
    const L = a === null ? 0 : a.length;
    while (i < L) {
        if (b === null || !b[i]) return 1;
        a1 = a[i];
        b1 = b[i++];
        if (a1 !== b1) {
            n = a1 - b1;
            if (!Number.isNaN(n)) return n;
            return a1 > b1 ? 1 : -1;
        }
    }
    return b[i] ? -1 : 0;
};
