import React from "react";
import { Card, CardContent, Chip, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";

const AvailabilityTable = ({ availabilities }) => {
    const daysOfWeekTrans = {
        "saturday": "السبت",
        "sunday": "الأحد",
        "monday": "الإثنين",
        "tuesday": "الثلاثاء",
        "wednesday": "الأربعاء",
        "thursday": "الخميس",
        "friday": "الجمعة"
    }

    const daysOfWeekEn = ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

    const slotsByDay = daysOfWeekEn.map((day) => ({
        day: daysOfWeekTrans[day],
        slots: availabilities.filter((slot) => slot.days.local.toLowerCase() === day)
            .map((slot) => ({
                startTime: slot.start_times.local,
                endTime: slot.end_times.local,
            })),
    }));

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    الإتاحة
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{
                                textAlign: "right",
                            }}>
                                <Typography variant="h6" gutterBottom>
                                    اليوم
                                </Typography>
                            </TableCell>
                            <TableCell sx={{
                                textAlign: "right",
                            }}>
                                <Typography variant="h6" gutterBottom>
                                    الفترات
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {slotsByDay.map(({ day, slots }) => (
                            <TableRow key={day}>
                                <TableCell sx={{
                                    textAlign: "right"
                                }}>{day}</TableCell>
                                <TableCell sx={{
                                    textAlign: "right",
                                }}>
                                    {slots.length > 0 ? (
                                        <ul>
                                            {slots.map((slot, index) => (
                                                <li key={index} style={{ marginBottom: "10px" }}>
                                                    <Chip sx={{
                                                        color: (theme) => theme.palette.common.white,
                                                        backgroundColor: (theme) => theme.palette.secondary.main,
                                                    }} variant="outlined" label={`${slot.startTime} - ${slot.endTime}`} />
                                                </li>
                                            ))}
                                        </ul>
                                    ) :
                                        ("لا فترات متاحة")}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card >
    );
};

export default AvailabilityTable;
