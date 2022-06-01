import React, {useState} from 'react';
import {
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    IconButton,
    Button,
    TextField,
    Grid,
    FormControlLabel,
    Switch,
    Typography,
    Box,
} from '@mui/material';
import {Formik, Form, FastField, Field} from 'formik';
import {
    Input,
    Select,
    DatePickerField,
    TextArea,
} from '_components/shared/FormikField';
import {
    Person,
    PhoneEnabled,
    BrandingWatermark,
    Work,
    Home,
    Edit,
    Close,
} from '@mui/icons-material';
import {gender, cardType} from '_constants/general';
import {useLocation} from '_contexts/LocationContext';
import {getInitialAppointmentDataFormat} from '_helpers/getInitialDataFormat';
import {hourSelect, minuteSelect} from '_constants/date';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import handlePriceFormat from "_helpers/handlePriceFormat.js";
// import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.scss';

function ConfirmRequest({
    title,
    open,
    handleClose,
    data,
    handleSubmit,
}) {
    const [switchEdit, setSwitchEdit] = useState(false);
    const {
        provinces,
        districts,
        wards,
        onChange: onChangeLocation,
    } = useLocation();

    return (
        <Dialog
            modal={true}
            open={open}
            onClose={handleClose}
        >
            <DialogTitle
                sx={{
                    position: 'relative',
                    padding: '.8rem 1.5rem .8rem 1.5rem',
                    fontSize: '15px',
                    fontWeight: 600,
                }}
            >
                {title}
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: 3,
                        right: 15,
                    }}
                    onClick={handleClose}
                >
                    <Close />
                </IconButton>
            </DialogTitle>
            <Formik
                enableReinitialize
                initialValues={{
                    ...getInitialAppointmentDataFormat(
                        data,
                    ),
                }}
                onSubmit={handleSubmit}
                onChange={() => {
                    console.log(
                        'All Form State is changed',
                    );
                }}
            >
                {form => {
                    // console.log(form);
                    return (
                        <Form>
                            <DialogContent
                                dividers
                                // className="ConfirmRequest"
                                sx={{
                                    boxSizing: 'border-box',
                                    width: 600,
                                }}
                            >
                                <Grid
                                    container
                                    mt={2}
                                    columnSpacing={2}
                                    className="add-form__form-content"
                                >
                                    <Grid item xs={5}>
                                        <FastField
                                            name="patient.patient_name"
                                            id="patient.patient_name"
                                            component={
                                                Input
                                            }
                                            label="Tên bệnh nhân"
                                            required
                                            icon={Person}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FastField
                                            name="patient.phone"
                                            id="patient.phone"
                                            component={
                                                Input
                                            }
                                            label="Số điện thoại"
                                            required
                                            icon={
                                                PhoneEnabled
                                            }
                                            autoComplete="off"
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FastField
                                            name="patient.identity_number"
                                            id="patient.identity_number"
                                            component={
                                                Input
                                            }
                                            label="CCCD"
                                            icon={
                                                BrandingWatermark
                                            }
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={5}>
                                        <FastField
                                            name="patient.occupation"
                                            id="patient.occupation"
                                            component={
                                                Input
                                            }
                                            label="Nghề nghiệp"
                                            icon={Work}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FastField
                                            name="patient.dob"
                                            id="patient.dob"
                                            component={
                                                DatePickerField
                                            }
                                            label="Ngày sinh"
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FastField
                                            name="patient.gender"
                                            id="patient.gender"
                                            component={
                                                Select
                                            }
                                            label="Giới tính"
                                            items={gender}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FastField
                                            name="patient.height"
                                            id="patient.height"
                                            component={
                                                Input
                                            }
                                            label="Chiều cao"
                                            icon="cm"
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FastField
                                            name="patient.weight"
                                            id="patient.weight"
                                            component={
                                                Input
                                            }
                                            label="Cân nặng"
                                            icon="kg"
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FastField
                                            name="appointment.type"
                                            id="appointment.type"
                                            component={
                                                Select
                                            }
                                            label="Loại"
                                            items={cardType}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FastField
                                            name="appointment.date"
                                            id="appointment.date"
                                            component={
                                                DatePickerField
                                            }
                                            label="Ngày hẹn"
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FastField
                                            name="appointment.hour"
                                            id="appointment.hour"
                                            component={
                                                Select
                                            }
                                            label="Giờ"
                                            items={
                                                hourSelect
                                            }
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FastField
                                            name="appointment.minute"
                                            id="appointment.minute"
                                            component={
                                                Select
                                            }
                                            label="Phút"
                                            items={
                                                minuteSelect
                                            }
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box
                                            sx={{
                                                display:
                                                    'flex',
                                                justifyContent:
                                                    'space-between',
                                            }}
                                        >
                                            <Typography
                                                variant="subtitle2"
                                                color="#888"
                                                gutterBottom
                                                ml={1}
                                            >
                                                Địa chỉ
                                            </Typography>
                                            <FormControlLabel
                                                sx={{
                                                    mr: 0,
                                                    mb: 1,
                                                }}
                                                label="Chỉnh sửa"
                                                control={
                                                    <Switch
                                                        size="small"
                                                        checked={
                                                            switchEdit
                                                        }
                                                        onChange={e =>
                                                            setSwitchEdit(
                                                                e
                                                                    .target
                                                                    .checked,
                                                            )
                                                        }
                                                    />
                                                }
                                            />
                                        </Box>
                                    </Grid>
                                    {switchEdit ? (
                                        <>
                                            <Grid
                                                item
                                                xs={4}
                                            >
                                                <Field
                                                    name="patient.address.province"
                                                    id="patient.address.province"
                                                    component={
                                                        Select
                                                    }
                                                    label="Tỉnh/ thành phố"
                                                    items={
                                                        provinces
                                                    }
                                                    onChangeLocation={
                                                        onChangeLocation
                                                    }
                                                    required
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                xs={4}
                                            >
                                                <Field
                                                    name="patient.address.district"
                                                    id="patient.address.district"
                                                    component={
                                                        Select
                                                    }
                                                    label="Huyện/ quận"
                                                    items={
                                                        districts
                                                    }
                                                    onChangeLocation={
                                                        onChangeLocation
                                                    }
                                                    required
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                xs={4}
                                            >
                                                <Field
                                                    name="patient.address.ward"
                                                    id="patient.address.ward"
                                                    component={
                                                        Select
                                                    }
                                                    label="Xã/ phường"
                                                    items={
                                                        wards
                                                    }
                                                    onChangeLocation={
                                                        onChangeLocation
                                                    }
                                                    required
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                            >
                                                <FastField
                                                    name="patient.address.details"
                                                    id="patient.address.details"
                                                    component={
                                                        TextArea
                                                    }
                                                    label="Số nhà, tên đường ..."
                                                    rows={2}
                                                    icon={
                                                        Home
                                                    }
                                                />
                                            </Grid>
                                        </>
                                    ) : (
                                        <Grid item xs={12}>
                                            {' '}
                                            <TextField
                                                sx={{
                                                    mb: 2,
                                                }}
                                                fullWidth
                                                size="small"
                                                value={
                                                    (data.ward
                                                        ? data.ward +
                                                          ' - '
                                                        : '') +
                                                    data.district +
                                                    ' - ' +
                                                    data.province
                                                }
                                                multiline
                                                rows={3}
                                                inputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </Grid>
                                    )}
                                    <Grid item xs={12}>
                                        <FastField
                                            name="patient.note"
                                            id="patient.note"
                                            component={
                                                TextArea
                                            }
                                            label="Ghi chú"
                                            rows={3}
                                            maxRow={3}
                                            icon={Edit}
                                        />
                                    </Grid>
                                </Grid>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    type="button"
                                    onClick={
                                        form.handleReset
                                    }
                                    color="secondary"
                                    sx={{mr: 2}}
                                >
                                    TÁI THIẾT
                                </Button>
                                <Button
                                    onClick={
                                        form.submitForm
                                    }
                                >
                                    SỬA
                                </Button>
                            </DialogActions>
                        </Form>
                    );
                }}
            </Formik>
            {/* <ToastContainer />s */}
        </Dialog>
    );
}

export default ConfirmRequest;
