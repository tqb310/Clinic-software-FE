import React, {memo} from 'react';
import {headCells} from '../../_constants/HeadCells';
import {tableHeadCellStyles} from '_constants/TableHeaderStyles';
import {gender} from '_constants/general';
import {Table, TableCell} from '_components/shared/Table2';
import {
    Checkbox,
    Avatar,
    Box,
    Typography,
    IconButton,
} from '@mui/material';
import MalePatient from '_assets/images/male-patient.png';
import FemalePatient from '_assets/images/female-patient.png';
// import {StatusPaper} from '_components/shared/StyledComponent';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useDispatch} from 'react-redux';
import {select} from '_redux/slice/patientSlice';
// import PropTypes from 'prop-types'
import {styled} from '@mui/material/styles';

const BodyCell = styled(TableCell)`
    text-align: left;
    height: 60px;
    font-size: 1.5rem;
`;

function PatientTable({tableData, selected}) {
    const dispatch = useDispatch();
    //Handle when check a row
    const handleSelect = id => e => {
        if (e.target.checked) {
            dispatch(select([...selected, id]));
        } else {
            dispatch(
                select([...selected].filter(i => i !== id)),
            );
        }
    };
    //Handle when check all rows
    const handleSelectAll = e => {
        if (e.target.checked) {
            dispatch(select(tableData.map(row => row.id)));
        } else {
            dispatch(select([]));
        }
    };

    return (
        <Table
            sx={{
                borderCollapse: 'collapse',
                userSelect: 'none',
                width: '100%',
            }}
            data={tableData}
            hoverStyle={{
                backgroundColor: '#f8f8f8',
                '& svg': {opacity: 1},
            }}
            activeStyle={{
                backgroundColor: '#f8f8f8',
                '& svg': {opacity: 1},
            }}
            pagination
            rowsPerPage={8}
            selected={selected}
            header={() => {
                return (
                    <>
                        <TableCell
                            sx={{
                                width: '20px',
                                ...tableHeadCellStyles,
                            }}
                            type="th"
                            align="right"
                        >
                            <Checkbox
                                indeterminate={
                                    selected.length > 0 &&
                                    selected.length <
                                        tableData.length
                                }
                                checked={
                                    tableData.length &&
                                    selected.length ===
                                        tableData.length
                                }
                                onChange={handleSelectAll}
                            />
                        </TableCell>
                        {headCells &&
                            headCells.map(
                                ({
                                    id,
                                    label,
                                    style,
                                    ...rest
                                }) => (
                                    <TableCell
                                        key={id}
                                        type="th"
                                        sx={{
                                            ...style,
                                            ...tableHeadCellStyles,
                                        }}
                                        {...rest}
                                    >
                                        <Typography
                                            variant="subtitle2"
                                            component="span"
                                        >
                                            {label}
                                        </Typography>
                                    </TableCell>
                                ),
                            )}
                    </>
                );
            }}
            renderDataRow={row => (
                <>
                    <BodyCell
                        type="td"
                        sx={{
                            textAlign: 'center',
                            width: '20px',
                        }}
                    >
                        <Checkbox
                            checked={selected.includes(
                                row.id,
                            )}
                            onChange={handleSelect(row.id)}
                        />
                    </BodyCell>
                    <BodyCell
                        type="td"
                        sx={{
                            textAlign: 'center',
                        }}
                    >
                        {row.id}
                    </BodyCell>
                    <BodyCell
                        type="td"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar
                            src={
                                row.gender
                                    ? MalePatient
                                    : FemalePatient
                            }
                            sx={{
                                width: 32,
                                height: 32,
                                mr: 1,
                            }}
                        />
                        <Box>
                            <p>
                                {row.last_name +
                                    ' ' +
                                    row.first_name}
                            </p>
                            <Typography color="#888">
                                {row.phone}
                            </Typography>
                        </Box>
                    </BodyCell>
                    <BodyCell type="td">{row.dob}</BodyCell>
                    <BodyCell type="td">
                        {row.gender ? 'Nữ' : 'Nam'}
                    </BodyCell>
                    <BodyCell type="td">
                        {row.district +
                            ' - ' +
                            row.province}
                    </BodyCell>
                    <BodyCell
                        type="td"
                        sx={{
                            width: '45px',
                            '& svg': {
                                opacity: 0.5,
                                transition: 'opacity .3s',
                            },
                        }}
                    >
                        <IconButton>
                            <FontAwesomeIcon icon="pen-to-square" />
                        </IconButton>
                    </BodyCell>
                    <BodyCell
                        type="td"
                        sx={{
                            width: '45px',
                            '& svg': {
                                opacity: 0.5,
                                transition: 'opacity .3s',
                            },
                        }}
                    >
                        <IconButton>
                            <FontAwesomeIcon icon="pen-to-square" />
                        </IconButton>
                    </BodyCell>
                </>
            )}
        />
    );
}

PatientTable.propTypes = {};

export default memo(PatientTable);
