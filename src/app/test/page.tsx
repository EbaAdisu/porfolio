export default function TestPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-4">Test Page</h1>
            <p className="text-lg">
                This is a simple test page to verify content is rendering.
            </p>
            <div className="mt-8 p-4 bg-primary/10 rounded-lg">
                <h2 className="text-2xl font-semibold mb-2">Content Test</h2>
                <p>If you can see this, the basic rendering is working.</p>
            </div>
        </div>
    )
}
