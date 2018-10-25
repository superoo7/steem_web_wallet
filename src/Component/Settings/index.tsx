import * as React from 'react';
import SteemApi from './API/SteemApi';

const Settings = () => (
    <div className="Login__Container--Outer">
        <div className="Login__Container">
            <h1 className="Login__Title">Settings</h1>
            <SteemApi />
        </div>
    </div>
);

export default Settings;
