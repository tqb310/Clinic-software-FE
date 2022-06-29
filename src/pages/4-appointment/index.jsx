import React, {memo, useEffect, useState} from 'react';
import Infomation from './_components/Infomation';
import AppointmentTable from './_components/AppointmentTable';
import AppointmentDemand from './_components/AppointmentDemand';
import {Grid, Typography} from '@mui/material';
import {CustomPaper} from '_components/shared/StyledComponent';
import {Pie, Bar} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
} from 'chart.js';
import {RightBar} from '_components/shared/StyledComponent';
import {useDispatch, useSelector} from 'react-redux';
import {setDataAsync} from '_redux/slice/appointmentSlice';
import {useFirestoreRealtime} from '_hooks';
import {dayLength} from '_constants/date';
import {
    compare2Days,
    formatDate,
} from '_helpers/handleDate';
import {setAnchorDay} from '_redux/slice/appointmentSlice';
import './index.scss';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
);

const options = {
    responsive: true,
    plugins: {},
};

const barLabels = [
        'CN',
        'Hai',
        'Ba',
        'Tư',
        'Năm',
        'Sáu',
        'Bảy',
    ],
    barData = {
        labels: barLabels,
        datasets: [
            {
                label: 'Số lượng lịch hẹn trong tuần',
                data: barLabels.map(label =>
                    Math.trunc(100 - Math.random() * 90),
                ),
                backgroundColor: '#6b9eff',
            },
        ],
    },
    pieData = {
        labels: [
            '7h-9h',
            '9h15-11h',
            '13h-15h',
            '15h15-17h',
        ],
        datasets: [
            {
                label: 'Quoc Bao',
                data: [0, 0, 0, 0],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 2,
            },
        ],
    };

function Appointment(props) {
    const dispatch = useDispatch();

    const [barActualData, setBarActualData] =
        useState(barData);

    const appointmentData = useSelector(
        state => state.appointments.data,
    );
    const appointmentNumber = useSelector(
        state => state.appointments.number,
    );
    const cancelledNumber = useSelector(
        state => state.appointments.cancelledNumber,
    );
    const notVisitedNumber = useSelector(
        state => state.appointments.notVisitedNumber,
    );
    const visitedNumber = useSelector(
        state => state.appointments.visitedNumber,
    );
    const selectedAppointment = useSelector(
        state => state.appointments.selectedAppointment,
    );
    const isOpenForm = useSelector(
        state => state.appointments.isOpenForm,
    );
    const dataByDate = useSelector(
        state => state.appointments.dataByDate,
    );
    const isOpenAppointmentDetail = useSelector(
        state => state.appointments.isOpenAppointmentDetail,
    );
    const anchorDay = useSelector(
        state => state.appointments.anchorDay,
    );

    const firestoreRealtime = useFirestoreRealtime({
        collectionName: 'appointments',
        eventHandler: () => {
            dispatch(setDataAsync());
        },
    });

    useEffect(() => {
        const unsub = firestoreRealtime();
        return () => {
            unsub();
            dispatch(setAnchorDay(new Date()));
        };
    }, []);

    useEffect(() => {
        const current7Days = Array.from(
            new Array(7),
            (_, i) =>
                new Date(
                    anchorDay.getTime() +
                        (i - anchorDay.getDay()) *
                            dayLength,
                ),
        );
        const data = current7Days.map(date => {
            let count = 0;
            for (const appointment of appointmentData) {
                if (
                    !compare2Days(
                        new Date(
                            formatDate(appointment.date),
                        ),
                        date,
                    )
                )
                    count++;
            }
            return count;
        });
        setBarActualData(pre => ({
            ...pre,
            datasets: [{...pre.datasets[0], data}],
        }));
    }, [anchorDay, appointmentData]);

    return (
        <Grid
            container
            spacing={3}
            className="appointment-container"
        >
            <Grid item lg={5}>
                <Infomation
                    appointmentNumber={appointmentNumber}
                    cancelledNumber={cancelledNumber}
                    notVisitedNumber={notVisitedNumber}
                    visitedNumber={visitedNumber}
                />
                <CustomPaper sx={{p: 1, mb: 3}}>
                    <Typography
                        variant="h5"
                        sx={{px: 1, mb: 1}}
                    >
                        Số lượng lịch hẹn trong tuần
                    </Typography>
                    <Bar
                        data={barActualData}
                        options={options}
                    />
                </CustomPaper>
            </Grid>
            <Grid item lg={7}>
                <AppointmentTable
                    data={appointmentData}
                    selectedAppointment={
                        selectedAppointment
                    }
                    isOpenForm={isOpenForm}
                    dataByDate={dataByDate}
                    isOpenAppointmentDetail={
                        isOpenAppointmentDetail
                    }
                />
            </Grid>
            <RightBar>
                <AppointmentDemand />
            </RightBar>
        </Grid>
    );
}

Appointment.propTypes = {};

export default memo(Appointment);
