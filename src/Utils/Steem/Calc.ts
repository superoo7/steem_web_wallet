export const convertReputation: (reputation: string) => number = (reputation: string) => {
    const temp = parseInt(reputation);
    let rep = String(temp);
    const neg = rep.charAt(0) === '-';
    rep = neg ? rep.substring(1) : rep;
    const str = rep;
    const leadingDigits = parseInt(str.substring(0, 4));
    const log = Math.log(leadingDigits) / Math.log(10);
    const n = str.length - 1;
    let out = n + (log - parseInt(`${log}`));
    if (isNaN(out)) {
        out = 0;
    }
    out = Math.max(out - 9, 0);
    out = (neg ? -1 : 1) * out;
    out = out * 9 + 25;
    const result = parseInt(`${out}`);
    return result;
};

export const calcVP: (last_vote_time: string, voting_power: number) => string = (
    last_vote_time: string,
    voting_power: number,
) => {
    const secondsago = (new Date().getTime() - new Date(last_vote_time + 'Z').getTime()) / 1000;
    const vpow = voting_power + (10000 * secondsago) / 432000;
    const vmin = Math.min(vpow / 100, 100).toFixed(2);
    return vmin;
};
