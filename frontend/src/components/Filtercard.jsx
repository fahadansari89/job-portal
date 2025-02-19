import React, { useEffect, useState } from 'react'
import { Label } from './ui/label'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'

const Filtercard = () => {
    const fitlerData = [
        {
            fitlerType: "Location",
            array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
        },
        {
            fitlerType: "Industry",
            array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
        },
        {
            fitlerType: "Salary",
            array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
        },
    ]
    const [seletedvalue, setSeletedvalue] = useState('')
    const changeHandler = (value) => {
        setSeletedvalue(value)
    }
    useEffect(() => {
        console.log(seletedvalue);

    }, [seletedvalue])

    return (
        <div className='w-full bg-black p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />

            {
                fitlerData.map((data, index) => (
                    <div>
                        <h1 className='font-bold text-lg'>{data.fitlerType}</h1>
                        {
                            data.array.map((item, idx) => {
                                const itemId = `r${index}-${idx}`
                                return (
                                    <div className='flex items-center space-x-2 my-2'>
                                        <input className='checked:bg-indigo-600'
                                            name='filter'
                                            id={itemId}
                                            type='radio'
                                            value={seletedvalue}
                                            onChange={changeHandler}
                                        />
                                        <Label htmlFor={itemId} >{item}</Label>
                                    </div>
                                )
                            })
                        }
                    </div>
                ))
            }

        </div>
    )
}

export default Filtercard