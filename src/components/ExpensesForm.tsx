import { addExpense } from '@/actions/actions'
import React from 'react'

export default function ExpensesForm() {
    return (
        <form
            action={addExpense}
            className='w-full mt-8 rounded overflow-hidden'
        >
            <input
                type="text"
                name="description"
                placeholder="Description"
                className='w-full px-3 py-2 outline-none bg-white'
            />

            <input
                type="number"
                name="amount"
                placeholder="Amount"
                className='w-full px-3 py-2 outline-none bg-white'
            />

            <button className='w-full bg-blue-500 text-white p-2 font-bold'>
                Add Expense
            </button>
        </form>
    )
}
