import * as React from 'react';
import * as Modal from 'react-modal';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { RootAction, RootState } from 'Types';
import { closeInfo } from '../ModalAction';
import { getIsInfo, getInfoMessage } from '../ModalSelector';

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
        maxWidth: '800px',
    },
    overlay: {
        background: 'rgba(170, 239, 204, 0.3)',
    },
};

interface IInfoProps {
    // Redux Props
    closeInfo: () => void;
    isInfo: boolean;
    message: string;
}

interface IInfoState {}

Modal.setAppElement('#app');

class Confirm extends React.Component<IInfoProps, IInfoState> {
    componentDidMount() {}
    render() {
        const { message, isInfo, closeInfo } = this.props;
        return (
            <Modal isOpen={isInfo} contentLabel="Confirm" style={customStyles} onRequestClose={closeInfo}>
                <div
                    style={{
                        fontSize: '30px',
                        padding: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <h3>{message}</h3>
                    <button className="Btn__Submit" onClick={() => closeInfo()}>
                        Okay!
                    </button>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = (state: RootState, _ownProps: {}) => ({
    isInfo: getIsInfo(state),
    message: getInfoMessage(state),
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
    bindActionCreators(
        {
            closeInfo: closeInfo,
        },
        dispatch,
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Confirm);
