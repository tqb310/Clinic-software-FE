import React from 'react';
import {TextField} from '@mui/material';
import {gender} from '_constants/general';
import './index.scss';
// import {dateParse} from '_constants/date';
// import {CustomPaper} from '_components/shared/StyledComponent';
// import PropTypes from 'prop-types'

const textFieldStyle = {
    '& .MuiInputBase-input': {
        fontSize: '1.6rem',
    },
    '& .MuiInputLabel-root': {
        fontSize: '1.6rem',
    },
    width: '100%',
};
function PatientInfo({data, data1}) {
    // console.log(data);
    return (
        <div className="ECPatientInfo">
            <div className="ECPatientInfo__name col-1-5">
                <TextField
                    variant="filled"
                    label="Tên bệnh nhân"
                    value={data && data.PATIENT_NAME}
                    size="small"
                    sx={textFieldStyle}
                />
            </div>
            <div className="ECPatientInfo__birthdate col-5-8">
                <TextField
                    variant="filled"
                    label="Ngày sinh"
                    value={data && data.DATE_OF_BIRTH}
                    size="small"
                    sx={textFieldStyle}
                />
            </div>
            <div className="ECPatientInfo__age col-8-10">
                <TextField
                    variant="filled"
                    label="Tuổi"
                    value="21"
                    size="small"
                    sx={textFieldStyle}
                />
            </div>
            <div className="ECPatientInfo__gender col-10-13">
                <TextField
                    variant="filled"
                    label="Giới tính"
                    value={gender[data && data.GENDER]}
                    size="small"
                    sx={textFieldStyle}
                />
            </div>
            <div className="ECPatientInfo__phone col-1-5">
                <TextField
                    variant="filled"
                    label="Điện thoại"
                    value={data && data.PHONE}
                    size="small"
                    sx={textFieldStyle}
                />
            </div>
            <div className="ECPatientInfo__idcard col-5-8">
                <TextField
                    variant="filled"
                    label="CMND/CCCD"
                    value={data && data.IDENTITY_NUMBER}
                    size="small"
                    sx={textFieldStyle}
                />
            </div>
            <div className="ECPatientInfo__job col-8-13">
                <TextField
                    variant="filled"
                    label="Nghề nghiệp"
                    value={data && data.OCCUPATION}
                    size="small"
                    sx={textFieldStyle}
                />
            </div>
            <div className="ECPatientInfo__address col-1-13">
                <TextField
                    multiline
                    rows={2}
                    variant="filled"
                    label="Địa chỉ"
                    value={data && data.ADDRESS}
                    size="small"
                    sx={textFieldStyle}
                />
            </div>
            <div className="ECPatientInfo__note col-1-13">
                <TextField
                    multiline
                    rows={2}
                    variant="filled"
                    label="Ghi chú"
                    value="ABC"
                    size="small"
                    sx={textFieldStyle}
                />
            </div>
        </div>
    );
}

PatientInfo.propTypes = {};

export default PatientInfo;
