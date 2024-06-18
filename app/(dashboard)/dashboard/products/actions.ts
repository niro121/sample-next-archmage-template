'use server';

// import { deleteUserById } from '@/lib/db';
import {
  addProduct,
  getProductById,
  updateProduct
} from '@/lib/serverActions/products/actions';
import { deleteProductById } from '@/lib/serverActions/products/actions';
import { revalidatePath } from 'next/cache';

export async function deleteProduct(prodId: number) {
  // Uncomment this to enable deletion
  await deleteProductById(prodId);
  revalidatePath('/');
}

export async function addProductAction(values: any) {
  await addProduct(values);
}
export async function updateProductAction(values: any, id: string) {
  await updateProduct(values, id);
}

export async function fetchSingleProductById(id: string) {
  return await getProductById(id);
}
