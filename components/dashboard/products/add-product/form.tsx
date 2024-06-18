"use client"
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { addProductAction, updateProductAction } from 'app/(dashboard)/dashboard/products/actions'

interface ProductFormProps {
    name?: string,
    price?: string,
    image?: string,
    id?: string,
    edit: boolean
}

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    price: z.string().min(0, {
        message: "Price must be a positive number.",
    }),
    image: z.string().url({
        message: "Image must be a valid URL.",
    }),
})

const AddEditProductForm: React.FC<ProductFormProps> = ({ name, price, image, edit, id }) => {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: edit ? name : "",
            price: edit ? price : "",
            image: edit ? image : "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
        if (edit) {
            id && await updateProductAction(values, id)
        } else {

            await addProductAction(values)
        }

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Product name" {...field} />
                            </FormControl>
                            <FormDescription>
                                Enter the name of the product.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Price" {...field} />
                            </FormControl>
                            <FormDescription>
                                Enter the price of the product.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image</FormLabel>
                            <FormControl>
                                <Input placeholder="Image URL" {...field} />
                            </FormControl>
                            <FormDescription>
                                Enter the URL of the product image.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">{edit ? "Update" : "Add"}</Button>
            </form>
        </Form>
    )
}

export default AddEditProductForm