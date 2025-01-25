import React from "react";
import { Avatar, Card, CardContent, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";

const CoursesList = ({ courses }) => (
    <Card>
        <CardContent>
            <Typography variant="h5" gutterBottom>
                الدورات
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
                )) : ("لا يوجد دورات")}
            </List>
        </CardContent>
    </Card>
);

export default CoursesList;
