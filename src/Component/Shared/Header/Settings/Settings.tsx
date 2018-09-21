import * as React from 'react';
import * as Modal from 'react-modal';
import Select from 'react-select';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        Background: 'black',
        padding: '0px',
    },
    overlay: {
        background: 'rgba(170, 239, 204, 0.3)',
    },
};

Modal.setAppElement('#app');

interface ISettingsProps {
    isMobile: boolean;
}

interface ISettingsState {
    modalIsOpen: boolean;
}

class Settings extends React.Component<ISettingsProps, ISettingsState> {
    state = {
        modalIsOpen: false,
    };
    openModal = () => {
        this.setState({ modalIsOpen: true });
    };

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    };

    render() {
        const selectOpt = [
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' },
        ];

        return (
            <React.Fragment>
                <div className="Settings__Open" onClick={this.openModal}>
                    <i className={`fas fa-sliders-h ${this.props.isMobile ? 'fa-5x' : 'fa-7x'}`} />
                </div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    contentLabel="Settings"
                    style={customStyles}
                    onRequestClose={this.closeModal}
                >
                    <div className="Settings__Box--Background">
                        <div className="Settings__Modal">
                            <div className="Settings__Close" onClick={this.closeModal}>
                                <i className="far fa-times-circle fa-7x" />
                            </div>
                            <h1 className="Settings__Modal--Title">Settings</h1>
                            <p className="Settings__Modal--Content">
                                <h3 className="Settings__Options">Steem API</h3>
                                <Select options={selectOpt} />
                            </p>
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
        );
    }
}

export default Settings;
