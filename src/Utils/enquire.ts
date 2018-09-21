//https://github.com/ant-design/ant-design-pro-site/blob/master/site/theme/template/utils.jsx
let enquire: any | undefined;
if (typeof window !== 'undefined') {
    const matchMediaPolyfill = (mediaQuery: string): MediaQueryList => {
        return {
            media: mediaQuery,
            matches: false,
            addListener() {},
            removeListener() {},
        };
    };
    window.matchMedia = window.matchMedia || matchMediaPolyfill;
    enquire = require('enquire.js');
}

export const enquireScreen: (cb: any) => void = cb => {
    if (!enquire) {
        return;
    }
    // and (min-width: 320px)
    enquire.register('only screen and (max-width: 768px)', {
        match: () => {
            cb && cb(true);
        },
        unmatch: () => {
            cb && cb();
        },
    });
};
