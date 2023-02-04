import React, { Component } from 'react';
// import { connect } from 'react-redux';
import GetTeacherAvatar from './getTeacherAvatar.tsx';
import ScheduleButton from './scheduleButton/scheduleButton.tsx';
// import { showClassInfo, judgeBooking } from '../../store/actionCreators';
// import { getBookingList } from '../../../booking/store/actionCreators';
import { fromJS } from 'immutable';
// import './classDetails.scss';
// import { CLASS_CATEGORY } from '../../../config/constant';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { book } from '../util/apiCaller.ts';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
class ClassDetails extends Component {
    ref = React.createRef();
    constructor(props) {
        super(props);
        this.state = { open: false };
    }
    handleOpen = () => this.setState({ open: true })
    handleClose = () => this.setState({ open: false })
    locations(id, is_fuze, sector) {
        const location_list = this.props.locations;
        let lang = 'en'
        // let data = location_list ? location_list[filter.sector] : [];
        let data = location_list
        for (var i = 0; i < data.length; i++) {
            if (data[i].id == id) {
                if (is_fuze) {
                    return `FUZE @ ${data[i].names.en}`;
                } else {
                    return data[i].names.en;
                }
            }
        }
    }
    cancelClassCallback(bookingParams) {
        // refresh on cancel class
        if (isMobile) {
            this.props.getBooking(bookingParams);
        }
    }



    render() {
        let { language_id, item, jwt, button_item, location_id, teacher_avatar, timeShown, sector, category = undefined, date } = this.props;
        return (
            <>
                <div>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={this.state.open}
                        onClose={this.handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={this.state.open}>
                            <Box sx={style}>
                                <Typography variant="h6" gutterBottom>
                                    Confirmation
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    Really wanna book?
                                </Typography>
                                {button_item.button_status === 0 && <LocalizationProvider dateAdapter={AdapterMoment}>
                                    <MobileDateTimePicker
                                        label="When to book?"
                                        value={this.state.bookingTime}
                                        onChange={(newValue) => {
                                            this.setState({ bookingTime: moment(newValue)});
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>}
                                <Button style={{ padding: 0 }} onClick={async () => {
                                    if(button_item.button_status !== 0){
                                        const result = await book(jwt, item.id)
                                        console.log(result)
                                    }
                                    else{
                                        let now = new Date()
                                        let interval =  this.state.bookingTime.valueOf() - now - 50
                                        console.log(interval)
                                        await setTimeout(()=>{
                                            // TB FINISH
                                            console.log('hi')
                                        }, interval)
                                    }
                                    return result
                                }}>{button_item.button_status !== 0 ? 'let me book la' : 'auto booking not yet ready wor'}</Button>
                            </Box>
                        </Fade>
                    </Modal>
                </div>
                <ListItem key={item.id} className={'class_list_wrapper' + (item.class_type.is_fuze ? ' black' : '')}>
                    <ListItemButton onClick={(e) => this.handleOpen()}>
                        <GetTeacherAvatar
                            id={teacher_avatar.id}
                            teacherId={teacher_avatar.teacherId}
                            teacherAvatar={teacher_avatar.teacherAvatar}
                            mood={teacher_avatar.mood}
                            vaccinatedClass={teacher_avatar.vaccinatedClass}
                            special={teacher_avatar.special}
                        ></GetTeacherAvatar>
                        <div className="class_info">
                            <div className='classTitle'>
                                {/* onClick={() => { category !== CLASS_CATEGORY.PRIVATE && this.props.showClassInfo(item.class_type.id, item.special, item.mood, jwt, language_id) }} */}
                                <Typography variant="h5" gutterBottom>
                                    {item.start_time_display} - {moment(date, 'YYYY-MM-DD').format("MMM Do")}
                                </Typography>
                                <Typography variant="h5" gutterBottom>
                                    {item.class_type.name}
                                </Typography>
                            </div>
                            <div className="down">
                                <div className="left">
                                    <div className="leftInfo">
                                        <p className="timeContent">{item.duration / 60000}min</p>
                                        <Typography variant="h6" gutterBottom>
                                            {item.teacher.name}
                                        </Typography>
                                    </div>
                                    <p>
                                        <i className="iconfont icon-marker1"></i>
                                        {this.locations(location_id, item.class_type.is_fuze, sector)}
                                    </p>
                                </div>
                                {
                                    (button_item.button_status !== 0) &&
                                    <div className="opera book">
                                        <ScheduleButton
                                            item={fromJS(button_item)}
                                            language_id={this.props.language_id}
                                            booking={this.props.booking}
                                            jwt={jwt}
                                            filter={this.props.filter}
                                            region_id={this.props.region_id}
                                            cancel_class_callback={this.props.cancel_class_callback}
                                            is_fuze={item.class_type.is_fuze}
                                        >
                                        </ScheduleButton>
                                        {/* {bookingParams&&this.cancelClassCallback(bookingParams)} */}
                                    </div>
                                    // NOTE: 0 = not open for booking, could be past lesson or not yet opened.

                                }
                            </div>
                        </div>
                    </ListItemButton>

                </ListItem >
                <Divider variant="inset" component="li" />
            </>
        );
    }
}

export default ClassDetails