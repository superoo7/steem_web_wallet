import * as React from 'react';
import { RouteComponentProps } from '@reach/router';

import Confirm from 'Component/Shared/Modal/Confirm/Confirm';

class T extends React.Component<RouteComponentProps, {}> {
    render() {
        return (
            <div>
                <Confirm
                    action={() => {
                        alert('test');
                    }}
                    title="Transaction Confirmation"
                    message="message"
                />
            </div>
        );
    }
}

export default T;
