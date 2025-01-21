import { Avatar, Card, CardContent, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import React from "react";

const CoursesList = ({ courses }) => (
    <Card>
        <CardContent>
            <Typography variant="h6" gutterBottom>
                Courses
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
