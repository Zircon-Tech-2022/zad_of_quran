import { Card, CardContent, Chip, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import React from "react";

const LessonsTable = ({ lessons }) => {
    const daysOfWeek = ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

    const slotsByDay = daysOfWeek.map((day) => ({
        day,
        slots: lessons.flatMap((lesson) =>
            lesson.availabilities.filter((slot) => slot.days.local.toLowerCase() === day)
                .map((slot) => ({
                    lessonId: lesson.id,
                    courseName: lesson.course.name,
                    startTime: slot.start_times.local,
                    endTime: slot.end_times.local,
                }))
        ),
    }));

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Lessons
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Day</TableCell>
                            <TableCell>Slots</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {slotsByDay.map(({ day, slots }) => (
                            <TableRow key={day}>
                                <TableCell>{day.charAt(0).toUpperCase() + day.slice(1)}</TableCell>
                                <TableCell>
                                    {slots.length > 0 ? (
                                        <ul>
                                            {slots.map((slot, index) => (
                                                <li key={index} style={{ marginBottom: "10px" }}>
                                                    <Chip sx={{
                                                        color: (theme) => theme.palette.common.white,
                                                        backgroundColor: (theme) => theme.palette.secondary.main,
                                                    }} variant="outlined" label={`#${slot.lessonId} | ${slot.courseName} | ${slot.startTime} - ${slot.endTime}`} />
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        'No lessons'
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default LessonsTable;
