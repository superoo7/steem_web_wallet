import * as React from 'react';
import { RouteComponentProps, Link } from '@reach/router';
import { navigate } from '@reach/router';
const QrReader = require('react-qr-reader');

interface IQRState {
    delay: number;
    result: any;
}

class QRPage extends React.Component<RouteComponentProps, IQRState> {
    audio: HTMLAudioElement;

    state = {
        delay: 300,
        result: 'No result',
    };

    constructor(props: RouteComponentProps) {
        super(props);
        this.audio = new Audio(`${window.location.origin}/sounds/notification.wav`);
    }

    handleScan = (data: any) => {
        if (data) {
            this.audio.play();
            this.setState({
                result: data,
            });

            if (data.startsWith(`${window.location.origin}/profile`)) {
                const temp = data.split(`${window.location.origin}`);
                const url = temp.slice(1, temp.length).join('');
                navigate(url);
            } else if (data.match(/^[a-z][a-z0-9\-\.]+$/)) {
                console.log(data.match(/^[a-z][a-z0-9\-\.]+$/));
                navigate(`/profile/${data}`);
            }
        }
    };

    handleError = (err: any) => {
        console.error(err);
    };

    render() {
        return (
            <div className="QR__Reader--Container">
                <QrReader className="QR__Reader" delay={this.state.delay} onError={this.handleError} onScan={this.handleScan} />
                <div className="QR__Result">
                    <input value={this.state.result} disabled />
                </div>
            </div>
        );
    }
}

export default QRPage;
