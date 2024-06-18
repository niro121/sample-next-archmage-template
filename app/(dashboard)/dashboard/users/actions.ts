'use server';

// import { deleteUserById } from '@/lib/db';
import { deleteUserById } from '@/lib/serverActions/users/actions';
import { revalidatePath } from 'next/cache';

export async function deleteUser(userId: number) {
  // Uncomment this to enable deletion
  await deleteUserById(userId);
  revalidatePath('/');
}
