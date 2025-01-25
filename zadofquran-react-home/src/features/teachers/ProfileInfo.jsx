import React from "react";
import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import { t } from "i18next";

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
                    <Typography variant="body2">{t('phoneWord')}: {user.phone}</Typography>
                    <Typography variant="body2">{t('age')}: {user.age}</Typography>
                    <Typography variant="body2">{t('qualifications')}: {user.qualifications}</Typography>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
);

export default ProfileInfo;
