
export default async function Problem(
    { params }: {
        params: Promise<{ slug: string }>
    }) {
    return (
        <div>
            Problem with {(await (params)).slug}
        </div>
    )

}