'use client';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { deleteProduct } from 'app/(dashboard)/dashboard/products/actions';
import { useRouter } from 'next/navigation';
import { SelectProduct } from '@/lib/models/products/productsModel';
import Image from 'next/image';
import Link from 'next/link';

export function ProductTable({
  products,
  offset
}: {
  products: SelectProduct[];
  offset: number | null;
}) {
  const router = useRouter();

  function onClick() {
    router.replace(`/?offset=${offset}`);
  }

  return (
    <>
      <form className="border shadow-sm rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="max-w-[150px]">Item Name</TableHead>
              <TableHead className="hidden md:table-cell">Image</TableHead>
              <TableHead className="hidden md:table-cell">Price</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <ProductRow key={product.id} product={product} />
            ))}
          </TableBody>
        </Table>
      </form>
      {offset !== null && (
        <Button
          className="mt-4 w-40"
          variant="secondary"
          onClick={() => onClick()}
        >
          Next Page
        </Button>
      )}
    </>
  );
}

function ProductRow({ product }: { product: SelectProduct }) {
  const prodId = product.id;
  const deleteProductWithId = deleteProduct.bind(null, prodId);

  return (
    <TableRow>
      <Link href={`/dashboard/products/${prodId}`}>
        <TableCell className="font-medium">{product.name}</TableCell>
      </Link>
      {/* <TableCell className="hidden md:table-cell">{product.image}</TableCell> */}
      <TableCell className="hidden md:table-cell"><Image src={product.image} alt='Product Image' width={120} height={120} /></TableCell>
      <TableCell>{product.price}</TableCell>
      <TableCell>
        <Button
          className="w-full"
          size="sm"
          variant="outline"
          formAction={deleteProductWithId}
        // disabled
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}
