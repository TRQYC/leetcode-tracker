

const useTest = () => {
    console.log("test hook called")
    const f = () => {
        console.log("test hook returned function called")
    }
    return [f]
}

export default useTest