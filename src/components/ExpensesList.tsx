'use client';

import { deleteExpense } from "@/actions/actions";

interface ExpensesListProps {
    expenses: {
        id: number;
        description: string;
        amount: number;
        creatorId: string;
        createdAt: Date;
    }[];
}

export default function ExpensesList({ expenses }: ExpensesListProps) {
    return (
        <ul className='h-[300px] bg-white rounded mt-4 shadow-md'>
            {expenses.map(expense => (
                <li key={expense.id} className='flex items-center px-4 py-2 border-b'>
                    <p>{expense.description}</p>
                    <p className='ml-auto font-bold mr-[15px]'>${expense.amount.toFixed(2)}</p>
                    <button
                        onClick={async () => {
                            await deleteExpense(expense.id);
                        }}
                        className='text-[10px] h-[20px] w-[20px] bg-red-500 text-white rounded hover:bg-red-600'
                    >
                        X
                    </button>
                </li>
            ))}
            {expenses.length === 0 && (
                <li className='text-center text-gray-500 py-4'>No expenses found</li>
            )}
        </ul>
    )
}
