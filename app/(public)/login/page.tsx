
import React from 'react'
import CardWrapper from '@/components/auth/CardWrapper'
import LoginForm from '@/components/auth/LoginForm'


const page = () => {

    return (
        <CardWrapper title='Login From' children={<LoginForm />} />
    )
}

export default page