import {
  createProduct,
  getAllProducts
} from '@/lib/APIcontrollers/products/productsController';

export const POST = async (req: Request) => {
  return await createProduct(req);
};
export const GET = async (req: Request) => {
  return await getAllProducts(req);
};
