import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { Button } from 'antd';
import  intl  from '../intl';
import { Modal } from 'antd';
import HtmlContent from '../../common/htmlContent/htmlContent';

// import './scheduleButton.scss';
import { BUTTON_STATUS, CLASS_CATEGORY } from '../../config/constant';
// import { getPopupModal } from '../../store/actionCreators';

const disabledStatus = [
    BUTTON_STATUS.FULL,
    BUTTON_STATUS.LATE_CANCEL,
    BUTTON_STATUS.SIGNED_IN,
    BUTTON_STATUS.HIDDEN,
];

const skipStatus = [
    BUTTON_STATUS.JOIN_ZOOM,
    BUTTON_STATUS.SIGNED_IN,
    BUTTON_STATUS.ABSENT,
    BUTTON_STATUS.COMPLETED,
    BUTTON_STATUS.CLASS_ON,
];
class ScheduleButton extends Component {
    ref = React.createRef();

    _cancelConfirmBindFn = this.cancelConfirm.bind(this);

    constructor(props) {
        super(props);
        this.state = {
            btnText: '',
            loading: false,
            // button confirm state
            confirm: false,
        };
    }

    bookBtn = (status, language_id) => {
        let text = '';
        switch (status) {
            case BUTTON_STATUS.JOIN_ZOOM:
                text = intl('schedule', 'booked', language_id);
                break;
            case BUTTON_STATUS.BOOK:
                text = intl('schedule', 'book', language_id);
                break;
            case BUTTON_STATUS.BOOKED:
                text = intl('schedule', 'booked', language_id);
                break;
            case BUTTON_STATUS.WAITLIST:
                text = intl('schedule', 'waitList', language_id);
                break;
            case BUTTON_STATUS.IN_WAITLIST:
                text = intl('schedule', 'inWaitList', language_id);
                break;
            case BUTTON_STATUS.FULL:
                text = intl('schedule', 'full', language_id);
                break;
            case BUTTON_STATUS.SIGNED_IN:
                text = intl('schedule', 'signedIn', language_id);
                break;
            case BUTTON_STATUS.LATE_CANCEL:
                text = intl('schedule', 'lateCancel', language_id);
                break;
            case BUTTON_STATUS.ABSENT:
                text = intl('schedule', 'absent', language_id);
                break;
            case BUTTON_STATUS.COMPLETE:
                text =  intl('schedule', 'complete', language_id);
                break;
            case BUTTON_STATUS.COMPLETED:
                text =  intl('schedule', 'completed', language_id);
                break;
            case BUTTON_STATUS.CANCELLED:
                text =  intl('schedule', 'cancelled', language_id);
                break;
            case BUTTON_STATUS.TRY_STAND_BY:
                text = intl('schedule', 'button_status13', language_id);
                break;
            case BUTTON_STATUS.CLASS_ON:
                text = intl('schedule', 'class_on', language_id);
                break;
            case BUTTON_STATUS.LAST_CHANCE:
                text = intl('schedule', 'lastChance', language_id);
                break;
            case BUTTON_STATUS.VIEW:
                text = intl('schedule', 'view', language_id);
                break;
            default:
                text = '';
        }


        return text;
    }

    componentDidMount() {
        this.updateBtnText();
    }

    componentDidUpdate(prevProps, prevState) {
        const { item } = this.props;
        const { confirm, loading } = this.state;

        // const newLoading = schedule_process_ids.get(item.get('id'));
        // if (newLoading !== undefined && newLoading !== prevState.loading) {
        //     this.setState({loading: newLoading});
        // }

        if (prevProps.item !== item) {
            this.setState({loading: false});
            this.updateBtnText();
            if (this.state.confirm) {
                this.updateConfirmState(false);
            }
        }

        if (prevState.confirm !== confirm || prevState.loading !== loading) {
            this.updateBtnText();
        }
    }

    componentWillUnmount() {
        this.removeListenClick();
    }

    updateConfirmState(confirm = false) {
        if (confirm) {
            this.listenClick();
        } else {
            this.removeListenClick();
        }

        this.setState({
            confirm,
        });
    }

    updateBtnText() {
        let text = '';
        const { item, language_id } = this.props;
        const button_status = item.get('button_status');
        if (this.state.loading) {
            text = '';
        } else if (this.state.confirm) {
            if ([1, 3].includes(button_status)) {
                text = intl('model', 'confirm', this.props.language_id) + '?';
            } else {
                text = intl('schedule', 'cancel', this.props.language_id) + '?';
            }
        } else {
            text = this.bookBtn(button_status, language_id);
            if (button_status === BUTTON_STATUS.IN_WAITLIST) {
                text += '#' + item.get('waiting_number');
            }
        }

        if (this.state.btnText !== text) {
            this.setState({
                btnText: text,
            });
        }
    }

    // iOS devices won't focus button on click, so blur won't work
    // bookBtnBlur(id, button_status) {
    //     // let oBtn = document.getElementById('btn_' + id);
    //     let oBtn = this.ref.current.buttonNode;
    //     // oBtn.innerText = this.bookBtn(button_status, this.props.language_id);
    //     this.updateBtnText(this.bookBtn(button_status, this.props.language_id));
    //     oBtn.classList.remove('confirm');
    // }

    /**
     * remove cancel state when clicked outside of button
     * @param {Event} event
     * @returns
     */
    cancelConfirm(event) {
        if (!this.ref.current) {
            return;
        }
        let oBtn = this.ref.current.buttonNode;
        // clicked outside, cancel confirm
        if (event.target !== oBtn) {
            this.updateConfirmState(false);
        }
    }

    // add listener to remove cancel state when clicked outside of button
    listenClick() {
        document.addEventListener('click', this._cancelConfirmBindFn);
    }

    removeListenClick() {
        document.removeEventListener('click', this._cancelConfirmBindFn);
    }

    confirm(id, button_status, booking_id, view_url) {
        if (skipStatus.includes(button_status)) {
            return;
        };

        if (button_status === BUTTON_STATUS.VIEW) {
            window.open(view_url, '_blank')
            return;
        }

        // if (button_status == BUTTON_STATUS.TRY_STAND_BY) {
        //     this.props.getPopupModal(id, button_status, this.props.language_id, booking_id);
        //     return;
        // }

        // if (button_status == BUTTON_STATUS.LAST_CHANCE) {
        //     this.props.booking(id, button_status, booking_id, this.props.auto_waitlist);
        //     return;
        // }

        if (parseInt(button_status) !== BUTTON_STATUS.FULL) {
            // var oBtn = document.getElementById('btn_' + id);
            // let oBtn = this.ref.current.buttonNode;
            if (this.state.confirm) {
                this.props.booking(id, button_status, booking_id, this.props.auto_waitlist);
                // this.props.booking(id, button_status, booking_id, this.props.auto_waitlist, this.blur.bind(this));
                // for (let i = 0; i < list.length; i++) {
                //     list[i].classList.remove('confirm');
                // }
                this.updateConfirmState(false);
            } else {
                this.updateConfirmState(true);
                // oBtn.classList.add("confirm");
                // for (let i = 0; i < list.length; i++) {
                //     list[i].classList.remove('confirm');
                // }
                // oBtn.classList.add("confirm");
                // if ([1, 3].includes(button_status)) {
                //     // oBtn.innerText = intl('model', 'confirm', this.props.language_id) + '?';
                //     this.updateBtnText(intl('model', 'confirm', this.props.language_id) + '?');
                // } else {
                //     // oBtn.innerText = intl('schedule', 'cancel', this.props.language_id) + '?';
                //     this.updateBtnText(intl('schedule', 'cancel', this.props.language_id) + '?');
                // }
            }
        } else {
            Modal.warning({
                title: intl('other','tips',this.props.language_id),
                content:(<HtmlContent content={intl('schedule','fullyBooked',this.props.language_id)}></HtmlContent>),
                okText: intl('model','close',this.props.language_id),
            });
            return;
        }
    }

    render() {
        const { item, is_fuze } = this.props;
        const { confirm } = this.state;
        let category = item.get('category') ? item.get('category') : CLASS_CATEGORY.GROUP;
        const disabled = disabledStatus.indexOf(item.get('button_status')) > -1 || category !== CLASS_CATEGORY.GROUP ? true : false;
        return (
            item.get('button_status') !== 0 &&
            <div className={ 'schedule_button_wrapper' + (is_fuze ? ' black' : '')}>
                <Button
                    ref={this.ref}
                    className={`bookBtn btn btn${item.get('button_status')} status${item.get('button_status')} ${item.get('sector')}  ${confirm ? 'confirm' : ''}`}
                    id={`btn_${item.get('id')}`}
                    onClick={() => this.confirm(item.get('id'), item.get('button_status'), item.get('booking_id'), item.get('view_url'))}
                    loading={this.state.loading}
                    // onBlur={() => this.bookBtnBlur(item.get('id'), item.get('button_status'))}
                    disabled={disabled}
                >
                    {this.state.btnText}
                    {/* {this.bookBtn(item.get('button_status'), language_id)}
                    {item.get('button_status') === 4 && '#' + item.get('waiting_number')} */}
                </Button>
            </div>
        );
    }
}

// const mapStateToProps = (state) => {
//     return {
//         schedule_process_ids: state.getIn(['schedule', 'schedule_process_ids']),
//     };
// };

// const mapDispathToProps = (dispatch) => ({
//     getPopupModal(id, button_status, language_id, booking_id) {
//         const data = {
//             class_id: id,
//             status: button_status,
//             jwt: this.jwt,
//             filter: this.filter,
//             booking_id,
//             language_id: this.language_id,
//             region_id: this.region_id,
//         };
//         dispatch(getPopupModal(data, button_status, language_id, this.region_id));
//     }
// });

export default ScheduleButton;