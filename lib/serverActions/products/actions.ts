import { products } from '@/lib/models/products/productsModel';
import { eq, ilike, sql } from 'drizzle-orm';
import { db } from '@/lib/db';

import { SelectProduct } from '@/lib/models/products/productsModel';

export async function getProducts(
  search: string,
  offset: number
): Promise<{
  products: SelectProduct[];
  newOffset: number | null;
}> {
  // Always search the full table, not per page
  if (search) {
    return {
      products: await db
        .select()
        .from(products)
        .where(ilike(products.name, `%${search}%`))
        .limit(1000),
      newOffset: null
    };
  }

  if (offset === null) {
    return { products: [], newOffset: null };
  }

  const moreUsers = await db.select().from(products).limit(20).offset(offset);
  const newOffset = moreUsers.length >= 20 ? offset + 20 : null;
  return { products: moreUsers, newOffset };
}

export async function getProductById(id: string) {
  try {
    const product = await db
      .select()
      .from(products)
      .where(eq(products.id, Number(id)));

    return {
      error: false,
      message: 'product fetched successfully',
      data: {
        product
      }
    };
  } catch (error) {
    console.log({ error });
    throw error;
  }
}

export async function addProduct(product: any) {
  try {
    const data = {
      name: product.name,
      price: parseFloat(product.price),
      image: product.image
    };
    await db.insert(products).values(data);
    return true;
  } catch (error) {
    console.log({ error });
    throw error;
  }
}

export async function updateProduct(prod: any, id: string) {
  try {
    const data = {
      name: prod.name,
      price: parseFloat(prod.price),
      image: prod.image
    };
    console.log({ id, data });

    const product = await db
      .select()
      .from(products)
      .where(eq(products.id, Number(id)));

    console.log({ product });
    if (product.length == 0) {
      return {
        error: true,
        message: 'Product not found'
      };
    }
    await db
      .update(products)
      .set(data)
      .where(sql`${products.id} = ${id} `);

    return true;
  } catch (error) {
    console.log({ error });
    throw error;
  }
}

export async function deleteProductById(id: number) {
  await db.delete(products).where(eq(products.id, id));
}
