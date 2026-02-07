import { Card, CardContent, Chip, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { t } from "i18next";

const LessonsTable = ({ lessons }) => {
    const daysOfWeek = ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

    const slotsByDay = daysOfWeek.map((day) => ({
        day,
        slots: lessons.flatMap((lesson) =>
            lesson.availabilities.filter((slot) => slot.days.local.toLowerCase() === day)
                .map((slot) => ({
                    lessonId: lesson.id,
                    courseName: lesson.course.name,
                    studentName: lesson.subscriber.name,
                    studentPhone: lesson.subscriber.phone,
                    startTime: slot.start_times.local,
                    endTime: slot.end_times.local,
                }))
        ),
    }));

    return (
        <Card sx={{ overflowX: "scroll" }}>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    {t('lessonsWord')}
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{
                                textAlign: /[\u0600-\u06FF]/.test(t('day')) ? "right" : "left",
                            }}>
                                <Typography variant="h6" gutterBottom>
                                    {t('day')}
                                </Typography>
                            </TableCell>
                            <TableCell sx={{
                                textAlign: /[\u0600-\u06FF]/.test(t('day')) ? "right" : "left",
                            }}>
                                <Typography variant="h6" gutterBottom>
                                    {t('slots')}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {slotsByDay.map(({ day, slots }) => (
                            <TableRow key={day}>
                                <TableCell sx={{
                                    textAlign: /[\u0600-\u06FF]/.test(t('day')) ? "right" : "left",
                                }}>
                                    {t(`${day}`)}
                                </TableCell>
                                <TableCell sx={{
                                    textAlign: /[\u0600-\u06FF]/.test(t('slots')) ? "right" : "left",
                                }}>
                                    {slots.length > 0 ? (
                                        <ul>
                                            {slots.map((slot, index) => (
                                                <li key={index} style={{ marginBottom: "10px" }}>
                                                    <Chip 
                                                        sx={{
                                                            color: (theme) => theme.palette.common.white,
                                                            backgroundColor: (theme) => theme.palette.secondary.main,
                                                        }} 
                                                        variant="outlined" 
                                                        label={
                                                            <>
                                                                #{slot.lessonId} | {slot.startTime} - {slot.endTime} | {slot.courseName} | {slot.studentName} /{' '}
                                                                <p style={{ direction: 'ltr', display: 'inline' }}>
                                                                    {slot.studentPhone}
                                                                </p>
                                                            </>
                                                        } 
                                                    />
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        t('noLessons')
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
