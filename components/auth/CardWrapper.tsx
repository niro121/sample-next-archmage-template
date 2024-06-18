import React from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardFooter,
} from "@/components/ui/card";

interface CardWrapperProps {
    title: string
    children: React.ReactNode
}

const CardWrapper = ({ title, children }: CardWrapperProps) => {
    return (
        <div className="flex items-center justify-center h-screen">
            <Card className="w-full max-w-md shadow-md">
                <CardHeader>{title}</CardHeader>
                <CardContent>
                    {children}
                </CardContent>
            </Card>
        </div>

    )
}

export default CardWrapper