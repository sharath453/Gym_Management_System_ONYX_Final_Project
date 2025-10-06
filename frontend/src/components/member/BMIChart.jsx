import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function BMIChart({ data }) {
  return (
    <div className="card">
      <h3>BMI History</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="created_at" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="bmi_value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
