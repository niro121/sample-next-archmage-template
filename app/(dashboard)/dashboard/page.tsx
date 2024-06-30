import CardWrapper from '@/components/auth/CardWrapper'
import { auth } from '@/lib/auth'
import React from 'react'

const page = async () => {
    const session = await auth()
    return (

        <div>
            <CardWrapper title='Welcome to the Dashboard 🎉'
                children={<>
                    <ul >
                        <li>
                            ❇️ Name : {session?.user.name}
                        </li>
                        <li>
                            ❇️ Email : {session?.user.email}

                        </li>
                        <li>
                            ❇️ IsAdmin : {session?.user.isAdmin ? 'TRUE' : 'FALSE'}

                        </li>
                    </ul>

                </>} />
        </div>
    )
}

export default page