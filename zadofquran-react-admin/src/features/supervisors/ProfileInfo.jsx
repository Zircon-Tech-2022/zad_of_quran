import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";

const ProfileInfo = ({ user }) => {
    return (
        <Card sx={{ marginBottom: "20px" }}>
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
                        <Typography variant="body2">{"رقم الهاتف"}: <p style={{ direction: 'ltr', display: 'inline' }}>{user.phone}</p></Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card >
    )
};

export default ProfileInfo;
