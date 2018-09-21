import 'whatwg-fetch';
import Steem from '../Steem';
import { API } from '../SteemAPI';

// set jest timeout longer
jest.setTimeout(10000);

xdescribe('dsteem', () => {
    xit(`check connection of ${API.curie}`, done => {
        const bc = new Steem(API.curie);
        const res = bc.checkConnection();
        res.subscribe(res => {
            expect(res.jsonrpc).toBe('2.0');
            done();
        });
    });

    xit(`check connection of ${API.gtg}`, done => {
        const bc = new Steem(API.gtg);
        const res = bc.checkConnection();
        res.subscribe(res => {
            expect(res.jsonrpc).toBe('2.0');
            done();
        });
    });

    it(`check connection of ${API.steemit}`, done => {
        const bc = new Steem(API.steemit);
        const res = bc.checkConnection();
        res.subscribe(res => {
            expect(res.jsonrpc).toBe('2.0');
            done();
        });
    });

    it(`check connection of ${API.steemliberator}`, done => {
        const bc = new Steem(API.steemliberator);
        const res = bc.checkConnection();
        res.subscribe(res => {
            expect(res.jsonrpc).toBe('2.0');
            done();
        });
    });
});
