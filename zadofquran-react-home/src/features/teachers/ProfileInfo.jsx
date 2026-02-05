import React from "react";
import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import DOMPurify from 'dompurify';
import { t } from "i18next";

const ProfileInfo = ({ user }) => {
    const phone = !user.phone && t('not-available') || user.phone
    const gender = !user.gender && t('not-available') || user.gender && user.gender == "male" && "ذكر" || "أنثى"
    const age = !user.age && t('not-available') || user.age && parseInt(user.age)

    const sanitizedHTML = DOMPurify.sanitize(!user.qualifications && t('not-available') || user.qualifications);

    return (
        <Card>
            <CardContent>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <Avatar alt={user.name} src={user.image} sx={{ width: 80, height: 80 }} />
                    </Grid>
                    <Grid item sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "3px",
                    }}>
                        <Typography variant="h5">{user.name}</Typography>
                        <Typography variant="body1">{user.email}</Typography>
                        <Typography variant="body2">{t('phoneWord')}: <p style={{ direction: "ltr", display: "inline"}}>{phone}</p></Typography>
                        <Typography variant="body2">{t('gender')}: {gender}</Typography>
                        <Typography variant="body2">{t('age')}: {age}</Typography>
                        <Typography style={{ marginTop: "5px" }} variant="h6">
                            {t('qualifications')}
                        </Typography>
                        <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
};

export default ProfileInfo;
