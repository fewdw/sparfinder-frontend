let isAuth = false;

export function getIsAuth(): boolean {
    const storedValue = localStorage.getItem('isAuth');
    return storedValue ? JSON.parse(storedValue) : isAuth;
}

export function setIsAuth(value: boolean): void {
    isAuth = value;
    localStorage.setItem('isAuth', JSON.stringify(value));
}