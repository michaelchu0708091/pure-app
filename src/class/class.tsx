
import ClassDetails from './ClassDetails.tsx';
import * as React from 'react';
import { useLocation } from 'react-router-dom';
import './schedule-mobile.scss';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import TextField from '@mui/material/TextField';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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
    height: '80%',
    overflowY: "scroll",
};
const Class = () => {
    const { state } = useLocation();
    const { jwt, list, locations, classType } = state;
    const [filter, setFilter] = React.useState({ date: new Date(), class: [] })
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const classesMobile = list
    const getScheduleItemMobile = (list, date) => {
        return (
            <List>
                {list.map(item => {
                    let buttonItem = {
                        booking_id: item.booking_id,
                        button_status: item.button_status,
                        id: item.id,
                        sector: item.sector,
                        waiting_number: item.waiting_number,
                        view_url: item.view_url,
                    };
                    let teacherAvatarItem = {
                        id: item.id,
                        teacherId: item.teacher.id,
                        teacherAvatar: item.teacher.image_link,
                        mood: item.mood,
                        vaccinatedClass: item.is_vaccinated,
                        special: item.special,
                    };
                    return (filter.class.some(i => i === item.class_type.name) && <ClassDetails
                        key={item.id}
                        item={item}
                        jwt={jwt}
                        // button_status={item.button_status}
                        button_item={buttonItem}
                        location_id={item.location_id}
                        teacher_avatar={teacherAvatarItem}
                        sector={item.sector}
                        locations={locations}
                        date={date}
                    >
                    </ClassDetails>);
                }
                )}
            </List>
        );
    }
    const handleCheck = (event) => {
        let updatedList = [...filter.class];
        console.log(event.target.value)
        if (event.target.checked) {
            updatedList = [...filter.class, event.target.value];
        } else {
            updatedList.splice(filter.class.indexOf(event.target.value), 1);
        }
        setFilter({
            ...filter,
            class: updatedList
        });
    };
    // let fixedDate = classesMobile.find((item, index) => index === this.state.scrollDateIndex);
    return (
        <>
            {/* {this.state.showNotice && this.getNotice(regionNotice)} */}
            <div>
                <Button onClick={handleOpen}>Open filter</Button>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <Box sx={style}>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <MobileDatePicker
                                    label="Date Filter"
                                    inputFormat="YYYY-MM-DD"
                                    value={filter.date}
                                    onChange={(newValue) => {
                                        setFilter({
                                            ...filter,
                                            date: newValue
                                        });
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                            <Button onClick={() => {
                                setFilter({
                                    ...filter,
                                    class: classType
                                })
                            }}>Select all classes</Button>
                            <Button onClick={() => {
                                setFilter({
                                    ...filter,
                                    class: []
                                })
                            }}>Remove all classes</Button>
                            <FormGroup>
                                {classType.map((item) =>
                                    <FormControlLabel
                                        control={
                                            <Checkbox value={item} checked={filter.class.some(i => item === i)} onChange={handleCheck} defaultChecked />
                                        }
                                        label={item}
                                    />
                                )}
                            </FormGroup>

                        </Box>
                    </Fade>
                </Modal>
            </div>
            <div className="schedule-mobile" id="schedule" >
                {/* {this.state.showNotice && this.getNotice(regionNotice)}
                <div id="scheduleTop">
                    <DateList
                        list={weekList}
                        jwt={jwt}
                        weekType={this.props.weekType}
                        ChangeWeekType={this.toggleChangeWeek.bind(this)}
                    />
                    <ScheduleFilter
                        jwt={jwt}
                        mood={mood_flag}
                    />
                </div> */}
                <div className="scheduleList" id="scheduleScrollView">
                    {/* {
                        fixedDate && <div className='fixedDate' style={{ 'top': this.state.rectTop }}>
                            {fixedDate.isToday ? intl('schedule', 'today', this.props.language_id) : `${fixedDate.dateInfo.w[lang]} · ${this.getDateInfo(fixedDate.dateInfo, lang)}`}
                        </div>
                    } */}
                    {
                        classesMobile.map((item, index) =>
                            moment(filter.date).format('YYYY-MM-DD') === item[0].start_date && <div className="item" style={{
                                padding: '0px 20px'
                            }}>
                                {getScheduleItemMobile(item, item[0].start_date)}
                            </div>
                        )

                    }
                </div>
            </div>
        </>
    );
}


export default Class;