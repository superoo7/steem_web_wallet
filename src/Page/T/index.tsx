import * as React from "react";
import { RouteComponentProps } from "@reach/router";

import Confirm from 'Component/Shared/Confirm/Confirm';

class T extends React.Component<RouteComponentProps, {}> {


    render() {
        return (
            <div>
                <Confirm 
                    action={() => {alert("test");}} 
                    message="test" 
                />
            </div>
        )
    }
}



export default T;