import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { showTeacherInfo } from '../store/actionCreators';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
// let teacherDefaultAvatar = require('../../assets/images/ic_default_image.png');

class GetTeacherAvatar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        let { id, teacherId, teacherAvatar, mood, vaccinatedClass, special, showSpecial } = this.props;
        let strokeColor = "#CCCCCC";
        let strokeWidth = "10px";
        let transform = "scale(0.91) translate(22 14)";
        if (special && showSpecial) {
            strokeColor = special.color;
            strokeWidth = "30px";
            transform = "scale(0.85) translate(30 18)";
        }
        return (
            <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={teacherAvatar} />
            </ListItemAvatar>
            // <div className="avatar" style={{
            //     'max-width': '10%'
            // }}>
            //     <svg viewBox='0 0 200 200' className='avatarSvg'>
            //         <defs>
            //             <pattern id={id} height="100%" width="100%" patternContentUnits="objectBoundingBox">
            //                 <image height="1" width="1" preserveAspectRatio="xMidYMid meet" xlinkHref={teacherAvatar ? teacherAvatar : ''} alt="" />
            //             </pattern>
            //             <path
            //                 id={`svg-path${id}`}
            //                 transform={transform}
            //                 // fill={`url(#${id})`}
            //                 // strokeWidth={strokeWidth}
            //                 // stroke={strokeColor}
            //                 // paintOrder="stroke"
            //                 d='M69.28203230275508 9.999999999999998Q86.60254037844386 0 103.92304845413264 9.999999999999998L155.88457268119896 40Q173.20508075688772 50 173.20508075688772 70L173.20508075688772 130Q173.20508075688772 150 155.88457268119896 160L103.92304845413264 190Q86.60254037844386 200 69.28203230275508 190L17.320508075688775 160Q0 150 0 130L0 70Q0 50 17.320508075688775 40Z' />
            //         </defs>
            //         <use
            //             xlinkHref={`#svg-path${id}`}
            //             strokeWidth={strokeWidth}
            //             stroke={strokeColor}
            //             fill="#fff"
            //             paintOrder="stroke"
            //         >
            //         </use>
            //         <use
            //             xlinkHref={`#svg-path${id}`}
            //             fill={`url(#${id})`}
            //         >
            //         </use>
            //     </svg>
            //     {/* {
            //         vaccinatedClass ?
            //         <div className='vaccinated'><img className='vacIcon' src={vac} alt="" /></div>
            //         :''
            //     } */}
            // </div>
        );
    }
}

// const mapStateToProps = (state) => {
//     return {
//         region_id: state.getIn(['header', 'region_id']),
//         location_list: state.getIn(['schedule', 'location_list']).toJS(),
//         language_id: state.getIn(['header', 'language_id']),
//         user: state.getIn(['main', 'user']),

//     };
// };

// const mapDispathToProps = (dispatch) => ({
//     //老师详情
//     showTeacherInfo(id) {
//         let jwt = this.user.get('jwt');
//         dispatch(showTeacherInfo(id, this.region_id, this.location_list, this.language_id, jwt));
//     }

// });
// export default GetTeacherAvatar;
export default GetTeacherAvatar;