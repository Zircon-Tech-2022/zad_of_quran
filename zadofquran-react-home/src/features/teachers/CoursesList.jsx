import React from "react";
import { Avatar, Card, CardContent, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { t } from "i18next";

const CoursesList = ({ courses }) => (
    <Card>
        <CardContent>
            <Typography variant="h6" gutterBottom>
                {t("coursesWord")}
            </Typography>
            <List>
                {courses.map((course, index) => (
                    <ListItem key={index}>
                        <ListItemAvatar>
                            <Avatar alt={course.name} src={course.image} />
                        </ListItemAvatar>
                        <ListItemText primary={course.name} secondary={course.description} />
                    </ListItem>
                ))}
            </List>
        </CardContent>
    </Card>
);

export default CoursesList;
