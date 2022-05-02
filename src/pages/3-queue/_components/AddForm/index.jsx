import React, {memo, useState, useEffect} from 'react';
import {
    Box,
    Button,
    Typography,
    Grid,
    IconButton,
} from '@mui/material';
import {
    Person,
    PhoneEnabled,
    BrandingWatermark,
    Work,
    Home,
    Edit,
    Add,
} from '@mui/icons-material';
import {Formik, Form, FastField, Field} from 'formik';
import {
    Input,
    Date,
    Select,
    TextArea,
} from '_components/shared/FormikField';
import {gender, cardType} from '_constants/general';
import {initialValue, services} from './_constants';
import {
    ServiceDialog,
    SelectedServiceTable,
} from './_components';
import {useLocation} from '_contexts/LocationContext';
import {useSelector, useDispatch} from 'react-redux';
import {
    setPatientHint,
    setSelectedPatient,
} from '_redux/slice/queueSlice';
import Popup from '_components/shared/Popup';
import ListItem from '_components/shared/ListItem';
import MalePatient from '_assets/images/male-patient.png';
import FemalePatient from '_assets/images/female-patient.png';
import {formatDate} from '_helpers/handleDate';
import './index.scss';
// import PropTypes from 'prop-types';

function AddForm({handleSubmit}) {
    const [initialvalueState, setInitialValue] =
        useState(initialValue);
    const [open, setOpen] = useState(false);
    const isOpenHint = useSelector(
        state => state.queues.isOpenHint,
    );
    const filteredPatient = useSelector(
        state => state.queues.patientHint,
    );
    const selectedPatient = useSelector(
        state => state.queues.selected,
    );
    const dispatch = useDispatch();
    const {provinces, districts, wards} = useLocation();

    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const closeMenu = () => {
        dispatch(setPatientHint(''));
    };
    const handleSelect = item => e => {
        dispatch(setSelectedPatient(item));
    };
    useEffect(() => {
        if (selectedPatient) {
            setInitialValue({
                ...initialvalueState,
                PATIENT_NAME:
                    selectedPatient.last_name +
                    ' ' +
                    selectedPatient.first_name,
                PATIENT_PHONE: selectedPatient.phone,
                DATE_OF_BIRTH: formatDate(
                    selectedPatient.dob,
                ),
                OCCUPATION: selectedPatient.occupation,
                IDENTITY_NUMBER:
                    selectedPatient.identity_number,
                SERVICES: [1],
                HEIGHT: selectedPatient.height,
                WEIGHT: selectedPatient.weight,
                PATIENT_GENDER: selectedPatient.gender,
            });
        }
    }, [selectedPatient]);
    return (
        <Box className="add-form">
            <Typography variant="h5">
                Tạo phiếu khám
            </Typography>

            <Formik
                enableReinitialize
                initialValues={initialValue}
                onSubmit={handleSubmit}
                onChange={() => {
                    console.log(
                        'All Form State is changed',
                    );
                }}
            >
                {form => {
                    console.log(form);
                    return (
                        <Form>
                            <Grid
                                container
                                mt={2}
                                columnSpacing={2}
                                className="add-form__form-content"
                            >
                                <Grid item xs={5}>
                                    <FastField
                                        name="PATIENT_NAME"
                                        id="PATIENT_NAME"
                                        component={Input}
                                        label="Tên bệnh nhân"
                                        required
                                        icon={Person}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={4}
                                    sx={{
                                        position:
                                            'relative',
                                    }}
                                >
                                    <FastField
                                        name="PATIENT_PHONE"
                                        id="PATIENT_PHONE"
                                        component={Input}
                                        label="Số điện thoại"
                                        required
                                        icon={PhoneEnabled}
                                        autoComplete="off"
                                    />
                                    <Popup
                                        isOpen={isOpenHint}
                                        onClose={closeMenu}
                                    >
                                        {filteredPatient.map(
                                            (
                                                item,
                                                index,
                                            ) => (
                                                <ListItem
                                                    key={
                                                        index
                                                    }
                                                    avatar={
                                                        item.gender
                                                            ? MalePatient
                                                            : FemalePatient
                                                    }
                                                    title={
                                                        item.last_name +
                                                        ' ' +
                                                        item.first_name
                                                    }
                                                    subtitle={
                                                        item.phone
                                                    }
                                                    onClick={handleSelect(
                                                        item,
                                                    )}
                                                />
                                            ),
                                        )}
                                    </Popup>
                                </Grid>
                                <Grid item xs={3}>
                                    <FastField
                                        name="IDENTITY_NUMBER"
                                        id="IDENTITY_NUMBER"
                                        component={Input}
                                        label="CCCD"
                                        icon={
                                            BrandingWatermark
                                        }
                                        required
                                    />
                                </Grid>
                                <Grid item xs={5}>
                                    <FastField
                                        name="OCCUPATION"
                                        id="OCCUPATION"
                                        component={Input}
                                        label="Nghề nghiệp"
                                        icon={Work}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <FastField
                                        name="DATE_OF_BIRTH"
                                        id="DATE_OF_BIRTH"
                                        component={Date}
                                        label="Ngày sinh"
                                        required
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <FastField
                                        name="PATIENT_GENDER"
                                        id="PATIENT_GENDER"
                                        component={Select}
                                        label="Giới tính"
                                        items={gender}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <FastField
                                        name="HEIGHT"
                                        id="HEIGHT"
                                        component={Input}
                                        label="Chiều cao"
                                        icon="cm"
                                        required
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <FastField
                                        name="WEIGHT"
                                        id="WEIGHT"
                                        component={Input}
                                        label="Cân nặng"
                                        icon="kg"
                                        required
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <FastField
                                        name="PATIENT_TYPE"
                                        id="PATIENT_TYPE"
                                        component={Select}
                                        label="Loại"
                                        items={cardType}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography
                                        variant="subtitle2"
                                        color="#888"
                                        gutterBottom
                                        ml={1}
                                    >
                                        Địa chỉ
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Field
                                        name="ADDRESS.province"
                                        id="ADDRESS.province"
                                        component={Select}
                                        label="Tỉnh/ thành phố"
                                        items={provinces}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <Field
                                        name="ADDRESS.district"
                                        id="ADDRESS.district"
                                        component={Select}
                                        label="Huyện/ quận"
                                        items={districts}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <Field
                                        name="ADDRESS.ward"
                                        id="ADDRESS.ward"
                                        component={Select}
                                        label="Xã/ phường"
                                        items={wards}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FastField
                                        name="ADDRESS.detail"
                                        id="ADDRESS.detail"
                                        component={TextArea}
                                        label="Số nhà, tên đường ..."
                                        rows={2}
                                        icon={Home}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FastField
                                        name="NOTE"
                                        id="NOTE"
                                        component={TextArea}
                                        label="Ghi chú"
                                        rows={3}
                                        maxRow={3}
                                        icon={Edit}
                                    />
                                </Grid>
                                <Grid item xs={11}>
                                    <Typography
                                        variant="subtitle2"
                                        color="#888"
                                        gutterBottom
                                        ml={1}
                                    >
                                        Dịch vụ
                                    </Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <IconButton
                                        onClick={handleOpen}
                                    >
                                        <Add color="primary" />
                                    </IconButton>
                                    <ServiceDialog
                                        open={open}
                                        selectedServiceId={
                                            form.values
                                                ?.SERVICES
                                        }
                                        serviceData={
                                            services
                                        }
                                        setFieldValue={
                                            form.setFieldValue
                                        }
                                        onClose={
                                            handleClose
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <SelectedServiceTable
                                        selectedServiceId={
                                            form.values
                                                ?.SERVICES
                                        }
                                        serviceData={
                                            services
                                        }
                                        setFieldValue={
                                            form.setFieldValue
                                        }
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={6}
                                    sx={{
                                        position: 'sticky',
                                        bottom: '2px',
                                    }}
                                >
                                    <Button
                                        onClick={
                                            form.submitForm
                                        }
                                        variant="contained"
                                        sx={{
                                            width: '100%',
                                        }}
                                    >
                                        Đưa vào hàng đợi
                                    </Button>
                                </Grid>
                                <Grid
                                    item
                                    xs={6}
                                    sx={{
                                        position: 'sticky',
                                        bottom: '2px',
                                    }}
                                >
                                    <Button
                                        onClick={
                                            form.handleReset
                                        }
                                        variant="outlined"
                                        color="error"
                                        sx={{
                                            width: '100%',
                                        }}
                                    >
                                        Hủy
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    );
                }}
            </Formik>
        </Box>
    );
}

AddForm.propTypes = {};

export default memo(AddForm);
