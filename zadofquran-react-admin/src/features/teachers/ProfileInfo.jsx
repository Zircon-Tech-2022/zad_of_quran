import React from "react";
import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";

const ProfileInfo = ({ user }) => {
    const gender = !user.gender && "غير متوفر" || user.gender && user.gender == "male" && "ذكر" || "أنثى"

    return (
        <Card sx={{
            marginBottom: "20px",
        }}>
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
                        <Typography variant="body2">{"رقم الهاتف"}: {user.phone}</Typography>
                        <Typography variant="body2">{"السن"}: {user.age ?? "غير متوفر"}</Typography>
                        <Typography variant="body2">{"النوع"}: {gender}</Typography>
                        <Typography variant="body2">{"المؤهلات"}: {user.qualifications}</Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card >
    )
};

export default ProfileInfo;
