import {backendLookup} from '../lookup'

export function apiProfileDetail(username, callback) {
    backendLookup("GET", `/profiles/${username}/`, callback)
}


export function apiProfileFollowToggle(username, action, callback) {
    const data = {action: `${action && action}`.toLowerCase()} // here we are using string substitution that way we don't get the error if it is null
    backendLookup("POST", `/profiles/${username}/follow`, callback, data)
}