import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {getMemberAttendance} from '../../api/api'
import AttendanceList from './AttendanceList'

export default function AttendancePage() {
  const { username } = useParams()
  const [attendance, setAttendance] = useState([])

  useEffect(() => {
    getMemberAttendance(username).then(res => setAttendance(res.data))
  }, [username])

  return <AttendanceList attendance={attendance} />
}
