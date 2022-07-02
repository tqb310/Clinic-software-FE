import React, {useState, memo} from 'react';
import {FastField} from 'formik';
import {FormControl, FormLabel, Alert} from '@mui/material';
import {
    CustomRadioGroup,
    CustomRadio,
} from '_components/shared/FormikField/CustomRadioBtn';
// import Select from '_components/shared/FormikField/Select';
import {DatePickerField} from '_components/shared/FormikField';
import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    // TimelineDot,
    TimelineOppositeContent,
    TimelineConnector,
    TimelineContent,
} from '@mui/lab';
// import { Button } from "@mui/material";
import {RadioButtonChecked} from '@mui/icons-material';
import {hours} from '_constants/date';
import {Scrollbars} from 'react-custom-scrollbars-2';
import './index.scss';
// import PropTypes from 'prop-types'

function TimelineItemComp({h, hour}) {
    const [expanded, setExpanded] = useState(false);
    return (
        <TimelineItem
            sx={{
                minHeight: expanded ? '70px' : '45px',
                transition: 'all .3s',
            }}
        >
            {expanded && (
                <TimelineOppositeContent
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        paddingBottom: 0,
                    }}
                >
                    <CustomRadio
                        id={h + ':00'}
                        value={h + ':00'}
                        label="00 - 10"
                    />
                    <CustomRadio
                        id={h + ':10'}
                        value={h + ':10'}
                        label="10 - 20"
                    />
                    <CustomRadio
                        id={h + ':20'}
                        value={h + ':20'}
                        label="20 - 30"
                    />
                    <CustomRadio
                        id={h + ':30'}
                        value={h + ':30'}
                        label="30 - 40"
                    />
                    <CustomRadio
                        id={h + ':40'}
                        value={h + ':40'}
                        label="40 - 50"
                    />
                    <CustomRadio
                        id={h + ':50'}
                        value={h + ':50'}
                        label="50 - 00"
                    />
                </TimelineOppositeContent>
            )}
            <TimelineSeparator>
                <RadioButtonChecked
                    sx={{
                        color: expanded
                            ? '#2E3192'
                            : '#bdbdbd',
                        margin: '7px 0',
                        transition: 'all .3s',
                        '&:hover': !expanded
                            ? {
                                  transform:
                                      'scale(1.1,1.1)',
                              }
                            : '',
                    }}
                    onClick={() => setExpanded(!expanded)}
                />
                <TimelineConnector
                    sx={{
                        backgroundColor: expanded
                            ? '#2E3192'
                            : '#bdbdbd',
                    }}
                />
            </TimelineSeparator>
            <TimelineContent
                color={
                    expanded ? '#2E3192' : 'text.secondary'
                }
                sx={{
                    paddingTop: '9px',
                    fontSize: '13px',
                    minWidth: '65px',
                    flex: 0,
                }}
            >
                {hour}
            </TimelineContent>
        </TimelineItem>
    );
}

function DateTimeChoice(props) {
    return (
        <div className="AppointmentForm__datetime">
            <div>
                <FastField
                    id="date"
                    name="appointment.date"
                    component={DatePickerField}
                    label="Ngày hẹn khám"
                    fullWidth
                    minDate={new Date()}
                />
            </div>
            <div>
                <FormControl fullWidth>
                    <FormLabel>Chọn khung giờ</FormLabel>
                    <Scrollbars style={{height: '323.5px'}}>
                        <Timeline
                            position="left"
                            sx={{margin: 0, padding: 0}}
                        >
                            <FastField
                                id="time"
                                name="appointment.time"
                            >
                                {({form, field}) => {
                                    return (
                                        <CustomRadioGroup
                                            {...field}
                                        >
                                            {form.errors
                                                ?.appointment
                                                ?.time && (
                                                <Alert severity="error">
                                                    {
                                                        form
                                                            .errors
                                                            ?.appointment
                                                            ?.time
                                                    }
                                                </Alert>
                                            )}
                                            {hours.map(
                                                (
                                                    hour,
                                                    index,
                                                ) => {
                                                    const [
                                                        h,
                                                    ] =
                                                        hour.split(
                                                            ':',
                                                        );
                                                    return (
                                                        <TimelineItemComp
                                                            key={
                                                                index
                                                            }
                                                            h={
                                                                h
                                                            }
                                                            hour={
                                                                hour
                                                            }
                                                        />
                                                    );
                                                },
                                            )}
                                        </CustomRadioGroup>
                                    );
                                }}
                            </FastField>
                            <TimelineItem
                                sx={{minHeight: 0}}
                            >
                                <TimelineSeparator>
                                    <RadioButtonChecked
                                        sx={{
                                            color: '#bdbdbd',
                                            margin: '7px 0',
                                        }}
                                    />
                                </TimelineSeparator>
                                <TimelineContent
                                    color="text.secondary"
                                    sx={{
                                        paddingTop: '9px',
                                        fontSize: '13px',
                                        flexBasis:
                                            '33px !important',
                                        flex: 0,
                                    }}
                                >
                                    18:00
                                </TimelineContent>
                            </TimelineItem>
                        </Timeline>
                    </Scrollbars>
                </FormControl>
            </div>
        </div>
    );
}

DateTimeChoice.propTypes = {};

export default memo(DateTimeChoice);
