import React, { useEffect, useState } from 'react'
import {Typography, DatePicker, message} from 'antd';
import moment from 'moment'

const TimePeriod = ({checkDateSet}) => {
    const [startDt, setStartDt] = useState(moment('2019-01'))
    const [endDt, setEndDt] = useState(moment('2019-12'))
    const [datesetImport, setDateSetImport] = useState(false)
    const [datesetExport, setDateSetExport] = useState(false)

    useEffect(() => {

        (datesetExport && datesetImport && startDt && endDt && (endDt > startDt)) ?  checkDateSet(1) :  checkDateSet(0)

        if(endDt < startDt) {
            message.warning('End date must be later than start date');
        }

    }, [datesetImport, datesetExport, startDt, endDt])

    const startDate = (date, dateString)=> {
        console.log(date, dateString);
        setStartDt(date)
        setDateSetImport(true)
     }

     const endDate = (date, dateString)=> {
        console.log(date, dateString);
        setEndDt(date)
        setDateSetExport(true)
        
     }


    return (
        <div>

                <Typography>Start</Typography>
                <DatePicker onChange={startDate} picker="month" value={startDt} />

                <Typography>End</Typography>
                <DatePicker onChange={endDate} picker="month" value={endDt} style={{marginBottom:"30px"}} />
            
        </div>
    )
}

export default TimePeriod
