import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])

    const getAll = useCallback(async () => {
        const response = await axios.get(baseUrl)
        setResources(response.data)
    }, [baseUrl])

    useEffect(() => {
        getAll()
    }, [getAll])

    const create = async (resource) => {
        const response = await axios.post(baseUrl, resource)
        setResources([...resources, response.data])
    }

    const service = {
        getAll,
        create,
    }

    return [resources, service]
}

export default useResource
