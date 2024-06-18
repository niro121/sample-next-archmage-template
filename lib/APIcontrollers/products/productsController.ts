import { db } from '@/lib/db';
import { sendErrorResponse } from '@/lib/helpers/ServerResponses/sendErrorResponse';
import { sendStandardResponse } from '@/lib/helpers/ServerResponses/sendStandardResponse';
import { products } from '@/lib/models/products/productsModel';

export const createProduct = async (req: Request) => {
  try {
    const { data } = await req.json();

    const productData = {
      name: data.name,
      price: data.price,
      image: data.image
    };

    const product = await db.insert(products).values(productData);

    return sendStandardResponse({}, 201, 'Product created successfully!');
  } catch (error: any) {
    console.log('Error creating product : ', error);
    return sendErrorResponse(error, 500);
  }
};

export const getAllProducts = async (req: Request) => {
  try {
    const prods = await db.select().from(products);
    return sendStandardResponse(prods, 200, 'Products fetched successfully');
  } catch (error: any) {
    console.log('Error creating product : ', error);
    return sendErrorResponse(error, 500);
  }
};
