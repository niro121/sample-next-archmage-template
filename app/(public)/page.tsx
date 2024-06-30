import React from 'react'
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';
import Link from 'next/link';

const page = async () => {
    const session = await auth()
    return (
        <div>
            <h1>

                welcome page for the public users
            </h1>
            <br />
            <div>
                {!session?.user ?
                    <>
                        <h2>You are not an authenticated user. Login to access dashboard</h2>
                        <Link href={'/login'}>
                            <Button>
                                Click here to login
                            </Button>
                        </Link>
                    </>
                    :
                    <>
                        <h2>Welcome {session.user.name}. Click below to access dashboard</h2>
                        <Link href={'/dashboard'}>
                            <Button>Dashboard</Button>
                        </Link>
                    </>
                }
            </div>
        </div>
    )
}

export default page