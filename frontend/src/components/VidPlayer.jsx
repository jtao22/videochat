import React, {useContext} from 'react';
import {Grid, Typography, Paper} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {SC} from '../socket';

const useStyles = makeStyles((theme) => ({
    video: {
      width: '550px',
      [theme.breakpoints.down('xs')]: {
        width: '300px',
      },
    },
    gridContainer: {
      justifyContent: 'center',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
      },
    },
    paper: {
      padding: '10px',
      border: '3px solid black',
      margin: '10px',
    },
  }));

const VidPlayer = () => {
    const { name, answered, myVid, userVid, ended, stream, calling } = useContext(SC);
    const classes = useStyles();
    return (
        <Grid container className = {classes.gridContainer}>
            {stream && (
                <Paper className = {classes.paper}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" gutterBottom>{name || "Unnamed User"}</Typography>
                        <video playsInline muted ref={myVid} autoPlay className = {classes.video}/>
                    </Grid>
                </Paper>
            )}
            {answered && !ended &&(
                <Paper className = {classes.paper}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" gutterBottom>{calling.name || "Unnamed User"}</Typography>
                        <video playsInline ref={userVid} autoPlay className = {classes.video}/>
                    </Grid>
                </Paper>
            )}
        </Grid>
    )
}

export default VidPlayer
