"use server";

import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addExpense(formData: FormData) {
    // Auth check
    const { isAuthenticated, getUser } = getKindeServerSession();

    if (!(await isAuthenticated())) {
        return redirect('/api/auth/login');
    }

    const user = await getUser();

    if (!user) {
        throw new Error("User not found");
    }

    await prisma.expense.create({
        data: {
            description: formData.get("description") as string,
            amount: parseFloat(formData.get("amount") as string),
            creatorId: user.id,
        },
    });

    revalidatePath("/app/dashboard");
}

export async function deleteExpense(id: number) {
    // Auth check
    const { isAuthenticated } = getKindeServerSession();

    if (!(await isAuthenticated())) {
        return redirect('/api/auth/login');
    }

    await prisma.expense.delete({
        where: {
            id,
        },
    });

    revalidatePath("/app/dashboard");
}