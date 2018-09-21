import Steem from './Steem';
import Account from './Account';

const steem = new Steem();
export const account = new Account(steem);

export default steem;
