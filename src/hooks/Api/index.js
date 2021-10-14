import React from 'react';
import axios from 'axios';

const { port, origin } = document.location;

const API_LOCATION = Number(port) === 3000 ? 'http://localhost:5000' : origin;

/**
 * Hook to communicate with API (wrap over Axios)
 *
 * @param {string} route - Requests end-point
 * @returns Requests methods and preforming status
 *
 * @example
 * const { get: getArticle, status } = useApi(`/news/${id}`)
 */
const useApi = route => {
    const endPoint = API_LOCATION + route;

    const [status, setStatus] = React.useState({
        loading: false,
        finished: false,
        error: null,
    });

    const completeStatus = (error = null) => ({ 
        error, 
        loading: false, 
        finished: true 
    });

    /**
     * Request performing
     * @param {Promise} request - Axios request to perform
     */
    const exec = request => {
        setStatus(prev => ({ ...prev, loading: true, finished: false }));

        return request
            .then(({ data: response }) => {
                setStatus(completeStatus());
                return response;
            })
            .catch(error => {
                setStatus(completeStatus(error));
                return null;
            });
    };

    /**
     * GET-request
     * @param {object} query - Request parameters (null by default)
     */
    const get = (query = null) => exec(axios.get(endPoint, { params: query }));

    /**
     * POST-request
     * @param {object} body - Payload
     */
    const post = body => exec(axios.post(endPoint, body));

    return { status, get, post };
};

export default useApi;
