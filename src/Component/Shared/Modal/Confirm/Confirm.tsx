import * as React from 'react';
import * as Modal from 'react-modal';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { RootAction, RootState } from 'Types';
import { openConfirm, closeConfirm } from '../ModalAction';
import { getIsConfirm } from '../ModalSelector';

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

interface IConfirmProps {
    updatePassword: (password: string) => void;
    message: string;
    title: string;
    // Redux Props
    openConfirm: () => void;
    closeConfirm: () => void;
    isConfirm: boolean;
}

interface IConfirmState {
    password: string;
}

Modal.setAppElement('#app');

class Confirm extends React.Component<IConfirmProps, IConfirmState> {
    state = {
        password: '',
    };

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            password: e.target.value,
        });
    };

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.props.updatePassword(this.state.password);
    };

    render() {
        const { title, message, isConfirm, closeConfirm } = this.props;
        return (
            <Modal isOpen={isConfirm} contentLabel="Confirm" style={customStyles} onRequestClose={closeConfirm}>
                <div style={{ fontSize: '30px', padding: '10px' }}>
                    <h1>{title}</h1>
                    <h3>{message}</h3>
                    <hr />
                    <h3>Insert your password</h3>
                    <form onSubmit={this.handleSubmit} style={{ display: 'flex', justifyContent: 'center' }}>
                        <input autoFocus type="password" name="password" placeholder="password" onChange={this.handleChange} />
                        <button className="Btn__Submit" type="submit">
                            Confirm
                        </button>
                    </form>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = (state: RootState, _ownProps: {}) => ({
    isConfirm: getIsConfirm(state),
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
    bindActionCreators(
        {
            openConfirm: openConfirm,
            closeConfirm: closeConfirm,
        },
        dispatch,
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Confirm);
