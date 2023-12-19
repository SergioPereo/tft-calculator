'use client'

import { useState } from "react";
import { Range } from "react-range";

export default function Home() {

  const [userLevel, setUserLevel] = useState([5]);
  const [unitCost, setUnitCost] = useState([3]);
  const [unitTaken, setUnitTaken] = useState(null);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="units-calculator-inputs">
        <label>User level: {userLevel[0]}</label>
        <Range
          step={1}
          min={1}
          max={10}
          values={userLevel}
          onChange={(values) => setUserLevel(values)}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '6px',
                width: '100%',
                backgroundColor: '#ccc'
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '10px',
                width: '15px',
                backgroundColor: '#999'
              }}
            />
          )}
        />
      </div>
      <div className="units-calculator-inputs">
        <label>Unit cost: {unitCost[0]}</label>
        <Range
          step={1}
          min={1}
          max={5}
          values={unitCost}
          onChange={(values) => setUnitCost(values)}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '6px',
                width: '100%',
                backgroundColor: '#ccc'
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '10px',
                width: '15px',
                backgroundColor: '#999'
              }}
            />
          )}
        />
      </div>
      <div className="units-calculator-inputs">
        <label>Selected unit taken:</label>
        <input type="number" placeholder="0" value={unitTaken} onChange={e=>setUnitTaken(e.target.value)}/>
      </div>
    </main>
  )
}
