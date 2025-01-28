import React from "react";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./../lessons/lesson.module.css";

const ProfileInfo = ({ subscriber }) => {
    const gender = !subscriber.gender && "غير متوفر" || subscriber.gender && subscriber.gender == "male" && "ذكر" || "أنثى"
    const age = !subscriber.age && "غير متوفر" || subscriber.age && parseInt(subscriber.age)

    return (
        <Card sx={{
            marginBottom: "20px",
        }}>
            <CardContent>
                <Grid container spacing={2} alignItems="center">
                    <Grid item sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "3px",
                    }}>
                        <Link
                            to={`/subscribers?q=${subscriber.email}`}
                            className={styles.link}
                        >
                            <Typography variant="h4">بيانات المشترك</Typography>
                        </Link>
                        <Typography variant="h5">{"الاسم"}: {subscriber.name}</Typography>
                        <Typography variant="body1">{"البريد الإلكتروني"}: {subscriber.email}</Typography>
                        <Typography variant="body2">{"رقم الهاتف"}: {subscriber.phone}</Typography>
                        <Typography variant="body2">{"السن"}: {age}</Typography>
                        <Typography variant="body2">{"النوع"}: {gender}</Typography>
                        <Typography variant="body2">{"عدد الأفراد"}: {subscriber.persons_count}</Typography>
                        <br />
                        <Typography variant="body2">{"المواعيد المفضلة"}: {subscriber.appointments}</Typography>
                        {subscriber.user && (
                            <>
                                <br /><br />
                                <Typography variant="h5">بيانات حساب المستخدم</Typography>
                                <Typography variant="h6">{"الاسم"}: {subscriber.user.name}</Typography>
                                <Typography variant="body1">{"البريد الإلكتروني"}: {subscriber.user.email}</Typography>
                                <Typography variant="body2">{"رقم الهاتف"}: {subscriber.user.phone}</Typography>
                            </>
                        )}
                        {subscriber.plan && (
                            <>
                                <br /><br />
                                <Typography variant="h5">الخطة الحالية</Typography>
                                <Typography variant="h6">{subscriber.plan.name}</Typography>
                            </>
                        )}
                        <br /><br />
                    </Grid>
                </Grid>
            </CardContent>
        </Card >
    )
};

export default ProfileInfo;
