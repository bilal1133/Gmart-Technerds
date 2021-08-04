export const roleGuard = (permission_name: string) => {
    let users;
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        users = localStorage.getItem('user') != null ? JSON.parse(localStorage.getItem('user')) : null;
        if (users && users != 'undefined') {
            let permission = users.permissions;
            if (permission.indexOf(permission_name) > -1)
                return true;
            else
                return false;
        }
    }
    return false;
}