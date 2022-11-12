"use client"

const LogoutButton = () => {
    return (
        <button
            onClick={() => console.log("hello")}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
            Sign Out
        </button>
    )
}

export default LogoutButton