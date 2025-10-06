import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {getMemberBMI} from '../../api/api'
import BMIChart from './BMIChart'

export default function BMIPage() {
  const { username } = useParams()
  const [bmiData, setBmiData] = useState({ current: {}, history: [] })

  useEffect(() => {
    getMemberBMI(username).then(res => setBmiData(res.data))
  }, [username])

  return (
    <div>
      <h1>BMI</h1>
      <BMIChart data={[bmiData.current, ...bmiData.history]} />
    </div>
  )
}
