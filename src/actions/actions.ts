"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addExpense(formData: FormData) {
    await prisma.expense.create({
        data: {
            description: formData.get("description") as string,
            amount: parseFloat(formData.get("amount") as string),
        },
    });

    revalidatePath("/app/dashboard");
}

export async function deleteExpense(id: number) {
    await prisma.expense.delete({
        where: {
            id,
        },
    });

    revalidatePath("/app/dashboard");
}