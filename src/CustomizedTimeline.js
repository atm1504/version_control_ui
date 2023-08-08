import React, { useState, useEffect } from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import Typography from '@mui/material/Typography';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import HotelIcon from '@mui/icons-material/Hotel';
import RepeatIcon from '@mui/icons-material/Repeat';

export default function CustomizedTimeline({ changeList }) {
    const [changes, setChanges] = useState([]);

    const iconsList = [<TimelineDot>
        <FastfoodIcon />
    </TimelineDot>
        , <TimelineDot color="primary">
        <LaptopMacIcon />
    </TimelineDot>
        , <TimelineDot color="primary" variant="outlined">
        <HotelIcon />
    </TimelineDot>
        , <TimelineDot color="secondary">
        <RepeatIcon />
    </TimelineDot>
    ]

    const processChanges = async () => {

        console.log("hnage log so far")
        console.log(changeList)

        const timeLineList = changeList.map(changeObj => {
            const temp = []
            changeObj.changes.map(d => {
                temp.push(<Typography>{d}</Typography>)
            })
            return <TimelineItem key={changeObj.id}>
                <TimelineOppositeContent
                    sx={{ m: 'auto 0' }}
                    align="right"
                    variant="body2"
                    color="text.secondary"
                >
                    {changeObj.timestamp}
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineConnector />

                    {iconsList[(changeObj.id) % (iconsList.length)]}
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Typography variant="h6" component="span">
                        {changeObj.username}
                    </Typography>
                    {temp}

                </TimelineContent>
            </TimelineItem>
        });

        setChanges(timeLineList);

    }

    useEffect(() => {
        processChanges();
    }, [changeList]);

    return (
        <Timeline position="alternate">
            {changes}
        </Timeline>
    );
}
