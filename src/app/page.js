'use client'

import { useState } from "react";
import { Range } from "react-range";
import { combinations, pow } from "mathjs";
import {
  Chart as ChartJS,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale
} from 'chart.js'; 
import { Bar } from "react-chartjs-2";
import "./styles/main.css"

ChartJS.register(
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale
)

export default function Home() {

  const [userLevel, setUserLevel] = useState([5]);
  const [unitCost, setUnitCost] = useState([3]);
  const [unitTaken, setUnitTaken] = useState("");
  const [costTaken, setCostTaken] = useState("");
  const [goldToRoll, setGoldToRoll] = useState("");
  const [probabilities, setProbabilities] = useState(null)
  const [accumulatedProb, setAccumulatedProb] = useState(null)

  const probabilities_costs = [
      [1,0,0,0,0], 
      [1,0,0,0,0], 
      [0.75,0.25,0,0,0], 
      [0.55,0.30,0.15,0,0], 
      [0.45,0.33,0.2,0.02,0], 
      [0.3,0.4,0.25,0.05,0],
      [0.19,0.35,0.35,0.1,0.01],
      [0.18,0.25,0.36,0.18,0.03],
      [0.1,0.2,0.25,0.35,0.1],
      [0.05,0.1,0.2,0.4,0.25]
  ]

  const pool_costs_champs = [13, 13, 13, 13, 8]
  const pool_costs = [22, 20, 17, 10, 9]
  const calc_k = (selected_unit_cost, selected_unit_taken) => {
    return pool_costs[selected_unit_cost-1] - selected_unit_taken
  }
  const calc_m = (selected_unit_cost, same_cost_taken) => {
    return pool_costs[selected_unit_cost-1]*pool_costs_champs[selected_unit_cost-1] - same_cost_taken
  }
  const density_function = (x, offset=0) => {
    let k = calc_k(unitCost, unitTaken)-offset
    let m = calc_m(unitCost, costTaken)-offset

    let comb = combinations(5, x)
    let succ_prob = k/m
    let cost_prob = probabilities_costs[userLevel-1][unitCost-1]
    let succ_full_prob = succ_prob*cost_prob
    return comb*pow(succ_full_prob, x)*pow((1-succ_full_prob),5-x)
  }

  
  const make_percentage = (number) => {
    return (number*100).toFixed(2)
  }

  const prob_e0 = (stores) => {
    if(calc_k(unitCost, unitTaken) <= 0)
      return 1
    return pow(density_function(0), stores)
  }

  const prob_e1 = (stores) => {
    if(calc_k(unitCost, unitTaken) < 1)
      return 0
    return combinations(stores, 1)*
    pow(density_function(0),stores-1)*
    density_function(1)
  }

  const prob_e2 = (stores) => {
    if(calc_k(unitCost, unitTaken) < 2)
      return 0
    return (
      combinations(stores, 1)*
      pow(density_function(0),stores-1)*
      density_function(2)
    )+(
      combinations(stores, 2)*
      density_function(1)*
      density_function(1, 1)*
      pow(density_function(0),stores-2)
    )
  }

  const prob_e3 = (stores) => {
    if(calc_k(unitCost, unitTaken) < 3)
      return 0
    return (
      combinations(stores, 1)*
      pow(density_function(0),stores-1)*
      density_function(3)
    )+(
      ((stores*(stores-1))/2)*
      pow(density_function(0),stores-2)*
      density_function(1)*
      density_function(2, 1)
    )+(
      ((stores*(stores-1))/2)*
      pow(density_function(0),stores-2)*
      density_function(2)*
      density_function(1, 2)
    )+(
      combinations(stores, 3)*
      pow(density_function(0),stores-3)*
      density_function(1)*
      density_function(1, 1)*
      density_function(1, 2)
    )
  }

  const prob_e4 = (stores) => {
    if(calc_k(unitCost, unitTaken) < 4)
      return 0
    return (
      combinations(stores, 1)*
      pow(density_function(0),stores-1)*
      density_function(4)
    )+(
      combinations(stores, 2)*
      density_function(2)*
      density_function(2, 2)*
      pow(density_function(0),stores-2)
    )+(
      ((stores*(stores-1))/2)*
      pow(density_function(0),stores-2)*
      density_function(1)*
      density_function(3, 1)
    )+(
      ((stores*(stores-1))/2)*
      pow(density_function(0),stores-2)*
      density_function(3)*
      density_function(1, 3)
    )+(
      ((stores*(stores-1)*(stores-2))/2)*
      pow(density_function(0),stores-3)*
      pow(density_function(1),2)*
      density_function(2)
    )+(
      combinations(stores, 4)*
      density_function(1)*
      density_function(1,1)*
      density_function(1,2)*
      density_function(1,3)*
      pow(density_function(0),stores-4)
    )
  }

  const prob_e5 = (stores) => {
    if(calc_k(unitCost, unitTaken) < 5)
      return 0
    return (
      combinations(stores, 1)*
      pow(density_function(0),stores-1)*
      density_function(5)
    )+(
      combinations(stores, 5)*
      density_function(1)*
      density_function(1,1)*
      density_function(1,2)*
      density_function(1,3)*
      density_function(1,4)*
      pow(density_function(0),stores-5)
    )+(
      ((stores*(stores-1))/2)*
      pow(density_function(0),stores-2)*
      density_function(4)*
      density_function(1,4)
    )+(
      ((stores*(stores-1))/2)*
      pow(density_function(0),stores-2)*
      density_function(1)*
      density_function(4,1)
    )+(
      ((stores*(stores-1))/2)*
      pow(density_function(0),stores-2)*
      density_function(3)*
      density_function(2,3)
    )+(
      ((stores*(stores-1))/2)*
      pow(density_function(0),stores-2)*
      density_function(2)*
      density_function(3,2)
    )+(
      ((stores*(stores-1)*(stores-2))/2)*
      pow(density_function(0),stores-3)*
      pow(density_function(2),2)*
      density_function(1)
    )+(
      ((stores*(stores-1)*(stores-2))/2)*
      pow(density_function(0),stores-3)*
      pow(density_function(1),2)*
      density_function(3)
    )+(
      ((stores*(stores-1)*(stores-2)*(stores-3))/6)*
      pow(density_function(1),3)*
      pow(density_function(0),stores-4)*
      density_function(2)
    )
  }

  const calculate = () => {
    console.log(typeof costTaken, typeof unitTaken, typeof unitCost, typeof userLevel, typeof goldToRoll)
    if(isNaN(costTaken) || isNaN(unitTaken) || isNaN(unitCost) || isNaN(userLevel) || isNaN(goldToRoll)){
      alert("All inputs must be numbers")
      return
    }
    if (!((costTaken || costTaken==0) && (unitTaken || unitTaken==0) && unitCost && userLevel && goldToRoll)){
      alert("You must fill all inputs")
      return
    }
    if (costTaken >= pool_costs[unitCost-1]*pool_costs_champs[unitCost-1] || costTaken<0){
      alert("Cost taken out of range")
      return
    }
    if (unitTaken >= pool_costs[unitCost-1] || unitTaken<0){
      alert("Unit taken out of range")
      return
    }
    if(goldToRoll < 10){
      alert("You need at least 10 gold")
      return
    }

    const stores = ~~(goldToRoll/2)
    //console.log(stores)

    /* const e0 = prob_e0(stores)
    const e1 = prob_e1(stores)
    const e2 = prob_e2(stores)
    const e3 = prob_e3(stores)
    const e4 = prob_e4(stores)
    const e5 = prob_e5(stores) */
    const probs = [prob_e0(stores), prob_e1(stores), prob_e2(stores), prob_e3(stores), prob_e4(stores), prob_e5(stores)]
    const graphic_probs = [make_percentage(probs[0]), make_percentage(probs[1]), make_percentage(probs[2]), make_percentage(probs[3]), make_percentage(probs[4]), make_percentage(probs[5])]
    
    let actual_accumulation = 0
    let accumulated_probabilities = probs.map(probability => {
      actual_accumulation += probability
      return ((1-actual_accumulation)*100).toFixed(2)
    })
    setProbabilities(graphic_probs)
    setAccumulatedProb(accumulated_probabilities)
    //console.log(probs)
  }

  const labels = [0, 1, 2, 3, 4, 5]
  const data = {
    labels,
    datasets:[
      {
        label: 'Probability',
        data: probabilities,
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      }
    ]
  }
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Unit probabilities',
      },
    },
    scales:{
      y:{
        ticks:{
          callback: function(value, index, values){
            return value + '%';
          }
        },
        min: 0,
        max: 100
      }
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <a href="https://github.com/SergioPereo/tft-calculator" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Github</a>
      <div className="units-calculator-inputs">
        <label>User level: {userLevel}</label>
        <Range
          step={1}
          min={1}
          max={10}
          values={[userLevel]}
          onChange={(values) => setUserLevel(values[0])}
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
        <label>Unit cost: {unitCost}</label>
        <Range
          step={1}
          min={1}
          max={5}
          values={[unitCost]}
          onChange={(values) => setUnitCost(values[0])}
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
        <input type="number" placeholder="0" value={unitTaken} onChange={e=>setUnitTaken(parseInt(e.target.value))}/>
      </div>
      <div className="units-calculator-inputs">
        <label>Selected cost taken:</label>
        <input type="number" placeholder="0" value={costTaken} onChange={e=>setCostTaken(parseInt(e.target.value))}/>
      </div>
      <div className="units-calculator-inputs">
        <label>Gold to roll:</label>
        <input type="number" placeholder="0" value={goldToRoll} onChange={e=>setGoldToRoll(parseInt(e.target.value))}/>
      </div>
      
      <div className="units-calculator-inputs">
        <button onClick={(e) => calculate(e)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Calculate</button>
      </div>
      
      <div className="prob-cards">
        {
          accumulatedProb!=null ? (
            accumulatedProb.map((probability, index) => (
              <div className="card" key={probability}>
                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">Probability of hitting at least {index===0 ? "a unit: ":(index+1) + " units"}</div>
                    <p className="text-gray-700 text-base">
                      {probability}%
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div/>
          )
        }
      </div>
      <div className="units-calculator-outputs">
        {
          probabilities!=null ? (
            <div>
              <Bar
                data={data}
                options={options}
              />
            </div>
          ) : (
            <div/>
          )
        }
      </div>
    </main>
  )
}
