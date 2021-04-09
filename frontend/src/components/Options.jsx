import React, {useContext, useState} from 'react';
import {SC} from '../socket';
import {Button, TextField, Grid, Typography, Container, Paper} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Assignment, Phone, PhoneDisabled} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    gridContainer: {
      width: '100%',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
      },
    },
    container: {
      width: '600px',
      margin: '35px 0',
      padding: 0,
      [theme.breakpoints.down('xs')]: {
        width: '80%',
      },
    },
    margin: {
      marginTop: 20,
    },
    padding: {
      padding: 20,
    },
    paper: {
      padding: '10px 20px',
      border: '3px solid black',
    },
  }));

const Options = ({children}) => {
    const {me, answered, name, setName, ended, leave, call} = useContext(SC);
    const [toCall, setToCall] = useState('');
    const classes = useStyles();
    return (
        <Container className = {classes.container}>
            <Paper elevation={15} className={classes.paper}>
                <form className = {classes.root} noValidate autoComplete="on">
                    <Grid container className={classes.gridContainer}>
                        <Grid item xs={12} md={6} className = {classes.padding}>
                            <Typography gutterBottom variant="h6">Profile</Typography>
                            <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth/>
                            <CopyToClipboard text={me} className = {classes.margin}>
                                <Button variant="contained" color="primary" fullWidth startIcon={<Assignment fontSize="large"/>}>Copy ID</Button>
                            </CopyToClipboard>
                        </Grid>

                        <Grid item xs={12} md={6} className = {classes.padding}>
                            <Typography gutterBottom variant="h6">Call</Typography>
                            <TextField label="ID to Call" value={toCall} onChange={(e) => setToCall(e.target.value)} fullWidth/>
                            {answered && !ended ? (
                                <Button className = {classes.margin} variant="contained" color="secondary" fullWidth startIcon={<PhoneDisabled fontSize="large"/>} onClick = {leave}>Leave Call</Button>
                            ) : (
                                <Button className = {classes.margin} variant="contained" color="primary"  startIcon={<Phone fontSize="large"/>} fullWidth onClick = {() => call(toCall)}>Call</Button>
                            )}
                        </Grid>
                    </Grid>
                </form>
                {children}
            </Paper>
        </Container>
    )
}

export default Options
