import prisma from '@/lib/db';
import ExpensesForm from "@/components/ExpensesForm";
import ExpensesList from "@/components/ExpensesList";
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
    // Auth check
    const { isAuthenticated, getUser } = getKindeServerSession();

    if (!(await isAuthenticated())) {
        return redirect('/api/auth/login');
    }

    const user = await getUser();
    console.log('🚀 ~ Dashboard ~ user:', user)

    if (!user) {
        throw new Error("User not found");
    }

    const expenses = await prisma.expense.findMany({
        where: {
            creatorId: user.id
        }
    });

    return (
        <div>
            <h1 className="text-3xl font-bold text-white text-center">
                Dashboard
            </h1>

            <div className="w-full max-w-[600px] mx-auto">
                <ExpensesList expenses={expenses} />

                <ExpensesForm />
            </div>
        </div>
    )
}
