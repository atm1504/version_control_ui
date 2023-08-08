import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import HotelIcon from '@mui/icons-material/Hotel';
import RepeatIcon from '@mui/icons-material/Repeat';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useState, useEffect } from 'react';


export default function CustomizedTimeline() {
    const baseUrl = "http://localhost:4000/api"
    const [changes, setChanges] = useState([])

    const getChanges = () => {
        // Call API to save content
        axios.get(baseUrl + '/changes')
            .then(response => {

                console.log(response)
                const changeList = response.changes
                const timeLineList = []

                const resp = []
                changeList.map(changeObj => {
                    const obj = <TimelineItem>
                        <TimelineOppositeContent
                            sx={{ m: 'auto 0' }}
                            align="right"
                            variant="body2"
                            color="text.secondary"
                        >
                            changeObj.timestamp
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineConnector />
                            <TimelineDot>
                                <FastfoodIcon />
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{ py: '12px', px: 2 }}>
                            <Typography variant="h6" component="span">
                                changeObj.username
                            </Typography>
                            <Typography>Because you need strength</Typography>
                            <Typography>Because you need strength</Typography>
                            <Typography>Because you need strength</Typography>

                            <Typography>Because you need strength</Typography>

                        </TimelineContent>
                    </TimelineItem>

                    timeLineList.push(obj)
                })

                setChanges(timeLineList)
                console.log(changes)

            })
            .catch(error => {
                console.log("error occurred while fetching errors")
            });
    };

    useEffect(() => {
        getChanges(); // Call the API when the page opens up
    }, []);
    return (
        <Timeline position="alternate">
            {{ changes }}
        </Timeline>
    );
}
