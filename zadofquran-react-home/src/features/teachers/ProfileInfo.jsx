import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";

const ProfileInfo = ({ user }) => (
    <Card>
        <CardContent>
            <Grid container spacing={2} alignItems="center">
                <Grid item>
                    <Avatar alt={user.name} src={user.image} sx={{ width: 80, height: 80 }} />
                </Grid>
                <Grid item>
                    <Typography variant="h5">{user.name}</Typography>
                    <Typography variant="body1">{user.email}</Typography>
                    <Typography variant="body2">Phone: {user.phone}</Typography>
                    <Typography variant="body2">Age: {user.age}</Typography>
                    <Typography variant="body2">Qualifications: {user.qualifications}</Typography>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
);

export default ProfileInfo;
