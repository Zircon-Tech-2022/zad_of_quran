import React from "react";
import { Avatar, Card, CardContent, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { t } from "i18next";

const CoursesList = ({ courses }) => (
    <Card>
        <CardContent>
            <Typography variant="h5" gutterBottom>
                {t("coursesWord")}
            </Typography>
            <List>
                {courses.length > 0 ? courses.map((course, index) => (
                    <ListItem sx={{
                        textAlign: /[\u0600-\u06FF]/.test(course.name) ? "right" : "left",
                        direction: /[\u0600-\u06FF]/.test(course.name) ? "rtl" : "ltr",
                    }} key={index}>
                        <ListItemAvatar>
                            <Avatar alt={course.name} src={course.image} />
                        </ListItemAvatar>
                        <ListItemText primary={course.name} secondary={course.description} />
                    </ListItem>
                )) : (t('noCourses'))}
            </List>
        </CardContent>
    </Card>
);

export default CoursesList;
