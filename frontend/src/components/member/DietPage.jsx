import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {getMemberDiets} from '../../api/api'
import DietCard from './DietCard'

export default function DietPage() {
  const { username } = useParams()
  const [diets, setDiets] = useState([])

  useEffect(() => {
    getMemberDiets(username).then(res => setDiets(res.data))
  }, [username])

  return (
    <div>
      <h1>Diet Plan</h1>
      <div className="grid grid-3">
        {diets.map(d => <DietCard key={d.id} diet={d} />)}
      </div>
    </div>
  )
}
