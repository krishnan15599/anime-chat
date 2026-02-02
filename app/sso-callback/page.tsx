import { AuthenticateWithRedirectCallback } from '@clerk/nextjs'

export default function HandleSSOCallback() {
    return <AuthenticateWithRedirectCallback />
}
