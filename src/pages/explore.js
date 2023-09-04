import { useSession } from "next-auth/react"

const Explore = () => {
    const { data: session } = useSession()

    return (
        <div>{JSON.stringify(session)}</div>
    )
}
export default Explore